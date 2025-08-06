import React from 'react';

import AnnouncementContent from './components/AnnouncementContent';

export default async function Announcements() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-4 p-4 pt-20 md:pt-28 lg:px-20">
      <AnnouncementContent announcementData={null} />
    </div>
  );
}
