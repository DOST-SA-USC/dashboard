import React from 'react';

import IDComponent from '@/components/dashboard/id/id-component';

import { Card } from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Printer } from 'lucide-react';

const Content = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 lg:flex-row">
      <Card className="flex h-full w-full flex-col justify-between gap-0 p-0 lg:w-1/2">
        <div className="border-border border-b p-4">
          <h1 className="font-bold">Scholar ID</h1>
        </div>
        <div className="h-full w-full flex-1 p-4">
          <p>
            This is your official <strong>DOST SA USC Scholar ID</strong>. You
            can use this for identification purposes and to access various
            services provided by the scholarship such as:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>Access to exclusive events and workshops</li>
            <li>Priority registration for courses</li>
            <li>Discounts on academic materials and resources</li>
          </ul>
        </div>
        <div className="border-border flex items-center justify-end border-t p-4">
          <Button>
            <Printer className="mr-2 size-4" />
            Print
          </Button>
        </div>
      </Card>
      <Card className="flex h-full w-full flex-col items-center justify-between gap-6 p-4 md:p-0">
        <IDComponent />
      </Card>
    </div>
  );
};

export default Content;
