'use client';

import type { FC, ReactNode } from 'react';

import { Drawer } from 'vaul';

/* Props */
type ChatSwitchAddressDrawerInternalProps = {
  trigger: ReactNode;
  children: ReactNode;
};

/* Component */
const ChatSwitchAddressDrawerInternal: FC<ChatSwitchAddressDrawerInternalProps> = ({
  trigger,
  children,
}) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-overlay h-screen w-screen bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-popover mx-auto flex flex-col rounded-t-xl border-t border-gray-6 bg-gray-2 p-4 sm:max-w-[432px] sm:border-x">
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ChatSwitchAddressDrawerInternal;
