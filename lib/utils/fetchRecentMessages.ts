import type { Address } from 'viem';

import type { TransposeOnChainMessagesResponse } from '@/lib/types/api';
import type { ChatMessageTx } from '@/lib/types/chat';

const fetchRecentMessages = async (address: Address): Promise<ChatMessageTx[]> => {
  const response = await fetch('https://api.transpose.io/sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.TRANSPOSE_API_KEY,
    },
    body: JSON.stringify({
      // eslint-disable-next-line
      sql: `SELECT t.block_number, t.from_address, t.to_address, t.value, raw.message, timestamp, transaction_hash FROM ( SELECT from_address, to_address, value, input, block_number, timestamp, transaction_hash FROM ethereum.transactions WHERE input IS NOT NULL AND from_address = \'{{address}}\' OR to_address = \'{{address}}\' ORDER BY block_number DESC ) AS t, LATERAL ( SELECT CONVERT_FROM( DECODE( SUBSTRING( REGEXP_REPLACE(t.input, \'00\', \'\', \'g\') FROM 3 ), \'hex\' ), \'LATIN1\' ) AS message ) AS raw WHERE raw.message ~ \'\\A[\\sa-zA-Z0-9%&()\\[\\]#@.,;:?!_-]*\\Z\'`,
      parameters: { address },
    }),
  });

  if (!response || !response.ok) return [];

  const json = await response.json();
  if (!json || !json.results) return [];

  const recipients = new Set<string>();

  return json.results
    .map((tx: TransposeOnChainMessagesResponse) => {
      const recipient = tx.from_address === address ? tx.to_address : tx.from_address;
      if (recipients.has(recipient)) return null;
      recipients.add(recipient);

      return {
        blockNumber: tx.block_number,
        fromAddress: tx.from_address,
        toAddress: tx.to_address,
        value: tx.value,
        message: tx.message,
        timestamp: new Date(tx.timestamp),
        txHash: tx.transaction_hash,
      };
    })
    .filter((tx: ChatMessageTx | null): tx is ChatMessageTx => tx !== null);
};

export default fetchRecentMessages;
