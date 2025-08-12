'use server';

import { and, eq, gte, lte } from 'drizzle-orm';

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

export const getEventsCountThisWeek = async () => {
  try {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const result = await db
      .select()
      .from(events)
      .where(
        and(
          gte(events.startDate, startOfWeek.toISOString()),
          lte(events.startDate, endOfWeek.toISOString())
        )
      );

    return result.length;
  } catch (error) {
    console.error('Error counting events this week:', error);
    throw error;
  }
};
