import { Printer } from 'lucide-react';
import React from 'react';

import IDComponent from '@/components/dashboard/id/id-component';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ID_DATA } from '@/data/id';

const Content = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 lg:flex-row">
      <Card className="flex h-full w-full flex-col justify-between gap-0 p-0 lg:w-1/2">
        <div className="border-border border-b p-4">
          <h1 className="font-bold">{ID_DATA.title}</h1>
        </div>
        <div className="h-full w-full flex-1 p-4">
          <p>{ID_DATA.description}</p>
          <ul className="mt-2 list-disc pl-5">
            {ID_DATA.services.map((service, idx) => (
              <li key={idx}>{service}</li>
            ))}
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
