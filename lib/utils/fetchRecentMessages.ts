import { createClient } from '@supabase/supabase-js';
import type { Address } from 'viem';

import type {
  SupabaseChatLastUpdated,
  SupabaseChatMessageTx,
  TransposeOnChainMessagesResponse,
} from '@/lib/types/api';
import type { ChatMessageTx } from '@/lib/types/chat';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const fetchRecentMessages = async (address: Address, page: number): Promise<ChatMessageTx[]> => {
  // First, select address message data from Supabase.
  const { data: addressData } = await supabase
    .from('chat_last_updated')
    .select('lastUpdated')
    .eq('address', address.toLowerCase())
    .returns<SupabaseChatLastUpdated[]>();

  // Then, select existing data from Supabase.
  const { data, status, error } = await supabase
    .rpc('select_chat_recent_messages', {
      _address: address.toLowerCase(),
      _offset: page * 10,
    })
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
        // Note: we select up to the most recent 250 messages whenever the data
        // is stale or nonexistent.
        // eslint-disable-next-line
      sql: `SELECT t.block_number, t.from_address, t.to_address, t.value, raw.message, t.timestamp, t.transaction_hash FROM ( SELECT from_address, to_address, VALUE, INPUT, block_number, TIMESTAMP, transaction_hash, ROW_NUMBER() OVER ( PARTITION BY ( CASE WHEN from_address != \'{{address}}\' THEN from_address ELSE to_address END ) ORDER BY block_number DESC ) rn FROM ethereum.transactions WHERE INPUT IS NOT NULL AND ( from_address = \'{{address}}\' OR to_address = \'{{address}}\' ) ) AS t, LATERAL ( SELECT CONVERT_FROM( DECODE( SUBSTRING( REGEXP_REPLACE(t.input, \'00\', \'\', \'g\') FROM 3 ), \'hex\' ), \'LATIN1\' ) AS message ) AS raw WHERE raw.message ~ \'\\A[\\sa-zA-Z0-9%&()\\[\\]#@.,;:?!_-]*\\Z\' AND t.rn = 1 ORDER BY timestamp DESC LIMIT 250 OFFSET {{offset}}`,
        parameters: { address, offset: page * 10 },
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
    await supabase.from('chat_last_updated').upsert({
      address: address.toLowerCase(),
      lastUpdated: new Date().toISOString(),
    });
    await supabase.from('chat_txs').upsert(messages);

    return messages.slice(0, 20);
  }

  return data.map(({ timestamp, ...rest }) => ({ timestamp: new Date(timestamp), ...rest }));
};

export default fetchRecentMessages;
