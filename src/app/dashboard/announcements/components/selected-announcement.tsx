'use client';
import { MousePointerClick } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { EditorContent, JSONContent } from '@tiptap/react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatDate, getUserInitials } from '@/lib/helpers';
import { AnnouncementType } from '@/type';

import { useEditor } from '@tiptap/react';

import { handleImageUpload, MAX_FILE_SIZE } from '@/lib/tiptap-utils';
import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Selection } from '@tiptap/extensions';
import { ImageUploadNode } from '@/components/tiptap/tiptap-node/image-upload-node/image-upload-node-extension';

import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { StarterKit } from '@tiptap/starter-kit';

const SelectedAnnouncement = (props: {
  announcement: AnnouncementType | null;
  setAnnouncement: (arg: null) => void;
}) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    content: props.announcement?.content as JSONContent,
    editable: false,
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error('Upload failed:', error),
      }),
    ],
  });

  useEffect(() => {
    if (editor && props.announcement?.content) {
      editor.commands.setContent(props.announcement?.content as JSONContent);
    }
    if (props.announcement && isMobile) {
      setIsOpen(true);
    }
  }, [props.announcement?.content, editor, props.announcement, isMobile]);

  if (isMobile) {
    return (
      <Drawer
        open={isOpen}
        onOpenChange={setIsOpen}
        onClose={() => props.setAnnouncement(null)}
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
            <div className="mt-2 text-justify text-sm">
              {editor && <EditorContent editor={editor} />}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="hidden h-full w-full overflow-hidden p-0 md:flex md:flex-col">
      {props.announcement ? (
        <Card className="h-full w-full flex-1 gap-0 p-0">
          {/* header */}
          <div className="border-border flex w-full flex-col border-b">
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
          {/* body */}
          <div className="h-[60vh] flex-1 overflow-y-auto p-4">
            <div className="prose prose-sm max-w-none">
              {editor && <EditorContent editor={editor} />}
            </div>
          </div>
        </Card>
      ) : (
        <Card className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2">
          <MousePointerClick className="text-muted-foreground size-8" />
          <span className="text-muted-foreground text-sm">
            No Announcement Selected
          </span>
        </Card>
      )}
    </div>
  );
};

export default SelectedAnnouncement;
