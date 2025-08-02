import React from 'react';

import Calendar from './components/full-calendar/calendar';
import CurrentEvents from './components/current-events';

import EVENTS_DATA from '@/mockData/events.json';

import type { EventType } from '@/type';
import type { EventInput } from '@fullcalendar/core';

export default async function Events() {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
        Events & Activities
      </h1>
      <p className="text-muted-foreground text-xs md:text-sm">
        Stay updated with the latest events and activities.
      </p>
      <div className="border-border flex h-full max-h-[80vh] flex-col-reverse items-start justify-between overflow-hidden border-0 md:flex-row md:border-t">
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
    </div>
  );
}
