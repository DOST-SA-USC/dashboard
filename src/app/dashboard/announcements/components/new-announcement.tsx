'use client';

import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { SimpleEditor } from '@/components/tiptap/tiptap-templates/simple/simple-editor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

import type { Content } from '@tiptap/react';
const NewAnnouncement = () => {
  const isMobile = useIsMobile();
  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    console.log('Content initialized:', content);
  }, [content]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={isMobile ? 'default' : 'outline'}
          className={isMobile ? 'absolute right-8 bottom-8 scale-120' : ''}
          size={isMobile ? 'icon' : 'default'}
        >
          <Plus />
          {isMobile ? '' : 'New'}
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[95%] md:!max-w-7xl">
        <DialogHeader>
          <DialogTitle>New Announcement</DialogTitle>
          <DialogDescription>
            Create a new announcement to share with your team or organization.
          </DialogDescription>
        </DialogHeader>
        <div className="!max-h-[70vh] w-full">
          <Card className="h-full w-full !gap-0 overflow-hidden !p-0">
            <SimpleEditor content={content} updateContent={setContent} />
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewAnnouncement;
