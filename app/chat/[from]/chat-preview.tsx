'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { type Address, isAddress } from 'viem';

import type { ChatMessageTx } from '@/lib/types/chat';

/* Props */
type ChatPreviewProps = {
  message: ChatMessageTx;
  from: Address;
  toAddressDisplay: string;
  children: ReactNode;
};

/* Component */
const ChatPreview: FC<ChatPreviewProps> = ({ message, from, toAddressDisplay, children }) => {
  const pathname = usePathname();
  const path = pathname.split('/');
  // We know `toFromUrl` must be either an ENS domain or an address.
  const toFromUrl = !path || path.length < 4 ? '' : path[3];
  const to = message.fromAddress === from ? message.toAddress : message.fromAddress;
  const selected = isAddress(toFromUrl)
    ? toFromUrl.toLowerCase() === to.toLowerCase()
    : toFromUrl.toLowerCase() === toAddressDisplay.toLowerCase();

  return (
    <Link
      className={clsx(
        'flex flex-col space-y-1 p-4 transition-colors hover:bg-gray-4',
        selected ? 'cursor-default bg-gray-4' : '',
      )}
      href={selected ? '' : `/chat/${from}/${to}`}
    >
      {children}
    </Link>
  );
};

export default ChatPreview;
