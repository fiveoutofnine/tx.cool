import { EXPLORATIONS } from '@/lib/constants/site';

import ChatExamples from '@/components/pages/chat/examples';
import InfoStack from '@/components/templates/info-stack';

const CHAT_EXPLORATION = EXPLORATIONS[0];

export default function Chat() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 pb-16 md:px-24 md:py-16">
      <InfoStack
        title={CHAT_EXPLORATION.name}
        description={CHAT_EXPLORATION.description}
        icon={CHAT_EXPLORATION.icon}
      >
        <ChatExamples />
      </InfoStack>
    </div>
  );
}
