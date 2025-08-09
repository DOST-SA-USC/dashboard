'use client';

import React, { useState } from 'react';

import Calendar from '@/components/dashboard/calendar/full-calendar/calendar';
import Selected from '@/components/dashboard/calendar/selected';

import type { EventInput } from '@fullcalendar/core';

import type { EventType } from '@/type';

export default function Content(props: { data: EventType[] }) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const currentEvent = React.useMemo(
    () => props.data.find((event) => event.id === selectedEvent),
    [props.data, selectedEvent]
  );

  return (
    <>
      <Selected
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
        event={currentEvent}
      />

      <div className="flex h-full w-full">
        <Calendar
          onEventClick={setSelectedEvent}
          events={props.data.map((event: EventInput) => ({
            title: event.title,
            start: event.startDate,
            end: event.endDate,
            allDay: true,
            extendedProps: {
              eventId: event.id,
              type: event.type,
            },
          }))}
        />
      </div>
    </>
  );
}
