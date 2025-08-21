'use client';

import { Meh } from 'lucide-react';
import React, { useMemo, useState } from 'react';

// import Item from '@/components/dashboard/resources/item';
import Selected from '@/components/dashboard/resources/selected';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TABS } from '@/data/resources';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUserStore } from '@/stores/userStore';

// import type { ResourceType, TabType } from '@/type';
import type { TabType } from '@/type';

// const MOCK_DATA: ResourceType[] = [
//   {
//     id: '91ba2ec9-c2cc-489d-a464-b5487a2f9804',
//     title: 'iAccess Guide',
//     icon: '📚',
//     type: 'guides',
//     description: 'This guide provides information about iAccess.',
//     content: {
//       type: 'doc',
//       content: [
//         {
//           type: 'heading',
//           content: [
//             {
//               text: 'HEADING 1',
//               type: 'text',
//             },
//           ],
//         },
//         {
//           type: 'horizontalRule',
//         },
//         {
//           type: 'paragraph',
//           content: [
//             {
//               text: 'Excepteur occaecat consectetur cillum. Eiusmod minim laboris voluptate exercitation mollit magna ex consectetur tempor',
//               type: 'text',
//             },
//             {
//               text: ' cillum. Adipisicing ',
//               type: 'text',
//               marks: [
//                 {
//                   type: 'bold',
//                 },
//               ],
//             },
//             {
//               text: 'quis nisi elit nisi aute laboris ullamco commodo esse exercitation excepteur excepteur.',
//               type: 'text',
//             },
//           ],
//         },
//         {
//           type: 'paragraph',
//         },
//         {
//           type: 'bulletList',
//           content: [
//             {
//               type: 'listItem',
//               content: [
//                 {
//                   type: 'paragraph',
//                   content: [
//                     {
//                       text: 'Item 1',
//                       type: 'text',
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               type: 'listItem',
//               content: [
//                 {
//                   type: 'paragraph',
//                   content: [
//                     {
//                       text: 'Item 2',
//                       type: 'text',
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               type: 'listItem',
//               content: [
//                 {
//                   type: 'paragraph',
//                   content: [
//                     {
//                       text: 'Item 3',
//                       type: 'text',
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'paragraph',
//         },
//         {
//           type: 'image',
//           attrs: {
//             alt: 'banner',
//             src: 'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/announcements/0e748fe2-f2db-465d-96e2-3680a94efb68/0.jpeg',
//             title: 'banner',
//             width: null,
//             height: null,
//           },
//         },
//         {
//           type: 'paragraph',
//         },
//         {
//           type: 'horizontalRule',
//         },
//         {
//           type: 'paragraph',
//         },
//       ],
//     },
//     authorID: '123',
//     authorName: 'John Doe',
//     authorPosition: 'Software Engineer',
//     authorImageURL: 'https://example.com/avatar.jpg',
//   },
//   {
//     id: 'a2b3c4d5-e6f7-489d-b123-456789abcdef',
//     title: 'Release Notes v2.1',
//     icon: '📝',
//     type: 'guides',
//     description: 'Latest updates and bug fixes in version 2.1.',
//     content: {
//       type: 'doc',
//       content: [
//         {
//           type: 'heading',
//           content: [{ text: 'Release Highlights', type: 'text' }],
//         },
//         {
//           type: 'paragraph',
//           content: [
//             {
//               text: 'This release includes several improvements and bug fixes.',
//               type: 'text',
//             },
//           ],
//         },
//         {
//           type: 'bulletList',
//           content: [
//             {
//               type: 'listItem',
//               content: [
//                 {
//                   type: 'paragraph',
//                   content: [
//                     { text: 'Improved dashboard performance', type: 'text' },
//                   ],
//                 },
//               ],
//             },
//             {
//               type: 'listItem',
//               content: [
//                 {
//                   type: 'paragraph',
//                   content: [
//                     { text: 'Fixed login issue on mobile', type: 'text' },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'paragraph',
//         },
//       ],
//     },
//     authorID: '456',
//     authorName: 'Jane Smith',
//     authorPosition: 'Product Manager',
//     authorImageURL: 'https://randomuser.me/api/portraits/women/44.jpg',
//   },
//   {
//     id: 'f1e2d3c4-b5a6-489d-c789-0123456789ab',
//     title: 'API Reference',
//     icon: '🔗',
//     type: 'links',
//     link: 'https://www.google.com',
//     description: 'Comprehensive API documentation for developers.',
//     authorID: '789',
//     authorName: 'Alex Johnson',
//     authorPosition: 'API Specialist',
//     authorImageURL: 'https://randomuser.me/api/portraits/men/32.jpg',
//   },
// ];

const Content = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('guides');
  const [selectedResource, setSelectedResource] = useState('');

  const { user } = useUserStore();
  const isMobile = useIsMobile();

  const getTabs = useMemo(() => {
    return TABS.filter((tab) => {
      if (tab.studentsNotAllowed && user?.role === 'student') {
        return false;
      }
      return true;
    });
  }, [user?.role]);

  // const selectedTab = useMemo(() => {
  //   return MOCK_DATA.filter((item) => item.type === currentTab);
  // }, [currentTab]);

  return (
    <>
      {/* tabs */}
      <Card className="flex w-full flex-row items-center justify-between gap-1 rounded-md p-1">
        {getTabs.map((tab, index) => (
          <Button
            key={index}
            variant={currentTab === tab.value ? 'default' : 'ghost'}
            className="flex-1 text-xs sm:text-sm"
            size="sm"
            onClick={() => setCurrentTab(tab.value as TabType)}
          >
            {isMobile ? tab.smLabel : tab.lgLabel}
          </Button>
        ))}
      </Card>

      {/* main */}
      <Card className="h-full w-full flex-1 gap-2 overflow-y-auto p-2 md:gap-4 md:p-4">
        <div className="text-secondary/40 flex h-full w-full flex-col items-center justify-center gap-2">
          <Meh className="size-16 sm:size-18 md:size-20" />
          <h1 className="text-lg font-extrabold sm:text-xl md:text-2xl">
            Coming Soon!
          </h1>
        </div>
        {/* {selectedTab.length !== 0 ? (
          selectedTab.map((item) => (
            <Item
              key={item.id}
              data={{
                type: item.type,
                icon: item.icon,
                title: item.title,
                description: item.description,
              }}
              onClick={() =>
                item.type !== 'links'
                  ? setSelectedResource(item.id)
                  : window.open(item.link!, '_blank')
              }
            />
          ))
        ) : (
          <div className="text-secondary/40 flex h-full w-full flex-col items-center justify-center gap-2">
            <Meh className="size-16 sm:size-18 md:size-20" />
            <h1 className="text-lg font-extrabold sm:text-xl md:text-2xl">
              No resources yet.
            </h1>
          </div>
        )} */}
      </Card>

      <Selected
        resourceID={selectedResource}
        open={!!selectedResource}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedResource('');
          }
        }}
      />
    </>
  );
};

export default Content;
