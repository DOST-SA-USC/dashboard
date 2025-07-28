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

import { Pencil, Printer } from 'lucide-react';

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
        <DialogFooter className="flex w-full flex-col gap-2">
          {/* Once set up, display print button and hide setup button */}
          <Button variant="outline" className="px-8">
            <Pencil className="mr-2 h-4 w-4" />
            Set Up
          </Button>
          <Button variant="default" className="px-8" disabled>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScholarIDModal;
