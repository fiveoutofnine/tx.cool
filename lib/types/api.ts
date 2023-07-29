import type { Address, Hash } from 'viem';

export type SupabaseChatLastUpdated = {
  address: Address;
  lastUpdated: string;
};

export type SupabaseChatMessageTx = {
  blockNumber: number;
  from: Address;
  to: Address;
  value: number;
  message: string;
  timestamp: string;
  txHash: Hash;
};

export type TransposeOnChainMessagesResponse = {
  block_number: number;
  from_address: Address;
  to_address: Address;
  value: number;
  message: string;
  timestamp: string;
  transaction_hash: Hash;
};
