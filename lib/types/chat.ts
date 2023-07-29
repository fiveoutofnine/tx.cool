import type { Address, Hash } from 'viem';

export type ChatMessageTx = {
  blockNumber: number;
  from: Address;
  to: Address;
  value: number;
  message: string;
  timestamp: Date;
  txHash: Hash;
};
