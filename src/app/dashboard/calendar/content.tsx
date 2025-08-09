'use client';

import React, { useState } from 'react';

import Calendar from '@/components/dashboard/calendar/full-calendar/calendar';
import New from '@/components/dashboard/calendar/new';
import Selected from '@/components/dashboard/calendar/selected';

import type { EventInput, DateSelectArg } from '@fullcalendar/core';

import type { EventType } from '@/type';
export default function Content(props: { data: EventType[] }) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<{
    info: DateSelectArg | null;
    open: boolean;
  }>({ info: null, open: false });

  const currentEvent = React.useMemo(
    () => props.data.find((event) => event.id === selectedEvent),
    [props.data, selectedEvent]
  );

  return (
    <>
      <Selected
        event={currentEvent}
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      />

      <New
        info={newEvent.info}
        open={newEvent.open}
        onOpenChange={() => setNewEvent({ info: null, open: false })}
      />

      <div className="flex h-full w-full">
        <Calendar
          onNewDate={setNewEvent}
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
