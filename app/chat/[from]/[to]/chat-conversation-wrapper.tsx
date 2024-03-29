'use client';

import { type FC, type ReactNode, useEffect, useRef } from 'react';

/* Props */
type ChatConversationWrapperProps = {
  children: ReactNode;
};

/* Component */
const ChatConversationWrapper: FC<ChatConversationWrapperProps> = ({ children }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => messagesEndRef.current?.scrollIntoView(), []);

  return (
    <div className="flex flex-col">
      {children}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatConversationWrapper;
