import React from 'react';

import EVENTS_DATA from '@/mockData/events.json';

import CurrentEvents from './components/current-events';
import Calendar from './components/full-calendar/calendar';

import type { EventType } from '@/type';
import type { EventInput } from '@fullcalendar/core';

export default async function Events() {
  return (
    <div className="flex h-full max-h-[80vh] min-h-screen w-full flex-col-reverse items-start justify-between gap-4 overflow-hidden p-4 pt-20 md:flex-row md:pt-28 lg:px-20">
      <CurrentEvents events={EVENTS_DATA as EventType[]} />
      <Calendar
        events={EVENTS_DATA.map((event: EventInput) => ({
          title: event.title,
          start: event.startDate,
          end: event.endDate,
          allDay: true,
          extendedProps: {
            type: event.type,
          },
        }))}
      />
    </div>
  );
}
