'use client';

import type { FC, ReactNode } from 'react';

import ChatExamples from './examples';
import { Drawer } from 'vaul';

/* Props */
type ChatSwitchAddressDrawerProps = {
  children: ReactNode;
};

/* Component */
const ChatSwitchAddressDrawer: FC<ChatSwitchAddressDrawerProps> = ({ children }) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 z-popover bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-popover mt-24 flex flex-col rounded-t-[10px] border-t border-gray-6 bg-gray-2 p-4">
          <ChatExamples />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ChatSwitchAddressDrawer;
