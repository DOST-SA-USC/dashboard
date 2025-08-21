import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getUserInitials } from '@/lib/helpers';
import { tiptapToHTML } from '@/lib/tiptap-to-html';

import Actions from './actions';

import type { ResourceType } from '@/type';
const MOCK_DATA: ResourceType[] = [
  {
    id: '91ba2ec9-c2cc-489d-a464-b5487a2f9804',
    title: 'iAccess Guide',
    icon: '📚',
    type: 'guides',
    description: 'This guide provides information about iAccess.',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          content: [
            {
              text: 'HEADING 1',
              type: 'text',
            },
          ],
        },
        {
          type: 'horizontalRule',
        },
        {
          type: 'paragraph',
          content: [
            {
              text: 'Excepteur occaecat consectetur cillum. Eiusmod minim laboris voluptate exercitation mollit magna ex consectetur tempor',
              type: 'text',
            },
            {
              text: ' cillum. Adipisicing ',
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
            },
            {
              text: 'quis nisi elit nisi aute laboris ullamco commodo esse exercitation excepteur excepteur.',
              type: 'text',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Item 1',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Item 2',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: 'Item 3',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'image',
          attrs: {
            alt: 'banner',
            src: 'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/announcements/0e748fe2-f2db-465d-96e2-3680a94efb68/0.jpeg',
            title: 'banner',
            width: null,
            height: null,
          },
        },
        {
          type: 'paragraph',
        },
        {
          type: 'horizontalRule',
        },
        {
          type: 'paragraph',
        },
      ],
    },
    authorID: '123',
    authorName: 'John Doe',
    authorPosition: 'Software Engineer',
    authorImageURL: 'https://example.com/avatar.jpg',
  },
  {
    id: 'a2b3c4d5-e6f7-489d-b123-456789abcdef',
    title: 'Release Notes v2.1',
    icon: '📝',
    type: 'guides',
    description: 'Latest updates and bug fixes in version 2.1.',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          content: [{ text: 'Release Highlights', type: 'text' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              text: 'This release includes several improvements and bug fixes.',
              type: 'text',
            },
          ],
        },
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    { text: 'Improved dashboard performance', type: 'text' },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    { text: 'Fixed login issue on mobile', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
        },
      ],
    },
    authorID: '456',
    authorName: 'Jane Smith',
    authorPosition: 'Product Manager',
    authorImageURL: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 'f1e2d3c4-b5a6-489d-c789-0123456789ab',
    title: 'API Reference',
    icon: '🔗',
    type: 'links',
    link: 'https://www.google.com',
    description: 'Comprehensive API documentation for developers.',
    authorID: '789',
    authorName: 'Alex Johnson',
    authorPosition: 'API Specialist',
    authorImageURL: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 'c3d4e5f6-a7b8-489d-d234-567890abcdef',
    title: 'Security Advisory',
    icon: '⚠️',
    type: 'officer',
    description: 'Important security update for all users.',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          content: [{ text: 'Vulnerability Notice', type: 'text' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              text: 'A critical vulnerability has been identified. Please update your software immediately.',
              type: 'text',
            },
          ],
        },
        {
          type: 'horizontalRule',
        },
        {
          type: 'paragraph',
          content: [
            { text: 'Contact support for more information.', type: 'text' },
          ],
        },
      ],
    },
    authorID: '321',
    authorName: 'Morgan Lee',
    authorPosition: 'Security Lead',
    authorImageURL: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

const Selected = (props: {
  resourceID: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const selectedItem = MOCK_DATA.find((item) => item.id === props.resourceID);

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="min-w-[90%] gap-0 p-2 px-4 md:min-w-2xl lg:min-w-4xl xl:min-w-6xl">
        <DialogHeader className="mt-4 px-0 pb-2 text-left md:px-2">
          <div className="flex w-fit items-center justify-center gap-2">
            <DialogTitle>
              {selectedItem?.icon} {selectedItem?.title}
            </DialogTitle>

            {selectedItem?.id && <Actions resourceID={selectedItem.id} />}
          </div>
          <DialogDescription>{selectedItem?.description}</DialogDescription>
          <div className="border-border flex w-full items-center justify-between gap-4 border-y py-2">
            <div className="flex w-full items-center gap-2">
              <Avatar className="bg-accent flex size-7 items-center justify-center text-base font-medium">
                <AvatarImage
                  src={selectedItem?.authorImageURL as string}
                  alt={selectedItem?.authorName}
                />
                <AvatarFallback>
                  {getUserInitials(selectedItem?.authorName || '')}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-xs">
                <p className="leading-4 font-semibold">
                  {selectedItem?.authorName}
                </p>
                <span>{selectedItem?.authorPosition}</span>
              </div>
            </div>
            <span className="text-muted-foreground w-full text-right text-xs">
              1-20-30
            </span>
          </div>
        </DialogHeader>
        <div className="overflow-x-hidden overflow-y-auto p-4">
          <div
            className="simple-editor-content mt-2 text-justify text-sm"
            role="presentation"
          >
            {selectedItem?.content && (
              <div
                className="prose prose-sm tiptap ProseMirror max-w-none"
                dangerouslySetInnerHTML={{
                  __html: tiptapToHTML(selectedItem.content) || '',
                }}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Selected;
