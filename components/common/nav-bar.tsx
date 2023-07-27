'use client';

import { type FC, Fragment } from 'react';

import Logo from './logo';
import clsx from 'clsx';

import { Button } from '@/components/ui';

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
    <nav className="pointer-events-auto z-popover hidden min-h-screen w-12 flex-col items-center border-r border-gray-6 px-4 dark:bg-gray-2 md:flex">
      <Logo />
      <div className="flex-grow" />
    </nav>
  );
};

const MobileNavBar: FC = () => {
  return (
    <nav className="pointer-events-auto absolute bottom-0 z-popover flex h-12 w-full items-center border-t border-gray-6 px-4 dark:bg-gray-2 md:hidden">
      <Logo />
      <div className="flex-grow" />
    </nav>
  );
};

export default NavBar;
