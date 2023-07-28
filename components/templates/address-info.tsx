import type { Address } from 'viem';

import { publicClient } from '@/lib/client';
import { getShortenedAddress } from '@/lib/utils';

import Avatar from '@/components/templates/avatar';
import ENSAvatar from '@/components/templates/ens-avatar';

/* Props */
type AddressInfoProps = {
  address: Address;
  label?: string;
};

/* Component */
export default async function AddressInfo({ address, label }: AddressInfoProps) {
  const ensName = await publicClient.getEnsName({ address });
  const addressDisplay = ensName ?? getShortenedAddress(address);

  return (
    <div className="flex items-center space-x-3">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore Async Server Component */}
      {ensName ? <ENSAvatar name={ensName} /> : <Avatar src="" alt="" />}
      <div>
        <div className="font-medium text-gray-12">{label ?? addressDisplay}</div>
        <a
          className="text-sm text-gray-11 hover:underline"
          href={`https://etherscan.io/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {addressDisplay}
        </a>
      </div>
    </div>
  );
}
