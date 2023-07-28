'use client';

import { useRouter } from 'next/navigation';
import { type FC, useId, useState } from 'react';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui';

const ChatExampleForm: FC = () => {
  const [address, setAddress] = useState<string>('');
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const inputId = useId();
  const hintId = useId();
  const router = useRouter();

  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/chat/${address}`);
      }}
    >
      <label htmlFor={inputId} className="text-xs text-gray-11">
        Or enter an ENS/address
      </label>
      <div className="relative mt-1 flex items-center">
        <input
          id={inputId}
          className="h-10 w-full rounded-lg border border-gray-7 bg-gray-2 px-3 text-gray-12 transition-colors placeholder:text-gray-11 hover:border-gray-8 focus:border-blue-9 focus:outline-none"
          type="text"
          pattern="(0x[0-9a-fA-F]{40}|[a-zA-Z0-9-]{3,253}\.eth)"
          placeholder="example.eth"
          title="Enter an ENS name or address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setSubmitDisabled(e.target.value.length === 0 || e.target.validity.patternMismatch);
          }}
          aria-describedby={hintId}
          aria-invalid={submitDisabled}
          aria-label="Enter an ENS name or address"
        />
        <div className="absolute right-2 flex">
          <div className="pointer-events-none h-6 w-6 bg-gradient-to-l from-gray-2" />
          <Button
            size="sm"
            rightIcon={<ChevronRight />}
            title={submitDisabled ? undefined : `/chat/${address}`}
            type="submit"
            disabled={submitDisabled}
          >
            View
          </Button>
        </div>
      </div>
      {submitDisabled && address.length ? (
        <small id={hintId} className="mt-1 text-xs text-red-11">
          Must be a valid ENS name or Ethereum address.
        </small>
      ) : null}
    </form>
  );
};

export default ChatExampleForm;
