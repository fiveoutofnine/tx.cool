import { createClient } from '@supabase/supabase-js';
import type { Address } from 'viem';

import type {
  SupabaseChatConversationLastUpdated,
  SupabaseChatMessageTx,
  TransposeOnChainMessagesResponse,
} from '@/lib/types/api';
import type { ChatMessageTx } from '@/lib/types/chat';

const fetchConversation = async (
  address1: Address,
  address2: Address,
  page: number,
): Promise<ChatMessageTx[]> => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
  );

  const minAddress =
    address1.toLowerCase() < address2.toLowerCase()
      ? address1.toLowerCase()
      : address2.toLowerCase();
  const maxAddress =
    address1.toLowerCase() < address2.toLowerCase()
      ? address2.toLowerCase()
      : address1.toLowerCase();

  // First, select address message data from Supabase.
  const { data: addressData } = await supabase
    .from('chat_convo_last_updated')
    .select('lastUpdated')
    .eq('address1', minAddress)
    .eq('address2', maxAddress)
    .returns<SupabaseChatConversationLastUpdated[]>();

  // Then, select existing data from Supabase.
  const { data, status, error } = await supabase
    .from('chat_txs')
    .select('*')
    .or(
      `and(from_address.eq.${minAddress},to_address.eq.${maxAddress}),and(from_address.eq.${maxAddress},to_address.eq.${minAddress})`,
    )
    .order('timestamp', { ascending: false })
    .limit(100)
    .range(page === 0 ? 0 : page * 10 + 90, page === 0 ? 100 : page * 10 + 100)
    .returns<SupabaseChatMessageTx[]>();

  // Force an update if there's an error, there's no data, or if the data was
  // last updated more than 4 hours ago.
  if (
    (error && status !== 406) ||
    (data && data.length === 0) ||
    !data ||
    !addressData ||
    addressData.length === 0 ||
    (addressData &&
      addressData[0] &&
      Date.now() - new Date(addressData[0].lastUpdated).getTime() > 14_400_000)
  ) {
    const response = await fetch('https://api.transpose.io/sql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.TRANSPOSE_API_KEY,
      },
      body: JSON.stringify({
        // Note: we select up to the most recent 100 messages whenever the data
        // is stale or nonexistent.
        // eslint-disable-next-line
      sql: `SELECT t.block_number, t.from_address, t.to_address, t.value, raw.message, t.timestamp, t.transaction_hash FROM ( SELECT block_number, from_address, to_address, value, input, timestamp, transaction_hash FROM ethereum.transactions WHERE input IS NOT NULL AND ((from_address = \'{{address1}}\' AND to_address = \'{{address2}}\') OR (to_address = \'{{address1}}\' AND from_address = \'{{address2}}\')) ORDER BY block_number DESC ) AS t, LATERAL ( SELECT CONVERT_FROM( DECODE( SUBSTRING( REGEXP_REPLACE(t.input, \'00\', \'\', \'g\') FROM 3 ), \'hex\' ), \'LATIN1\' ) AS message ) AS raw WHERE LENGTH(raw.message) > 0 AND ( LENGTH(raw.message) - LENGTH(REGEXP_REPLACE(raw.message, '[-0-9A-Z_a-z!@#$%^&*()_+<>]', '', 'g')) )::float / LENGTH(raw.message) >= 0.8 LIMIT 100 OFFSET {{offset}}`,
        parameters: { address1: minAddress, address2: maxAddress, offset: page * 10 },
      }),
    });

    if (!response || !response.ok) return [];

    const json = await response.json();
    if (!json || !json.results) return [];

    const messages = json.results.map((tx: TransposeOnChainMessagesResponse) => ({
      blockNumber: tx.block_number,
      from: tx.from_address.toLowerCase(),
      to: tx.to_address.toLowerCase(),
      value: tx.value,
      message: tx.message,
      timestamp: new Date(tx.timestamp),
      txHash: tx.transaction_hash.toLowerCase(),
    }));

    // Upsert into Supabase.
    await supabase.from('chat_convo_last_updated').upsert({
      address1: minAddress,
      address2: maxAddress,
      lastUpdated: new Date().toISOString(),
    });
    await supabase.from('chat_txs').upsert(messages);

    return messages.slice(0, 100).reverse();
  }

  return data
    .map(({ timestamp, ...rest }) => ({ timestamp: new Date(timestamp), ...rest }))
    .reverse();
};

export default fetchConversation;
