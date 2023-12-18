import { getSelf } from '@/lib/auth/auth-service';
import { getStreamByUserId } from '@/lib/stream-service';
import { ToggleCard } from './_components/toggle-card';

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) throw new Error('Stream not found');

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Chat Settings</h1>
      </div>
      <div className='space-y-4'>
        <ToggleCard
          field='chatEnabled'
          label='Enable chat'
          value={stream.chatEnabled}
        />
        <ToggleCard
          field='chatDelayed'
          label='Delay Chat'
          value={stream.chatDelayed}
        />
        <ToggleCard
          field='chatFollowerOnly'
          label='Followers only chat'
          value={stream.chatFollowerOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
