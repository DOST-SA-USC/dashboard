'use server';

import { eq } from 'drizzle-orm';

import { events } from '@/db/schema';

import { db } from '../db';

import type { EventType } from '@/type';

export const createEvent = async (event: EventType) => {
  try {
    const result = await db
      .insert(events)
      .values({
        title: event.title,
        type: event.type,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        authorId: event.authorID,
        authorName: event.authorName,
        authorPosition: event.authorPosition,
        authorImageURL: event.authorImageURL,
      } as typeof events.$inferInsert)
      .returning();

    return result[0].id;
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const result = await db.select().from(events);
    return result;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const deleteEventById = async (eventID: string) => {
  try {
    await db.delete(events).where(eq(events.id, eventID));
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
