'use client';

import { onBlock } from '@/actions/block';
import { onFollow, onUnfollow } from '@/actions/follow';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface ActionsProp {
  userId: string;
  isFollowing: boolean;
}

export const Actions = ({ userId, isFollowing }: ActionsProp) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then(({ following }) =>
          toast.success(`Started following ${following.username}`)
        )
        .catch(() =>
          toast.error('Something went wrong, please try again later!')
        );
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then(({ following }) =>
          toast.success(`Unfollowed ${following.username}`)
        )
        .catch(() =>
          toast.error('Something went wrong, please try again later!')
        );
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then(({ blocked }) =>
          toast.success(`You have blocked ${blocked.username}`)
        )
        .catch(() =>
          toast.error('Something went wrong, please try again later!')
        );
    });
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={isFollowing ? handleUnfollow : handleFollow}
        variant='primary'
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button disabled={isPending} onClick={handleBlock}>
        Block
      </Button>
    </>
  );
};
