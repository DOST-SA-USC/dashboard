'use client';
import { useRef, useState } from 'react';

import { Card } from '@/components/ui/card';

import FullCalendar from '@fullcalendar/react';
import type { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
// import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
// import { EventClickArg } from '@fullcalendar/core';

import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';

import CalendarItem from './calendar-item';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import './calendar.css';

const Calendar = (props: { events: EventInput[] }) => {
  const calendarRef = useRef<FullCalendar>(null); // Calendar reference
  const [events] = useState<EventInput[]>(props.events);
  const [currentTitle, setCurrentTitle] = useState('');

  const goToNext = () => calendarRef.current?.getApi().next();
  const goToPrev = () => calendarRef.current?.getApi().prev();
  const goToToday = () => calendarRef.current?.getApi().today();

  return (
    <Card className="h-[80vh] max-h-[850px] w-full gap-0 p-0">
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
          dayMaxEvents={true}
          height="100%"
          eventContent={(arg) => <CalendarItem arg={arg} />}
          datesSet={(arg) => setCurrentTitle(arg.view.title)}
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
    </Card>
  );
};

export default Calendar;

// const handleDateClick = (arg: DateClickArg) => {
//   const title = prompt('Enter event title');
//   if (title) {
//     const newEvent: EventInput = {
//       title,
//       start: arg.date,
//       allDay: arg.allDay,
//     };
//     setEvents((prev) => [...prev, newEvent]);
//   }
// };

// const handleEventClick = (arg: EventClickArg) => {
//   const confirmDelete = confirm(`Delete event '${arg.event.title}'?`);
//   if (confirmDelete) {
//     arg.event.remove();
//     setEvents((prev) => prev.filter((e) => e.title !== arg.event.title));
//   }
// };
