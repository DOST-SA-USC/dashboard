import React from 'react';

import AnnouncementContent from './components/AnnouncementContent';

import { getAnnouncements } from '@/lib/db/announcements';

export default async function Announcements() {
  const { announcements, size } = await getAnnouncements();

  return (
    <div className="mx-auto flex max-h-screen w-full max-w-[1600px] overflow-hidden pt-20 md:px-4">
      <AnnouncementContent announcementData={announcements} totalPages={size} />
    </div>
  );
}
