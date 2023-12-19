'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

import { onFollow, onUnfollow } from '@/actions/follow';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart } from 'lucide-react';

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { userId } = useAuth();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
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
      onUnfollow(hostIdentity)
        .then((data) => toast.success(`Unfollowed ${data.following.username}`))
        .catch(() =>
          toast.error('Something went wrong, please try again later!')
        );
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push('/sign-in');
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant='primary'
      size='sm'
      className='w-full lg:w-auto'
    >
      <Heart
        className={cn('h-4 w-4 mr-2', isFollowing ? 'fill-white' : 'fill-none')}
      />
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className='h-10 w-full lg:w-24' />;
};
