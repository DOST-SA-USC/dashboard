import React from 'react';

import AnnouncementContent from './content';
import { getAnnouncements } from '@/lib/db/announcements';

export default async function Announcements() {
  const { announcements, size } = await getAnnouncements();

  return (
    <AnnouncementContent announcementData={announcements} totalPages={size} />
  );
}
