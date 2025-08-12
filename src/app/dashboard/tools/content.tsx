'use client';

import { Meh, Frown } from 'lucide-react';
import React from 'react';

import { useUserStore } from '@/stores/userStore';

const Content = () => {
  const { user } = useUserStore();

  if (!user) {
    return null;
  }
  return (
    <div className="h-full w-full p-2">
      <div className="border-border bg-muted/20 text-secondary/40 flex h-full w-full flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed">
        {user.role !== 'student' ? (
          <>
            <Meh className="size-16 sm:size-18 md:size-20" />
            <h1 className="text-lg font-extrabold sm:text-xl md:text-2xl">
              Coming Soon
            </h1>
          </>
        ) : (
          <>
            <Frown className="size-16 sm:size-18 md:size-20" />
            <h1 className="text-lg font-extrabold sm:text-xl md:text-2xl">
              Access Denied
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
