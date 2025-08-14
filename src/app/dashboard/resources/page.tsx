import React from 'react';

import Content from './content';
import New from '@/components/dashboard/resources/new';

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl">Resources</h1>
        <New />
      </div>
      <p className="text-muted-foreground text-xs md:text-sm">
        Explore the various resources available for DOST SA USC scholars.
      </p>

      <Content />
    </div>
  );
};

export default Page;
