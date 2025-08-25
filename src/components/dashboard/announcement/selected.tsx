'use client';
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatDate, getUserInitials } from '@/lib/helpers';
import { AnnouncementType } from '@/type';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { tiptapToHTML } from '@/lib/tiptap-to-html';

const SelectedAnnouncement = (props: {
  announcement: AnnouncementType | null;
  setAnnouncement: (arg: null) => void;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer
        open={!!props.announcement}
        onOpenChange={() => props.setAnnouncement(null)}
      >
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>{props.announcement?.title}</DrawerTitle>
          </DrawerHeader>
          <div className="border-border mt-2 flex w-full flex-col border-y">
            <div className="border-border flex w-full items-center justify-between border-b p-4">
              <div className="flex w-full flex-1 items-center gap-3">
                <Avatar className="bg-accent flex size-8 items-center justify-center text-base font-medium">
                  <AvatarImage
                    src={props.announcement?.authorImageURL as string}
                    alt={props.announcement?.authorName}
                  />
                  <AvatarFallback>
                    {getUserInitials(props.announcement?.authorName || '')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-base leading-4 font-semibold">
                    {props.announcement?.authorName}
                  </p>
                  <span className="text-xs">
                    {props.announcement?.authorPosition}
                  </span>
                </div>
              </div>
              <span className="text-muted-foreground text-xs">
                {formatDate(new Date(props.announcement?.createdAt || ''))}
              </span>
            </div>
            <div className="p-2 px-4">
              <p className="text-base font-bold">
                Subject: {props.announcement?.title}
              </p>
            </div>
          </div>
          <div className="overflow-x-hidden overflow-y-auto p-4">
            <div
              className="simple-editor-content mt-2 text-justify text-sm"
              role="presentation"
            >
              {props.announcement?.content && (
                <div
                  className="prose prose-sm tiptap ProseMirror max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: tiptapToHTML(props.announcement?.content) || '',
                  }}
                />
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog
        open={!!props.announcement}
        onOpenChange={() => props.setAnnouncement(null)}
      >
        <DialogContent className="flex min-h-[696px] flex-col gap-0 p-0 md:min-w-2xl lg:min-w-4xl">
          {/* header */}
          <DialogHeader className="border-border flex h-fit w-full flex-col gap-0 border-b p-0">
            <DialogTitle className="sr-only">
              {props.announcement?.title}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Announcement Details
            </DialogDescription>
            <div className="border-border flex w-full items-center justify-between border-b p-4">
              <div className="flex w-full flex-1 items-center gap-3">
                <Avatar className="bg-accent flex size-8 items-center justify-center text-base font-medium">
                  <AvatarImage
                    src={props.announcement?.authorImageURL as string}
                    alt={props.announcement?.authorName}
                  />
                  <AvatarFallback>
                    {getUserInitials(props.announcement?.authorName || '')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-base leading-4 font-semibold">
                    {props.announcement?.authorName}
                  </p>
                  <span className="text-xs">
                    {props.announcement?.authorPosition}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 px-4">
              <p className="text-base font-bold">
                Subject: {props.announcement?.title}
              </p>
              <span className="text-muted-foreground text-xs">
                {props.announcement?.createdAt &&
                  formatDate(new Date(props.announcement?.createdAt || ''))}
              </span>
            </div>
          </DialogHeader>
          {/* body */}
          <div className="overflow-x-hidden p-4">
            {props.announcement?.content && (
              <div
                className="prose prose-sm tiptap ProseMirror simple-editor max-w-none"
                dangerouslySetInnerHTML={{
                  __html: tiptapToHTML(props.announcement.content) || '',
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
};

export default SelectedAnnouncement;
