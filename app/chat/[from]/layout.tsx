import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { getEnsNameOrAddress } from '@/lib/utils';
import { getShortenedAddress } from '@/lib/utils';

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

  return (
    <div className="flex min-h-screen">
      <div className="relative min-h-screen w-full border-r border-gray-6 bg-gray-2 md:w-[320px]">
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
      </div>
      <div className="min-h-screen grow">{children}</div>
    </div>
  );
}
