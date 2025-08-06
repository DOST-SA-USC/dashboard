'use client';

import { Plus, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { SimpleEditor } from '@/components/tiptap/tiptap-templates/simple/simple-editor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';

import type { Content } from '@tiptap/react';

const NewAnnouncement = () => {
  const isMobile = useIsMobile();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<Content | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log('Content initialized:', content);
  }, [content]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (title !== '' || content !== null) {
        e.preventDefault();
        return 'Are you sure you want to refresh? Unsaved changes will be lost.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [title, content]);

  return (
    <>
      <Button
        variant={isMobile ? 'default' : 'outline'}
        className={isMobile ? 'absolute right-8 bottom-8 scale-120' : ''}
        size={isMobile ? 'icon' : 'default'}
        onClick={() => setIsOpen(true)}
      >
        <Plus />
        {isMobile ? '' : 'New'}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="flex h-full max-h-[800px] !max-w-[95%] flex-col md:!max-w-4xl"
        >
          <DialogHeader>
            <DialogTitle>New Announcement</DialogTitle>
            <DialogDescription>
              Create a new announcement to share with your team or organization.
            </DialogDescription>
          </DialogHeader>
          <div className="flex h-full w-full flex-1 flex-col overflow-hidden">
            <Label className="mb-2" htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Announcement Title"
              className="mb-4 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
            <Label className="mb-2" htmlFor="content">
              Content
            </Label>
            <Card
              id="content"
              className="h-full w-full flex-1 !gap-0 overflow-hidden !p-0"
            >
              <div className="h-full w-full overflow-auto">
                <div className="max-h-full min-h-full overflow-auto">
                  <SimpleEditor content={content} updateContent={setContent} />
                </div>
              </div>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button>
              <Upload />
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewAnnouncement;
