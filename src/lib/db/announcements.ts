'use server';

import { and, count, desc, eq, gte, ilike, lt } from 'drizzle-orm';

import { announcement } from '@/db/schema';

import { db } from '../db';

import type { AnnouncementType } from '@/type';
import type { Content } from '@tiptap/react';

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
        authorName: announcementContent.authorName,
        authorPosition: announcementContent.authorPosition,
        authorImageURL: announcementContent.authorImageURL,
        createdAt: announcementContent.createdAt,
      } as typeof announcement.$inferInsert)
      .returning();

    return result[0];
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
};

export const getAnnouncements = async (
  page: number = 1,
  search?: string | undefined,
  typeFilter?: AnnouncementType['type'] | undefined
): Promise<{ announcements: AnnouncementType[]; size: number }> => {
  const pageSize = 5;
  try {
    const offset = (page - 1) * pageSize;

    const whereClauses = [];

    // Filter by type if provided
    if (typeFilter) {
      whereClauses.push(eq(announcement.type, typeFilter));
    }

    // Search by title (case-insensitive)
    if (search) {
      const sanitizedSearch = search.replace(/[%_]/g, '').trim();
      if (sanitizedSearch.length > 0) {
        whereClauses.push(ilike(announcement.title, `%${sanitizedSearch}%`));
      }
    }

    const whereCondition =
      whereClauses.length > 0 ? and(...whereClauses) : undefined;

    const query = db
      .select()
      .from(announcement)
      .where(whereCondition)
      .orderBy(desc(announcement.createdAt))
      .limit(pageSize)
      .offset(offset);

    const result = await query;

    const data = result.map(
      (item) =>
        ({
          id: item.id,
          type: item.type as AnnouncementType['type'],
          urgent: item.urgent,
          title: item.title,
          content: item.content as Content,
          authorID: item.authorId ?? '',
          authorName: item.authorName ?? 'Unknown',
          authorPosition: item.authorPosition ?? 'N/A',
          authorImageURL: item.authorImageURL ?? '',
          createdAt: item.createdAt,
        }) as AnnouncementType
    );

    // Get the total count of announcements for pagination
    const totalCountQuery = db
      .select({ count: count(announcement.id) })
      .from(announcement)
      .where(whereCondition);

    const totalCountResult = await totalCountQuery;
    const totalCount = totalCountResult[0]?.count ?? 0;

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / pageSize);

    return { announcements: data ?? [], size: totalPages };
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

export const getTodaysAnnouncementCount = async (): Promise<number> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const result = await db
      .select({ count: count(announcement.id) })
      .from(announcement)
      .where(
        and(
          gte(announcement.createdAt, today),
          lt(announcement.createdAt, tomorrow)
        )
      );

    return result[0]?.count ?? 0;
  } catch (error) {
    console.error("Error getting today's announcement count:", error);
    throw error;
  }
};
