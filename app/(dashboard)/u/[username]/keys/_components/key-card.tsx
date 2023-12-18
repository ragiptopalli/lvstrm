'use client';

import { useCallback, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { CopyButton } from './copy-button';
import { Eye, EyeOff } from 'lucide-react';
import { Hint } from '@/components/hint';

interface KeyCardProps {
  value: string;
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);

  const toggleShow = useCallback(() => setShow((x) => !x), []);

  const Icon = show ? Eye : EyeOff;
  const type = show ? 'text' : 'password';
  const label = show ? 'Hide' : 'Show';

  return (
    <div className='rounded-xl bg-muted p-6'>
      <div className='flex items-start gap-x-10'>
        <p className='font-semibold shrink-0'>Stream Key</p>
        <div className='space-y-2 w-full'>
          <div className='w-full flex items-center gap-x-2'>
            <Input
              value={value}
              type={type}
              disabled
              placeholder='Stream key'
            />
            <Hint label={label} asChild>
              <Button onClick={toggleShow} size='sm' variant='link'>
                {<Icon className='h-4 w-4' />}
              </Button>
            </Hint>
            <CopyButton value={value} />
          </div>
        </div>
      </div>
    </div>
  );
};
