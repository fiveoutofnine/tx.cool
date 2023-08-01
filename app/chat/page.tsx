import type { Metadata } from 'next';

import { EXPLORATIONS } from '@/lib/constants/site';

import ChatExamples from '@/components/pages/chat/examples';
import InfoStack from '@/components/templates/info-stack';

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

export default function Chat() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 pb-16 md:px-24 md:py-16">
      <InfoStack
        title={CHAT_EXPLORATION.name}
        description={CHAT_EXPLORATION.description}
        icon={CHAT_EXPLORATION.icon}
      >
        <ChatExamples />
      </InfoStack>
    </div>
  );
}
