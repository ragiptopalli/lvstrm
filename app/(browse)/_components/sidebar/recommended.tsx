'use client';

import { useSidebar } from '@/lib/store/use-sidebar';
import { User } from '@prisma/client';
import { UserItem, UserItemSkeleton } from './user-item';

interface RecommendedProps {
  users: (User & { stream: { isLive: boolean } | null })[];
}

export const Recommended = ({ users }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && users.length > 0;

  return (
    <div>
      {showLabel && (
        <div className='pl-6 mb-4'>
          <p className='text-sm text-muted-foreground font-bold'>
            Recommended Users
          </p>
        </div>
      )}
      <ul className='space-y-2 px-2'>
        {users.map(({ id, username, imageUrl, stream }) => (
          <UserItem
            key={id}
            username={username}
            imageUrl={imageUrl}
            isLive={stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className='px-2'>
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
