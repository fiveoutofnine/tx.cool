import { publicClient } from '@/lib/client';

import Avatar from '@/components/templates/avatar';

/* Props */
type ENSAvatarProps = {
  name: string;
};

/* Component */
export default async function ENSAvatar({ name }: ENSAvatarProps) {
  const data = await publicClient.getEnsAvatar({ name });

  return <Avatar src={data ?? ''} alt={`ENS avatar for ${name}`} size={40} />;
}
