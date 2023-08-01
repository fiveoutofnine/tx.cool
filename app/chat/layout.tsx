import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { EXPLORATIONS } from '@/lib/constants/site';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

const CHAT_EXPLORATION = EXPLORATIONS[0];

const metadataTitle =
  CHAT_EXPLORATION.name[0] === '/'
    ? `tx.cool${CHAT_EXPLORATION.name}`
    : `${CHAT_EXPLORATION.name} | tx.cool`;

export const metadata: Metadata = {
  title: metadataTitle,
  description: CHAT_EXPLORATION.description,
  keywords: [
    'ethereum',
    'blockchain',
    'transactions',
    'on-chain',
    'design',
    'ui',
    'ux',
    'messages',
    'chat',
  ],
  openGraph: {
    title: metadataTitle,
    description: CHAT_EXPLORATION.description,
    siteName: 'tx.cool',
    url: 'https://tx.cool',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@fiveoutofnine',
  },
};

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function ChatRootLayout({ children }: { children: ReactNode }) {
  return children;
}
