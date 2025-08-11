'use client';

import { Plus, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import AlertAction from '@/components/dashboard/ui/action-alert';
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
import { Switch } from '@/components/ui/switch';
import { announcementEmailTemplate } from '@/data/emails';
import { useIsMobile } from '@/hooks/use-mobile';
import { createAnnouncement } from '@/lib/db/announcements';
import { replaceBlobUrls } from '@/lib/db/storage';
import { getAllUserEmails } from '@/lib/db/users';
import { tiptapToHTML } from '@/lib/tiptap-to-html';
import { useUserStore } from '@/stores/userStore';
import { AnnouncementType } from '@/type';

import type { Content } from '@tiptap/react';
const NewAnnouncement = (props: {
  updateData: () => void;
  className?: string;
}) => {
  const { user } = useUserStore();

  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [title, setTitle] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (title !== '' || content !== null || isUrgent) {
        e.preventDefault();
        return 'Are you sure you want to refresh? Unsaved changes will be lost.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [title, isUrgent, content]);

  const handleSubmit = async () => {
    if (!user || user?.role === 'student') {
      console.error('You are not authorized to post announcements.');
      return;
    }

    setIsPending(true);

    const userRole = user.role === 'admin' ? 'officer' : user.role;
    const announcementId = uuidv4();

    const newContent = await replaceBlobUrls(announcementId, content);

    const body: AnnouncementType = {
      id: announcementId,
      type: userRole,
      urgent: isUrgent,
      title: title,
      content: newContent,
      authorID: user.userId,
      authorName: `${user.firstName} ${user.lastName}`,
      authorPosition: user.position || 'N/A',
      authorImageURL: user.image as string,
      createdAt: new Date(),
    };

    const recipients = await getAllUserEmails();

    toast.promise(
      announcementEmailTemplate({
        recipients: recipients,
        title: `${isUrgent ? 'IMPORTANT - ' : ''}${title}`,
        html: tiptapToHTML(newContent),
      }),
      {
        loading: 'Emailing recipients, might take a while...',
        success: 'Email sent successfully!',
        error: (err) => {
          throw new Error(`Failed to send email: ${err}`);
        },
      }
    );

    await createAnnouncement(body);

    setIsPending(false);
    setIsOpen(false);

    setTitle('');
    setIsUrgent(false);
    setContent(null);

    props.updateData();
  };

  if (!user || user?.role === 'student') {
    return null;
  }

  return (
    <>
      <Button
        variant="default"
        className={`${isMobile ? 'absolute right-8 bottom-20 scale-120' : ''} ${props.className}`}
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
            <DialogDescription className="sr-only">
              Have something to share? Let&apos;s create a new announcement.
            </DialogDescription>
          </DialogHeader>
          <div className="flex h-full w-full flex-1 flex-col overflow-hidden md:px-2">
            <div className="flex w-full items-center justify-center gap-4">
              <div className="w-full">
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
              </div>
              <div className="flex space-x-2">
                <Switch
                  id="urgent"
                  checked={isUrgent}
                  onCheckedChange={setIsUrgent}
                />
                <Label htmlFor="urgent">Important</Label>
              </div>
            </div>
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
          <DialogFooter className="md:px-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <AlertAction
              button={{
                label: 'Post',
                icon: Upload,
                onClick: () =>
                  toast.promise(handleSubmit(), {
                    loading: 'Posting announcement...',
                    success: 'Announcement posted successfully!',
                    error: (err) => `Failed to post announcement: ${err}`,
                  }),
                variant: 'default',
                disable:
                  title === '' || !content || content === null || isPending,
              }}
              body={{
                title: 'Post Announcement',
                description:
                  'Make sure all information is correct before posting. This action will notify all relevant users and cannot be undone.',
              }}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewAnnouncement;
