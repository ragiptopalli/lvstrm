'use client';

import { useEffect } from 'react';

import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';

import { useSidebar } from '@/lib/store/use-sidebar';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  useEffect(() => {
    if (isMobile) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [isMobile, onCollapse, onExpand]);

  return (
    <div
      className={cn('flex-1', collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60')}
    >
      {children}
    </div>
  );
};
