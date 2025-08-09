import React from 'react';

import Content from './content';

import { EventType } from '@/type';

import { getAllEvents } from '@/lib/db/events';

export default async function Calendar() {
  let cachedData: EventType[] | null = null;

  if (!cachedData) {
    const rawData = await getAllEvents();
    cachedData = rawData.map((event) => ({
      ...event,
      type: event.type as EventType['type'],
      startDate: event.startDate as EventType['startDate'],
      endDate: event.endDate as EventType['endDate'],
      authorID: event.authorId as EventType['authorID'],
      authorName: event.authorName as EventType['authorName'],
      authorPosition: event.authorPosition as EventType['authorPosition'],
      authorImageURL: event.authorImageURL as EventType['authorImageURL'],
    }));
  }

  return <Content data={cachedData} />;
}
