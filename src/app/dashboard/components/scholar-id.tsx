'use client';

import { Printer } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import IDComponent from './ui/id-component';

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

        <IDComponent />

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
