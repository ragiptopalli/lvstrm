'use client';

import { onFollow, onUnFollow } from '@/actions/follow';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface ActionsProp {
  userId: string;
  isFollowing: boolean;
}

export const Actions = ({ userId, isFollowing }: ActionsProp) => {
  const [isPending, startTransition] = useTransition();

  const handleFollowUser = () => {
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

  const handleUnfollowUser = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then(({ following }) =>
          toast.success(`You have unfollowed ${following.username}`)
        )
        .catch(() =>
          toast.error('Something went wrong, please try again later!')
        );
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={isFollowing ? handleUnfollowUser : handleFollowUser}
      variant='primary'
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
