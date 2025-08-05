import React from 'react';

import AnnouncementContent from './components/AnnouncementContent';

import type { AnnouncementType } from '@/type';

import ANNOUNCEMENTS_DATA from '@/mockData/announcements.json';

export default async function Announcements() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-4 p-4 pt-20 md:pt-28 lg:px-20">
      <AnnouncementContent
        announcementData={ANNOUNCEMENTS_DATA as AnnouncementType[]}
      />
    </div>
  );
}
