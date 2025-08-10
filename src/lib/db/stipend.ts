'use server';

import { desc } from 'drizzle-orm';

import { stipend } from '@/db/schema';

import { db } from '../db';

import type { StipendType } from '@/type';

export const getLatestStipendUpdate = async () => {
  try {
    const result = await db
      .select()
      .from(stipend)
      .orderBy(desc(stipend.createdAt))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching stipend updates:', error);
    throw error;
  }
};

export const updateStipend = async (data: StipendType) => {
  try {
    const result = await db
      .insert(stipend)
      .values({
        monthly: data.monthly,
        forecast: data.forecast,
        remarks: data.remarks,
        authorId: data.authorID,
        authorName: data.authorName,
        authorPosition: data.authorPosition,
        authorImageURL: data.authorImageURL,
      } as typeof stipend.$inferInsert)
      .returning();

    return result[0];
  } catch (error) {
    console.error('Error uploading stipend:', error);
    throw error;
  }
};
