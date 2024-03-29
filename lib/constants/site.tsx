import { MessageCircle } from 'lucide-react';

import type { Exploration } from '@/lib/types/site';

/**
 * UI/UX explorations of on-chain data on [**tx.cool**](https://tx.cool).
 */
export const EXPLORATIONS: Exploration[] = [
  {
    name: '/chat',
    slug: '/chat',
    description: 'Visualization of on-chain messages with a chat-like UI/UX.',
    icon: <MessageCircle />,
  },
];
