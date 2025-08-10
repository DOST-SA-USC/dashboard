'use client';
import { Printer } from 'lucide-react';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import IDComponent from '@/components/dashboard/id/id-component';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ID_DATA } from '@/data/id';

import { useUserStore } from '@/stores/userStore';

const Content = () => {
  const { user } = useUserStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: user ? user.uscID : 'ID_CARD',
  });

  if (!user) return null;

  return (
    <div className="flex h-auto w-full flex-col gap-4 xl:flex-row">
      <Card className="flex h-full w-full flex-col justify-between gap-0 p-0 xl:w-1/2">
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
        <div className="border-border flex items-center justify-between border-t p-4">
          <p className="text-muted-foreground text-xs">{ID_DATA.edit}</p>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 size-4" />
            Print
          </Button>
        </div>
      </Card>
      <Card className="flex h-auto w-full flex-col items-center justify-between gap-6">
        <IDComponent user={user} ref={contentRef} />
      </Card>
    </div>
  );
};

export default Content;
