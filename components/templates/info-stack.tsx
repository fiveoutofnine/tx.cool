import type { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/* Props */
type InfoStackProps = JSX.IntrinsicElements['div'] & {
  title: string;
  description: string;
  icon?: ReactNode;
};

/* Component */
const InfoStack: FC<InfoStackProps> = ({
  className,
  title,
  description,
  icon,
  children,
  ...rest
}) => {
  return (
    <div className={twMerge(clsx('flex flex-col items-center gap-6', className))} {...rest}>
      {icon ? (
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-6 bg-gray-2 text-gray-11">
          <div className="scale-[1.5]">{icon}</div>
        </div>
      ) : null}
      <div className="flex flex-col items-center gap-1 md:gap-2">
        <h1 className="text-center text-3xl font-semibold text-gray-12 md:text-5xl">{title}</h1>
        <p className="text-center text-lg text-gray-11 md:text-xl">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default InfoStack;
