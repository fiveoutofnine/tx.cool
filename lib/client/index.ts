import { createPublicClient, fallback, http } from 'viem';
import { mainnet } from 'viem/chains';

const alchemy = http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`);

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: fallback([alchemy, http()]),
});
