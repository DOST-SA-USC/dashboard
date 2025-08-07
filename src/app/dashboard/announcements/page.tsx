import React from 'react';

import AnnouncementContent from './components/AnnouncementContent';

import { getAnnouncements } from '@/lib/db/announcements';

export default async function Announcements() {
  const { announcements, size } = await getAnnouncements();

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 p-4 pt-20 md:pt-28 lg:px-20">
      <AnnouncementContent announcementData={announcements} totalPages={size} />
    </div>
  );
}
