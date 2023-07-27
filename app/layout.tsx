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
  description: 'UI/UX exploration on on-chain data.',
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
            <main className="min-h-screen grow">{children}</main>
          </div>
        </Web3Provider>
      </body>

      <Analytics />
    </html>
  );
}
