import React from 'react';

import AnnouncementContent from './components/AnnouncementContent';

import type { AnnouncementType } from '@/type';

import ANNOUNCEMENTS_DATA from '@/mockData/announcements.json';

export default async function Announcements() {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
        Announcements
      </h1>
      <p className="text-muted-foreground text-xs md:text-sm">
        Stay updated with the latest announcements and news.
      </p>
      <AnnouncementContent
        announcementData={ANNOUNCEMENTS_DATA as AnnouncementType[]}
      />
    </div>
  );
}
