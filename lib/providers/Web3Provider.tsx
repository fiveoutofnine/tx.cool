'use client';

import type { ReactNode } from 'react';

import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// -----------------------------------------------------------------------------
// RainbowKit + Wagmi config
// -----------------------------------------------------------------------------

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'tx.cool',
  projectId: 'a2941475e5016b4d2740704815192a42',
  chains,
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider theme={darkTheme()} modalSize="compact" chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
