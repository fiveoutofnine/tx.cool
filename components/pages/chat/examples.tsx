import { type FC, useId } from 'react';

import ChatExampleForm from './example-form';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import type { Address } from 'viem';

import AddressInfo from '@/components/templates/address-info';
import { Button } from '@/components/ui';

const ChatExamples: FC = () => {
  const fieldsetId = useId();

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
          { label: '5/9', address: '0xA85572Cd96f1643458f17340b6f0D6549Af482F5' },
          { label: 'shunkakinoki', address: '0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed' },
          { label: 'Euler Exploiter', address: '0xb66cd966670d962c227b3eaba30a872dbfb995db' },
        ].map((example, index) => (
          <div
            key={example.address}
            className={clsx(
              'flex w-full items-center justify-between px-4 py-2.5',
              index !== 0 && 'border-t border-gray-6',
            )}
          >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore Async Server Component */}
            <AddressInfo address={example.address as Address} label={example.label} />
            <Button href={`/chat/${example.address}`} size="sm" rightIcon={<ChevronRight />}>
              View
            </Button>
          </div>
        ))}
      </fieldset>

      <ChatExampleForm />
    </div>
  );
};

export default ChatExamples;
