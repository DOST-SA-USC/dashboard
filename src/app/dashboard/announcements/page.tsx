import React from 'react';

import AnnouncementContent from './content';
import { getAnnouncements } from '@/lib/db/announcements';

import type { AnnouncementType } from '@/type';

export default async function Announcements() {
  let cachedData: { announcements: AnnouncementType[]; size: number } | null =
    null;

  if (!cachedData) {
    cachedData = await getAnnouncements();
  }

  const { announcements, size } = cachedData;

  return (
    <AnnouncementContent announcementData={announcements} totalPages={size} />
  );
}
