'use client';

import { usePathname } from 'next/navigation';
import { type FC, Fragment } from 'react';

import Logo from './logo';
import { Github, Home, Twitter } from 'lucide-react';

import { EXPLORATIONS } from '@/lib/constants/site';

import { IconButton } from '@/components/ui';

/* Props */
export type NavBarInternalProps = {
  selected: string;
};

/* Component */
const NavBar: FC = () => {
  const pathname = usePathname();
  const path = pathname.split('/');
  const selected = `/${!path || path.length < 1 ? '' : path[1]}`;

  return (
    <Fragment>
      <NavBarDesktop selected={selected} />
      <NavBarMobile selected={selected} />
    </Fragment>
  );
};

const NavBarDesktop: FC<NavBarInternalProps> = ({ selected }) => {
  return (
    <nav className="pointer-events-auto fixed z-popover hidden min-h-screen w-12 flex-col items-center border-r border-gray-6 dark:bg-gray-2 md:flex">
      <div className="flex h-12 w-12 items-center justify-center border-b border-gray-6">
        <Logo />
      </div>
      <div className="p-2">
        <NavBarInternal selected={selected} />
      </div>
      <div className="flex-grow" />
      <div className="flex flex-col gap-2 border-t border-gray-6 p-2">
        <IconButton href="https://github.com/fiveoutofnine/tx.cool" newTab>
          <Github />
        </IconButton>
        <IconButton href="https://twitter.com/fiveoutofnine" newTab>
          <Twitter />
        </IconButton>
      </div>
    </nav>
  );
};

const NavBarMobile: FC<NavBarInternalProps> = ({ selected }) => {
  const homeSelected = selected === '/';

  return (
    <nav className="pointer-events-auto absolute bottom-0 z-popover flex h-12 w-full items-center justify-around border-t border-gray-6 px-4 dark:bg-gray-2 md:hidden">
      <IconButton
        className={homeSelected ? 'cursor-default bg-gray-4' : ''}
        variant="ghost"
        href="/"
        disabled={homeSelected}
      >
        <Home />
      </IconButton>
      <NavBarInternal selected={selected} />
    </nav>
  );
};

const NavBarInternal: FC<NavBarInternalProps> = ({ selected }) => {
  return (
    <Fragment>
      {EXPLORATIONS.map((exploration) => {
        const pageSelected = selected === exploration.slug;

        return (
          <IconButton
            key={exploration.slug}
            className={pageSelected ? 'cursor-default bg-gray-4' : ''}
            variant="ghost"
            href={exploration.slug}
            disabled={pageSelected}
          >
            {exploration.icon}
          </IconButton>
        );
      })}
    </Fragment>
  );
};

export default NavBar;
