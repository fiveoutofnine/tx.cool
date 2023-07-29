import { MessageCircle } from 'lucide-react';

import InfoStack from '@/components/templates/info-stack';

export default function ChatFrom() {
  return (
    <div className="hidden min-h-screen flex-col items-center justify-center px-24 py-16 md:flex">
      <InfoStack
        title="No chat selected"
        description="Select a chat from the left to get started."
        icon={<MessageCircle />}
      />
    </div>
  );
}
