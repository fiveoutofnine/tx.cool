import type { Address, Hash } from 'viem';

export type ChatMessageTx = {
  blockNumber: number;
  fromAddress: Address;
  toAddress: Address;
  value: number;
  message: string;
  timestamp: Date;
  txHash: Hash;
};
