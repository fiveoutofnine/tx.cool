import Link from 'next/link';

import { Github } from 'lucide-react';

import { EXPLORATIONS } from '@/lib/constants/site';

import { Button } from '@/components/ui';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col p-4 pb-16 md:py-16 md:pl-36 md:pr-24">
      <h1 className="mb-4 text-left text-5xl font-black tracking-tighter text-gray-12 md:text-6xl">
        tx.cool
      </h1>
      <p className="mb-4 text-left text-lg text-gray-11 sm:text-xl md:text-2xl">
        UI/UX explorations of on-chain data.
      </p>
      <div className="grid grid-cols-2 flex-wrap gap-2">
        <Button
          className="col-span-2 w-full min-[432px]:w-fit"
          href="https://github.com/fiveoutofnine/tx.cool"
          leftIcon={<Github />}
          newTab
        >
          fiveoutofnine/tx.cool
        </Button>
      </div>

      <h2 className="mb-4 mt-6 text-left text-xl font-semibold tracking-tight text-gray-12 md:mt-12 md:text-2xl">
        Explorations
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {EXPLORATIONS.map((exploration) => (
          <Link
            key={exploration.slug}
            href={exploration.slug}
            className="rounded-xl border border-gray-7 bg-gray-3 p-4 transition-colors hover:border-gray-8 md:col-span-2 xl:col-span-1"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-6 bg-gray-3 text-gray-11">
              <span className="h-6 w-6">{exploration.icon}</span>
            </div>
            <div className="mt-3 font-medium text-gray-12">{exploration.name}</div>
            <div className="mt-1 text-sm text-gray-11">{exploration.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
