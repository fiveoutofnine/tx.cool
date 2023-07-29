'use client';

import { usePathname } from 'next/navigation';
import { type FC, type ReactNode, UIEvent, useState } from 'react';

import clsx from 'clsx';

/* Props */
type ChatColumnWrapperProps = {
  children: ReactNode;
};

/* Component */
const ChatColumnWrapper: FC<ChatColumnWrapperProps> = ({ children }) => {
  const [scrollIsAtTop, setScrollIsAtTop] = useState<boolean>(true);
  const [scrollIsAtBottom, setScrollIsAtBottom] = useState<boolean>(false);

  const pathname = usePathname();
  const path = pathname.split('/');
  const isFromPage = !path || path.length < 4 || path[3].length === 0;

  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    setScrollIsAtTop(scrollTop === 0);
    setScrollIsAtBottom(scrollHeight - scrollTop === clientHeight);
  };

  return (
    // Hide on small screens on `/chat/[from]/[to]` pages.
    <div
      className={clsx(
        'hide-scrollbar relative flex min-h-screen w-full flex-col overflow-y-scroll border-r border-gray-6 bg-gray-2 pb-12 md:w-[320px] md:pb-0',
        isFromPage ? '' : 'hidden md:block',
      )}
      style={{ maxWidth: '100vw', height: '100vh' }}
      onScroll={onScroll}
    >
      {children}
      {/* Top gradient to hide overflow */}
      <div
        className={clsx(
          'pointer-events-none fixed left-12 top-12 h-12 w-full border-r border-gray-6 bg-gradient-to-b from-gray-2 transition-opacity md:w-[320px]',
          scrollIsAtTop ? 'opacity-0' : 'opacity-100',
        )}
      />
      {/* Bottom gradient to hide overflow */}
      <div
        className={clsx(
          'pointer-events-none fixed bottom-0 left-12 h-12 w-full border-r border-gray-6 bg-gradient-to-t from-gray-2 transition-opacity md:w-[320px]',
          scrollIsAtBottom ? 'opacity-0' : 'opacity-100',
        )}
      />
    </div>
  );
};

export default ChatColumnWrapper;
