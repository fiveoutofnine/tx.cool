import type { Address } from 'viem';

const getShortenedAddress = (address: Address): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default getShortenedAddress;
