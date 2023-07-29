import type { Address } from 'viem';

import type { TransposeOnChainMessagesResponse } from '@/lib/types/api';
import type { ChatMessageTx } from '@/lib/types/chat';

const fetchRecentMessages = async (address: Address, page: number): Promise<ChatMessageTx[]> => {
  const response = await fetch('https://api.transpose.io/sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.TRANSPOSE_API_KEY,
    },
    body: JSON.stringify({
      // eslint-disable-next-line
      sql: `SELECT t.block_number, t.from_address, t.to_address, t.value, raw.message, t.timestamp, t.transaction_hash FROM ( SELECT from_address, to_address, VALUE, INPUT, block_number, TIMESTAMP, transaction_hash, ROW_NUMBER() OVER ( PARTITION BY ( CASE WHEN from_address != \'{{address}}\' THEN from_address ELSE to_address END ) ORDER BY block_number DESC ) rn FROM ethereum.transactions WHERE INPUT IS NOT NULL AND ( from_address = \'{{address}}\' OR to_address = \'{{address}}\' ) ) AS t, LATERAL ( SELECT CONVERT_FROM( DECODE( SUBSTRING( REGEXP_REPLACE(t.input, \'00\', \'\', \'g\') FROM 3 ), \'hex\' ), \'LATIN1\' ) AS message ) AS raw WHERE raw.message ~ \'\\A[\\sa-zA-Z0-9%&()\\[\\]#@.,;:?!_-]*\\Z\' AND t.rn = 1 ORDER BY timestamp DESC LIMIT 20 OFFSET {{offset}}`,
      parameters: { address, offset: page * 20 },
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
