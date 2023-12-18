'use client';

import { updateStream } from '@/actions/stream';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { useTransition } from 'react';
import { toast } from 'sonner';

type FieldTypes = 'chatEnabled' | 'chatDelayed' | 'chatFollowerOnly';

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
}

export const ToggleCard = ({
  label,
  value = false,
  field,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const handleCheckedChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success('Chat setting has been updated!'))
        .catch(() =>
          toast.error('Something went wrong, please try again later!')
        );
    });
  };
  return (
    <div className='rounded-xl bg-muted p-6'>
      <div className='flex items-center justify-between'>
        <p className='font-semibold shrink-0'>{label}</p>
        <div className='space-y-2'>
          <Switch
            checked={value}
            onCheckedChange={handleCheckedChange}
            disabled={isPending}
          >
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className='rounded-xl p-10 w-full' />;
};
