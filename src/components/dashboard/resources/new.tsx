'use client';
import { Plus, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import AlertAction from '@/components/dashboard/ui/action-alert';
import MyEmojiPicker from '@/components/dashboard/ui/emoji-picker';
import { SimpleEditor } from '@/components/tiptap/tiptap-templates/simple/simple-editor';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TABS } from '@/data/resources';
import { useUserStore } from '@/stores/userStore';

import type { Content } from '@tiptap/react';

import type { TabType } from '@/type';

const NewResource = () => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('📚');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TabType>('guides');
  const [link, setLink] = useState('');
  const [content, setContent] = useState<Content | null>(null);

  const { user } = useUserStore();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (title !== '' || content !== null || emoji !== '') {
        e.preventDefault();
        return 'Are you sure you want to refresh? Unsaved changes will be lost.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [title, content, emoji]);

  if (!user || user.role === 'student') return null;

  const handleSubmit = async () => {
    setIsPending(true);
    console.log('Submitting new resource:');
    setIsPending(false);
  };

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
        <DialogContent
          showCloseButton={false}
          className="flex h-full max-h-[800px] !max-w-[95%] flex-col md:!max-w-4xl"
        >
          <DialogHeader className="text-left">
            <DialogTitle>New Resource</DialogTitle>
            <DialogDescription>
              Please fill out the information below to create a new resource.
            </DialogDescription>
          </DialogHeader>
          <div className="flex h-full w-full flex-1 flex-col overflow-hidden md:px-2">
            <Accordion
              type="single"
              collapsible={type !== 'links'}
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Resource Details</AccordionTrigger>
                <AccordionContent>
                  <div className="mb-4 flex w-full flex-col items-center justify-center gap-4 md:flex-row">
                    <div className="flex w-full gap-4">
                      <div className="w-full flex-1">
                        <Label className="mb-2">Icon</Label>
                        <MyEmojiPicker
                          selectedEmoji={emoji}
                          setSelectedEmoji={setEmoji}
                        />
                      </div>

                      <div className="w-full">
                        <Label className="mb-2" htmlFor="title">
                          Title
                        </Label>
                        <Input
                          id="title"
                          placeholder="Resource Title"
                          className="w-full"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="w-full flex-1">
                      <Label className="mb-2" htmlFor="type">
                        Type
                      </Label>
                      <Select
                        value={type}
                        onValueChange={(value) => setType(value as TabType)}
                      >
                        <SelectTrigger id="type" className="w-full">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {TABS.map((tab) => (
                            <SelectItem key={tab.value} value={tab.value}>
                              {tab.lgLabel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-4 w-full">
                    <Label className="mb-2" htmlFor="description">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Resource Description"
                      className="w-full"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {type !== 'links' ? (
              <>
                <Label className="mb-2" htmlFor="content">
                  Content
                </Label>
                <Card
                  id="content"
                  className="h-full w-full flex-1 !gap-0 overflow-hidden !p-0"
                >
                  <div className="h-full w-full overflow-auto">
                    <div className="max-h-full min-h-full overflow-auto">
                      <SimpleEditor
                        content={content}
                        updateContent={setContent}
                      />
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <div className="w-full">
                <Label className="mb-2" htmlFor="link">
                  Link
                </Label>
                <Input
                  id="link"
                  placeholder="www.example.com"
                  className="w-full"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            )}
          </div>
          <DialogFooter className="md:px-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <AlertAction
              button={{
                label: 'Post',
                icon: Upload,
                onClick: () =>
                  toast.promise(handleSubmit(), {
                    loading: 'Posting resource...',
                    success: 'Resource posted successfully!',
                    error: (err) => `Failed to post resource: ${err}`,
                  }),
                variant: 'default',
                disable:
                  title === '' || !content || content === null || isPending,
              }}
              body={{
                title: 'Post Resource',
                description:
                  'Make sure all information is correct before posting. This action cannot be undone.',
              }}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewResource;
