import type { Address, Hash } from 'viem';

export type TransposeOnChainMessagesResponse = {
  block_number: number;
  from_address: Address;
  to_address: Address;
  value: number;
  message: string;
  timestamp: string;
  transaction_hash: Hash;
};
