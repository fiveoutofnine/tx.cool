import Link from 'next/link';
import type { FC } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/* Props */
type LogoProps = {
  className?: string;
  href?: string;
};

/* Component */
const Logo: FC<LogoProps> = ({ className, href = '/' }) => {
  return (
    <Link
      href={href}
      className={clsx(twMerge('h-8 w-8 hover:brightness-75', className))}
      aria-label="Home"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <title>tx.cool</title>
        <desc>tx.cool logo.</desc>
        <path
          className="fill-gray-12"
          d="M9.613 6.91v3.408H.988V6.91h8.625ZM2.658 3.772h4.705V15.79c0 .182.03.335.093.46.063.12.16.21.29.273.13.056.298.085.503.085.142 0 .307-.017.494-.051.193-.034.335-.063.426-.085l.682 3.306a15.1 15.1 0 0 1-.903.23 7.95 7.95 0 0 1-1.38.18c-1.08.056-1.987-.054-2.72-.333-.733-.284-1.284-.73-1.653-1.338-.37-.608-.548-1.37-.537-2.284V3.773Zm11.66 3.136 1.908 4.057 2.012-4.057h4.67l-3.511 6.546 3.681 6.545h-4.636l-2.216-4.16-2.147 4.16H9.373l3.716-6.545-3.477-6.546h4.704Z"
        />
      </svg>
    </Link>
  );
};

Logo.displayName = 'Logo';

export default Logo;
