import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLeft, ExternalLink, MessageCircle } from 'lucide-react';

import { getEnsNameOrAddress, getShortenedAddress } from '@/lib/utils';

import { IconButton } from '@/components/ui';

export default async function ChatTo({ params }: { params: { from: string; to: string } }) {
  const [dataFrom, dataTo] = await Promise.all([
    await getEnsNameOrAddress(params.from),
    await getEnsNameOrAddress(params.to),
  ]);
  if (!dataFrom || !dataTo) notFound();

  const fromAddressDisplay = dataFrom.ensName ?? getShortenedAddress(dataFrom.address);
  const toAddressDisplay = dataTo.ensName ?? getShortenedAddress(dataTo.address);

  return (
    <div className="min-h-screen flex-col items-center justify-center">
      {/* Desktop */}
      <div className="sticky top-0 hidden h-12 items-center justify-between border-b border-gray-6 bg-gray-1/50 px-4 backdrop-blur-2xl md:flex">
        <div className="flex items-center space-x-3">
          <MessageCircle className="text-gray-11" />
          <div className="text-2xl font-semibold tracking-tighter">{toAddressDisplay}</div>
        </div>
        <IconButton href={`https://etherscan.io/address/${toAddressDisplay}`} newTab>
          <ExternalLink />
        </IconButton>
      </div>
      {/* Mobile */}
      <div className="sticky top-0 h-12 border-b border-gray-6 bg-gray-1/50 px-4 backdrop-blur-2xl md:hidden">
        <div className="relative">
          <div className="absolute flex h-12 w-full items-center justify-between">
            <Link
              href={`/chat/${params.from}`}
              className="flex items-center space-x-2 text-sm text-gray-11 transition-colors hover:text-gray-12"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>/chat</span>
            </Link>
            <IconButton href={`https://etherscan.io/address/${toAddressDisplay}`} newTab>
              <ExternalLink />
            </IconButton>
          </div>
          <div className="pointer-events-none absolute flex h-12 w-full flex-col items-center justify-center">
            <div className="font-medium text-gray-12">{toAddressDisplay}</div>
            <div className="text-xs text-gray-11">as {fromAddressDisplay}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
