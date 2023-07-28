import { type FC, useId } from 'react';

import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import type { Address } from 'viem';

import AddressInfo from '@/components/templates/address-info';
import { Button } from '@/components/ui';

const ChatExamples: FC = () => {
  const fieldsetId = useId();
  const inputId = useId();

  return (
    <div className="flex w-full flex-col sm:w-[400px]">
      <label htmlFor={fieldsetId} className="text-xs text-gray-11">
        Pick from an example
      </label>
      <fieldset
        id={fieldsetId}
        className="mt-1 flex flex-col rounded-xl border border-gray-6 bg-gray-2"
      >
        {[
          { label: 'Euler Exploiter', address: '0xb66cd966670d962c227b3eaba30a872dbfb995db' },
          { label: '5/9', address: '0xA85572Cd96f1643458f17340b6f0D6549Af482F5' },
          { label: 'shunkakinoki', address: '0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed' },
        ].map((example, index) => (
          <div
            key={example.address}
            className={clsx(
              'flex w-full items-center justify-between px-4 py-2',
              index !== 0 && 'border-t border-gray-6',
            )}
          >
            {/* @ts-expect-error Async Server Component */}
            <AddressInfo address={example.address as Address} label={example.label} />
            <Button href={`/chat/${example.address}`} size="sm" rightIcon={<ChevronRight />}>
              View
            </Button>
          </div>
        ))}
      </fieldset>

      <form className="mt-4">
        <label htmlFor={inputId} className="text-xs text-gray-11">
          Or enter an ENS/address
        </label>
        <div className="relative mt-1 flex items-center">
          <input
            id={inputId}
            className="h-10 w-full rounded-lg border border-gray-7 bg-gray-2 px-3 text-gray-12 transition-colors placeholder:text-gray-11 hover:border-gray-8 focus:border-blue-9 focus:outline-none"
            placeholder="example.eth"
          />
          <Button
            className="absolute right-2"
            size="sm"
            rightIcon={<ChevronRight />}
            href={`/chat/${'wip'}`}
          >
            View
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatExamples;
