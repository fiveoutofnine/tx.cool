import type { FC, ReactNode } from 'react';

import ChatExamples from './examples';
import ChatSwitchAddressDrawerInternal from './switch-address-drawer-internal';
import { ExternalLink } from 'lucide-react';
import type { Address } from 'viem';

import AddressInfo from '@/components/templates/address-info';
import { IconButton } from '@/components/ui';

/* Props */
type ChatSwitchAddressDrawerProps = {
  address: Address;
  label: string;
  children: ReactNode;
};

/* Component */
const ChatSwitchAddressDrawer: FC<ChatSwitchAddressDrawerProps> = ({
  address,
  label,
  children,
}) => {
  return (
    <ChatSwitchAddressDrawerInternal trigger={children}>
      <div className="mx-auto mb-4 h-1 w-12 flex-shrink-0 rounded-full bg-gray-9" />
      <div className="mb-4 flex w-full items-center justify-between">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore Async Server Component */}
        <AddressInfo address={address} label={label} />
        <IconButton href={`https://etherscan.io/address/${address}`} newTab>
          <ExternalLink />
        </IconButton>
      </div>
      <ChatExamples />
    </ChatSwitchAddressDrawerInternal>
  );
};

export default ChatSwitchAddressDrawer;
