'use client';

import type { FC } from 'react';

import * as RadixAvatar from '@radix-ui/react-avatar';
import BoringAvatar from 'boring-avatars';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/* Props */
type AvatarProps = {
  className?: string;
  src: string;
  alt: string;
  size?: number;
};

/* Component */
const Avatar: FC<AvatarProps> = ({ className, src, alt, size = 40 }) => {
  return (
    <RadixAvatar.Root>
      <RadixAvatar.Image
        className={twMerge(clsx('rounded-full', className))}
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
      <RadixAvatar.Fallback className={twMerge(clsx('overflow-hidden rounded-full', className))}>
        <BoringAvatar size={size} name={alt} variant="marble" />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

export default Avatar;
