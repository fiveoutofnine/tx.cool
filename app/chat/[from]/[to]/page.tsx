import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import ChatConversationWrapper from './chat-conversation-wrapper';
import clsx from 'clsx';
import { ArrowLeft, ExternalLink, MessageCircle } from 'lucide-react';

import { fetchConversation, getEnsNameOrAddress, getShortenedAddress } from '@/lib/utils';

import Avatar from '@/components/templates/avatar';
import ENSAvatar from '@/components/templates/ens-avatar';
import { Badge, IconButton } from '@/components/ui';

export default async function ChatTo({ params }: { params: { from: string; to: string } }) {
  const [dataFrom, dataTo] = await Promise.all([
    await getEnsNameOrAddress(params.from),
    await getEnsNameOrAddress(params.to),
  ]);
  if (!dataFrom || !dataTo) notFound();

  const fromAddressDisplay = dataFrom.ensName ?? getShortenedAddress(dataFrom.address);
  const toAddressDisplay = dataTo.ensName ?? getShortenedAddress(dataTo.address);

  const messages = await fetchConversation(dataFrom.address, dataTo.address, 0);

  return (
    <div className="hide-scrollbar h-screen flex-col items-center justify-center overflow-y-scroll">
      {/* Desktop */}
      <div className="sticky top-0 z-overlay hidden h-12 items-center justify-between border-b border-gray-6 bg-gray-1/50 px-4 backdrop-blur-2xl md:flex">
        <div className="flex items-center space-x-3">
          <MessageCircle className="text-gray-11" />
          <div className="text-2xl font-semibold tracking-tighter">{toAddressDisplay}</div>
          {dataFrom.address === dataTo.address ? (
            <Badge variant="secondary" intent="primary" size="lg">
              Self
            </Badge>
          ) : null}
        </div>
        <IconButton
          href={`https://etherscan.io/address/${dataTo.ensName ?? dataTo.address}`}
          newTab
        >
          <ExternalLink />
        </IconButton>
      </div>
      {/* Mobile */}
      <div className="fixed top-0 z-overlay h-12 w-full border-b border-gray-6 bg-gray-1/50 px-4 backdrop-blur-2xl md:hidden">
        <div className="relative">
          <div className="absolute flex h-12 w-full items-center justify-between">
            <Link
              href={`/chat/${params.from}`}
              className="flex items-center space-x-2 text-sm text-gray-11 transition-colors hover:text-gray-12"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>/chat</span>
            </Link>
            <IconButton
              href={`https://etherscan.io/address/${dataTo.ensName ?? dataTo.address}`}
              newTab
            >
              <ExternalLink />
            </IconButton>
          </div>
          <div className="pointer-events-none absolute flex h-12 w-full flex-col items-center justify-center">
            <div className="font-medium text-gray-12">{toAddressDisplay}</div>
            <div className="text-xs text-gray-11">as {fromAddressDisplay}</div>
          </div>
        </div>
      </div>
      {/* Conversation */}
      <div className="flex max-w-full grow flex-col p-4 py-16 md:py-4">
        <div className="flex flex-col gap-2">
          {dataTo.ensName ? (
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            /* @ts-ignore Async Server Component */
            <ENSAvatar name={dataTo.ensName} size={64} />
          ) : (
            <Avatar src="" alt="" size={64} />
          )}
          <Link
            href={`/chat/${dataTo.address}`}
            className="text-2xl font-semibold tracking-tighter text-gray-12 hover:underline"
          >
            {toAddressDisplay}
          </Link>
          <span className="leading-relaxed text-gray-11">
            The start of{' '}
            <Link
              href={`/chat/${dataFrom.address}`}
              className="font-medium text-gray-12 hover:underline"
            >
              {fromAddressDisplay}
            </Link>
            &apos;s message history with{' '}
            <Link
              href={`/chat/${dataTo.address}`}
              className="font-medium text-gray-12 hover:underline"
            >
              {toAddressDisplay}
            </Link>
            .
          </span>
        </div>
        <hr className="mt-6 w-full border-t border-gray-6" role="separator" />
        {/* We need the following component as a wrapper because we need to
        scroll to the bottom of the chat conversation when the page loads. */}
        <ChatConversationWrapper>
          {messages.map((message, index) => {
            const prevTx = index > 0 ? messages[index - 1] : undefined;
            const timestamp = message.timestamp;
            const threeHoursSinceLastMessage =
              !prevTx || timestamp.getTime() - prevTx.timestamp.getTime() > 10_800_000;
            const now = new Date();
            const timeString = timestamp.toLocaleTimeString('en-US', { timeStyle: 'short' });
            const formattedDate =
              timestamp.getFullYear() === now.getFullYear() &&
              timestamp.getMonth() === now.getMonth() &&
              timestamp.getDate() === now.getDate()
                ? timeString // HH:MM AM/PM
                : now.getTime() - timestamp.getTime() < 604_800_000
                ? `${timestamp.toLocaleDateString('en-US', { weekday: 'long' })} ${timeString}` // Day of the week
                : now.getTime() - timestamp.getTime() < 31_536_000_000
                ? `${timestamp.toLocaleDateString('en-US', {
                    // EEE, MMM, DD at HH:MM AM/PM
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })} at ${timeString}`
                : `${timestamp.toLocaleDateString('en-US', {
                    // MMM DD, YYYY at HH:MM AM/PM
                    dateStyle: 'medium',
                  })} at ${timeString}`;

            return (
              <Fragment key={message.txHash}>
                {threeHoursSinceLastMessage ? (
                  <div className="my-6 flex justify-center text-sm text-gray-11">
                    <span
                      className="mx-auto w-fit"
                      title={message.timestamp.toLocaleString('en-US', {
                        dateStyle: 'full',
                        timeStyle: 'full',
                      })}
                    >
                      {formattedDate}
                    </span>
                  </div>
                ) : null}
                <a
                  className={clsx(
                    'w-fit max-w-[32rem] whitespace-pre-line break-all rounded-xl px-3 py-2 text-gray-1 transition-colors dark:text-gray-12',
                    message.from === dataTo.address.toLowerCase()
                      ? 'bg-gray-3 hover:bg-gray-4'
                      : 'ml-auto bg-[#007FFF] hover:bg-blue-10',
                    threeHoursSinceLastMessage
                      ? 'mt-0'
                      : prevTx && prevTx.from === message.from
                      ? 'mt-1'
                      : 'mt-4',
                  )}
                  href={`https://etherscan.io/tx/${message.txHash}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {message.message}
                </a>
              </Fragment>
            );
          })}
        </ChatConversationWrapper>
      </div>
    </div>
  );
}
