'use client';

import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

import clsx from 'clsx';

/* Props */
type ChatColumnWrapperProps = {
  children: ReactNode;
};

/* Component */
const ChatColumnWrapper: FC<ChatColumnWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const path = pathname.split('/');
  const isFromPage = !path || path.length < 4 || path[3].length === 0;

  return (
    // Hide on small screens on `/chat/[from]/[to]` pages.
    <div
      className={clsx(
        'relative min-h-screen w-full border-r border-gray-6 bg-gray-2 md:w-[320px]',
        isFromPage ? '' : 'hidden md:block',
      )}
      style={{ maxWidth: '100vw' }}
    >
      {children}
    </div>
  );
};

export default ChatColumnWrapper;
