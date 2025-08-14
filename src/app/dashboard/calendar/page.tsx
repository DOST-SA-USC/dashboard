import React from 'react';
import Content from './content';
import { EventType } from '@/type';
import { getAllEvents } from '@/lib/db/events';

export default async function Calendar() {
  const rawData = await getAllEvents();

  const transformedData = rawData.map((event) => ({
    ...event,
    type: event.type as EventType['type'],
    startDate: event.startDate as EventType['startDate'],
    endDate: event.endDate as EventType['endDate'],
    authorID: event.authorId,
    authorName: event.authorName,
    authorPosition: event.authorPosition,
    authorImageURL: event.authorImageURL,
  }));

  return <Content data={transformedData} />;
}
