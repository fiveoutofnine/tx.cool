import { cache } from 'react';

import { type Address, isAddress } from 'viem';
import { zeroAddress } from 'viem';
import { normalize } from 'viem/ens';

import { publicClient } from '@/lib/client';

const getEnsNameOrAddress = cache(
  async (addressOrEns: string): Promise<{ address: Address; ensName?: string } | null> => {
    const lowerCaseAddressOrEns = addressOrEns.toLowerCase();

    // If the input is an ENS name, resolve it to an address.
    if (/^[a-zA-Z0-9-]{3,253}\.eth$/.test(lowerCaseAddressOrEns)) {
      const address = await publicClient.getEnsAddress({
        name: normalize(lowerCaseAddressOrEns),
      });
      if (address && address !== zeroAddress) {
        return {
          address: address.toLowerCase() as Address,
          ensName: lowerCaseAddressOrEns,
        };
      }
    }

    // If the input is an address, check if it resolves to an ENS name.
    if (isAddress(lowerCaseAddressOrEns)) {
      const ensName = await publicClient.getEnsName({
        address: lowerCaseAddressOrEns,
      });
      if (ensName) {
        return { address: lowerCaseAddressOrEns, ensName: normalize(ensName) };
      }

      return { address: lowerCaseAddressOrEns };
    }

    return null;
  },
);

export default getEnsNameOrAddress;
