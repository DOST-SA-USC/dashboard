import React from 'react';

import Content from './content';

import EVENTS_DATA from '@/mockData/events.json';
import { EventType } from '@/type';

export default async function Calendar() {
  const data = EVENTS_DATA as EventType[];

  return <Content data={data} />;
}
