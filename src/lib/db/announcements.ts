'use server';

import { db } from '../db';
import { announcement } from '@/db/schema';

import type { AnnouncementType } from '@/type';

export const createAnnouncement = async (
  announcementContent: AnnouncementType
) => {
  try {
    const result = await db
      .insert(announcement)
      .values({
        id: announcementContent.id,
        type: announcementContent.type,
        urgent: announcementContent.urgent,
        title: announcementContent.title,
        content: announcementContent.content,
        authorId: announcementContent.authorID,
        createdAt: announcementContent.createdAt,
      } as typeof announcement.$inferInsert)
      .returning();

    return result[0];
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
};
