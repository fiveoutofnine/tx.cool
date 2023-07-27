'use client';

import { type FC, Fragment } from 'react';

import Logo from './logo';
import { Github, Home, Twitter } from 'lucide-react';

import { EXPLORATIONS } from '@/lib/constants/site';

import { IconButton } from '@/components/ui';

const NavBar: FC = () => {
  return (
    <Fragment>
      <DesktopNavBar />
      <MobileNavBar />
    </Fragment>
  );
};

const DesktopNavBar: FC = () => {
  return (
    <nav className="pointer-events-auto fixed z-popover hidden min-h-screen w-12 flex-col items-center border-r border-gray-6 dark:bg-gray-2 md:flex">
      <div className="flex h-12 w-12 items-center justify-center border-b border-gray-6">
        <Logo />
      </div>
      <div className="p-2">
        {EXPLORATIONS.map((exploration) => (
          <IconButton key={exploration.slug}>{exploration.icon}</IconButton>
        ))}
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

const MobileNavBar: FC = () => {
  return (
    <nav className="pointer-events-auto absolute bottom-0 z-popover flex h-12 w-full items-center justify-around border-t border-gray-6 px-4 dark:bg-gray-2 md:hidden">
      <IconButton href="/">
        <Home />
      </IconButton>
      {EXPLORATIONS.map((exploration) => (
        <IconButton key={exploration.slug}>{exploration.icon}</IconButton>
      ))}
    </nav>
  );
};

export default NavBar;
