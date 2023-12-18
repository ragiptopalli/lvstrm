'use client';

import { useSidebar } from '@/lib/store/use-sidebar';
import { Follow, User } from '@prisma/client';
import { UserItem, UserItemSkeleton } from './user-item';

interface FollowingProps {
  users: (Follow & {
    following: User & {
      Stream: { isLive: boolean } | null;
    };
  })[];
}

export const Following = ({ users }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);

  if (!users.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className='pl-6 mb-4'>
          <p className='text-sm text-muted-foreground font-bold'>
            Followed Users
          </p>
        </div>
      )}
      <ul className='space-y-2 px-2'>
        {users.map(({ following }) => (
          <UserItem
            key={following.id}
            username={following.username}
            imageUrl={following.imageUrl}
            isLive={following.Stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className='px-2 pt-2 lg:pt-0'>
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
