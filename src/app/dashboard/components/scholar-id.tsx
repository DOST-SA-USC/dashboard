'use client';

import React from 'react';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { Printer } from 'lucide-react';

const ScholarIDModal = (props: React.ComponentProps<typeof Dialog>) => {
  return (
    <Dialog {...props}>
      <DialogContent className="!max-w-2xl">
        <DialogHeader>
          <DialogTitle>Scholar ID</DialogTitle>
          <DialogDescription>
            This is your official DOST SA USC Scholar ID. You can use this for
            identification purposes and to access various services provided by
            the scholarship.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center gap-4 overflow-x-auto">
          <Image
            src="/scholar_id/idSkinFront.png"
            alt="Scholar ID"
            width={300}
            height={100}
            className="rounded-lg"
          />
          <Image
            src="/scholar_id/idSkinBack.png"
            alt="Scholar ID"
            width={300}
            height={100}
            className="rounded-lg"
          />
        </div>
        <DialogFooter className="flex w-full flex-col-reverse gap-4">
          <span className="text-muted-foreground flex items-center justify-center gap-2 text-xs md:text-sm">
            To edit, contact DOST SA USC.
          </span>
          <Button variant="default" className="px-8">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScholarIDModal;
