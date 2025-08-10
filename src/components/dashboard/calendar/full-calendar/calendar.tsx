'use client';
import './calendar.css';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useUserStore } from '@/stores/userStore';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';

import CalendarItem from './calendar-item';

import type { EventInput, DateSelectArg } from '@fullcalendar/core';
const Calendar = (props: {
  events: EventInput[];
  onEventClick: (arg: string | null) => void;
  onNewDate: (arg: { info: DateSelectArg | null; open: boolean }) => void;
}) => {
  const { user } = useUserStore();

  const calendarRef = useRef<FullCalendar>(null); // Calendar reference
  const [events] = useState<EventInput[]>(props.events);
  const [currentTitle, setCurrentTitle] = useState('');

  const goToNext = () => calendarRef.current?.getApi().next();
  const goToPrev = () => calendarRef.current?.getApi().prev();
  const goToToday = () => calendarRef.current?.getApi().today();

  return (
    <div className="flex h-full w-full flex-col gap-0 p-0">
      <div className="flex items-center justify-between p-[0.7rem]">
        <h2 className="text-xl font-semibold">{currentTitle}</h2>

        <div className="flex gap-4">
          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>
          <ButtonGroup orientation="horizontal">
            <Button variant="outline" onClick={goToPrev}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline" onClick={goToNext}>
              <ChevronRight className="size-4" />
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="h-full w-full md:p-2">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false}
          editable={false}
          selectable={true}
          selectMirror={true}
          select={(info) =>
            user?.role !== 'student' && props.onNewDate({ info, open: true })
          }
          dayMaxEvents={true}
          height="100%"
          eventContent={(arg) => (
            <CalendarItem onEventClick={props.onEventClick} arg={arg} />
          )}
          datesSet={(arg) => {
            Promise.resolve().then(() => setCurrentTitle(arg.view.title));
          }}
          events={events.map((event) => {
            // Make end date inclusive for all-day events
            if (event.allDay && event.end) {
              const endDate = new Date(event.end as string | Date);
              endDate.setDate(endDate.getDate() + 1);
              return { ...event, end: endDate };
            }
            return event;
          })}
        />
      </div>
    </div>
  );
};

export default Calendar;
