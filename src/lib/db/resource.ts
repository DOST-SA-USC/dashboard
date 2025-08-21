'use server';

import { desc, eq } from 'drizzle-orm';

import { resources } from '@/db/schema';

import { db } from '../db';

import type { ResourceType, TabType } from '@/type';

export async function getResourcesByType(type: TabType) {
  try {
    const result = db
      .select()
      .from(resources)
      .where(eq(resources.type, type))
      .orderBy(desc(resources.createdAt));

    return result;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
}

export async function newResource(data: ResourceType) {
  try {
    const result = await db
      .insert(resources)
      .values({
        icon: data.icon,
        title: data.title,
        type: data.type,
        authorId: data.authorID,
        authorName: data.authorName,
        authorPosition: data.authorPosition,
        authorImageURL: data.authorImageURL,
        ...(data.type === 'links'
          ? { link: data.link }
          : { content: data.content }),
      } as typeof resources.$inferInsert)
      .returning();

    return result[0];
  } catch (error) {
    console.error('Error adding resource:', error);
    throw error;
  }
}

export async function updateResource(data: ResourceType) {
  try {
    const result = await db
      .update(resources)
      .set({
        icon: data.icon,
        title: data.title,
        type: data.type,
        authorId: data.authorID,
        authorName: data.authorName,
        authorPosition: data.authorPosition,
        authorImageURL: data.authorImageURL,
        ...(data.type === 'links'
          ? { link: data.link }
          : { content: data.content }),
      } as typeof resources.$inferInsert)
      .where(eq(resources.id, data.id))
      .returning();
    return result[0] || null;
  } catch (error) {
    console.error('Error updating resource:', error);
    throw error;
  }
}

export const deleteResourceById = async (id: string) => {
  try {
    const result = await db
      .delete(resources)
      .where(eq(resources.id, id))
      .returning();
    return result[0] || null;
  } catch (error) {
    console.error('Error deleting stipend:', error);
    throw error;
  }
};
