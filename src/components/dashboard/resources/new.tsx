'use client';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/userStore';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const NewResource = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();

  if (!user || user.role === 'student') return null;

  return (
    <>
      <Button
        size="sm"
        className="text-xs sm:text-sm md:text-base"
        // onClick={() => setOpen(true)}
      >
        <Plus className="size-3 sm:size-4" />
        New
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Resource</DialogTitle>
            <DialogDescription>
              Please fill out the form below to create a new resource.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewResource;
