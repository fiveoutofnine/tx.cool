import type { Metadata } from 'next';
import { Fira_Code, Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';

import Web3Provider from '@/lib/providers/Web3Provider';

import NavBar from '@/components/common/nav-bar';

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  variable: '--fira-code-font',
  subsets: ['latin'],
});

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'tx.cool',
  description: 'UI/UX explorations of on-chain data.',
  keywords: ['ethereum', 'blockchain', 'transactions', 'on-chain', 'design', 'ui', 'ux'],
  themeColor: '#000000',
  colorScheme: 'dark',
  manifest: '/manifest.json',
  openGraph: {
    title: 'tx.cool',
    description: 'UI/UX explorations of on-chain data.',
    siteName: 'tx.cool',
    url: 'https://tx.cool',
    locale: 'en_US',
    images: ['/static/og/home.png'],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@fiveoutofnine',
    images: ['/static/og/home.png'],
  },
};

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={clsx('dark', inter.className)} style={{ background: 'black' }}>
      <body className={clsx(inter.variable, firaCode.variable)}>
        <Web3Provider>
          <div className="flex">
            <NavBar />
            <main className="min-h-screen grow pl-0 md:pl-12">{children}</main>
          </div>
        </Web3Provider>
      </body>

      <Analytics />
    </html>
  );
}
