'use client';

import { useEffect, useMemo, useState } from 'react';

import { ConnectionState } from 'livekit-client';
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';

import { ChatVariant, useChatSidebar } from '@/lib/store/use-chat-sidebar';
import { useMediaQuery } from 'usehooks-ts';

import { ChatHeader } from './chat-header';
import { ChatForm } from './chat-form';
import { ChatList } from './chat-list';

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  chatEnabled: boolean;
  chatDelayed: boolean;
  chatFollowerOnly: boolean;
}

export const Chat = ({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  chatEnabled,
  chatDelayed,
  chatFollowerOnly,
}: ChatProps) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { variant, onExpand } = useChatSidebar((state) => state);

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !chatEnabled || !isOnline;

  const [value, setValue] = useState('');

  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (isMobile) {
      onExpand();
    }
  }, [isMobile, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue('');
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className='flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]'>
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={chatFollowerOnly}
            isDelayed={chatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && <h1>Chat community</h1>}
    </div>
  );
};
