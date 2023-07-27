import type { ReactNode } from 'react';

/**
 * Type for a UI/UX exploration of on-chain data.
 * @param name Name describing the exploration.
 * @param slug Slug/URL of the exploration.
 * @param description Short description of the explroation.
 * @param icon Optional icon to describe/represent the exploration.
 */
export type Exploration = {
  name: string;
  slug: PageSlug | PageExternalLink;
  description: string;
  icon: ReactNode;
};

/**
 * Type for an external link.
 * @param name Name describing the link.
 * @param href URL of the link.
 * @param icon Optional icon to describe/represent the link.
 */
export type ExternalLink = {
  name: string;
  href: string;
  icon?: ReactNode;
};

/**
 * Type for an external page linked on [**tx.cool**](https://tx.cool), intended
 * to be part of configuration files (e.g. for the navigation bar component).
 */
export type PageExternalLink =
  | 'https://twitter.com/fiveoutofnine'
  | 'https://github.com/fiveoutofnine';

/**
 * Type for a page slug on [**tx.cool**](https://tx.cool).
 */
export type PageSlug = '/' | '/chat';
