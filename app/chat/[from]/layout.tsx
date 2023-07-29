import { notFound } from 'next/navigation';
import { Fragment, type ReactNode } from 'react';

import ChatColumnWrapper from './chat-column-wrapper';
import ChatPreview from './chat-preview';

import { publicClient } from '@/lib/client';
import { fetchRecentMessages, getEnsNameOrAddress, getShortenedAddress } from '@/lib/utils';

import Logo from '@/components/common/logo';
import Avatar from '@/components/templates/avatar';
import ENSAvatar from '@/components/templates/ens-avatar';
import { Button } from '@/components/ui';

export default async function ChatLayout({
  params,
  children,
}: {
  params: { from: string };
  children: ReactNode;
}) {
  const data = await getEnsNameOrAddress(params.from);
  if (!data) notFound();

  const addressDisplay = data.ensName ?? getShortenedAddress(data.address);

  const messages = await fetchRecentMessages(data.address, 0);

  return (
    <div className="flex min-h-screen">
      {/* We need the following component as a wrapper because we need to read
      `pathname` via `usePathname` to determine whether we're on `/chat/[from]`
      or `/chat/[from]/[to]`. */}
      <ChatColumnWrapper>
        <div className="sticky top-0 h-12 border-b border-gray-6 bg-gray-2/50 px-4 backdrop-blur-2xl">
          {/* Desktop */}
          <div className="hidden h-12 items-center justify-between md:flex">
            <div className="text-2xl font-semibold tracking-tighter text-gray-12">/chat</div>
            <Button variant="secondary">{addressDisplay}</Button>
          </div>
          {/* Mobile */}
          <div className="flex h-12 items-center justify-between md:hidden">
            <Logo />
            <div className="ml-2 font-medium text-gray-12">/chat</div>
            {data.ensName ? (
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              /* @ts-ignore Async Server Component */
              <ENSAvatar name={data.ensName} size={32} />
            ) : (
              <Avatar src="" alt="" size={32} />
            )}
          </div>
        </div>
        <div
          className="hide-scrollbar flex flex-col overflow-y-scroll pb-12 md:pb-0"
          style={{ height: 'calc(100vh - 3rem)' }}
        >
          {messages.map(async (message, index) => {
            const to = message.from.toLowerCase() === data.address ? message.to : message.from;
            const toAddressDisplay =
              (await publicClient.getEnsName({ address: to })) ?? getShortenedAddress(to);

            return (
              <Fragment key={message.txHash}>
                {index !== 0 ? <hr className="border-0.5 border-gray-6" role="separator" /> : null}
                {/* We need the following component as a wrapper because we need
                to read `pathname` via `usePathname` to determine which chat
                previews to disable. */}
                <ChatPreview
                  message={message}
                  from={data.address}
                  toAddressDisplay={toAddressDisplay}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="line-clamp-1 text-ellipsis font-medium text-gray-12">
                      {toAddressDisplay}
                    </div>
                    <div className="text-sm text-gray-11" title={message.timestamp.toISOString()}>
                      {message.timestamp.toLocaleDateString('short')}
                    </div>
                  </div>
                  <div className="line-clamp-2 text-ellipsis text-sm text-gray-11">
                    {message.message}
                  </div>
                </ChatPreview>
              </Fragment>
            );
          })}
        </div>
      </ChatColumnWrapper>
      <div className="min-h-screen grow">{children}</div>
    </div>
  );
}
