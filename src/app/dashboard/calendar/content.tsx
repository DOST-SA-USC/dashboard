'use client';

import React, { useState } from 'react';

import Calendar from '@/components/dashboard/calendar/full-calendar/calendar';
import New from '@/components/dashboard/calendar/new';
import Selected from '@/components/dashboard/calendar/selected';

import type { EventInput, DateSelectArg } from '@fullcalendar/core';

import type { EventType } from '@/type';
export default function Content(props: { data: EventType[] }) {
  const [events, setEvents] = useState<EventType[]>(props.data);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<{
    info: DateSelectArg | null;
    open: boolean;
  }>({ info: null, open: false });

  const currentEvent = React.useMemo(() => {
    return events.find((event) => event.id === selectedEvent);
  }, [events, selectedEvent]);

  return (
    <>
      <Selected
        event={currentEvent}
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      />

      <New
        setEvents={setEvents}
        info={newEvent.info}
        open={newEvent.open}
        onOpenChange={() => setNewEvent({ info: null, open: false })}
      />

      <div className="flex h-full w-full">
        <Calendar
          key={events.length}
          onNewDate={setNewEvent}
          onEventClick={setSelectedEvent}
          events={events.map((event: EventInput) => ({
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
