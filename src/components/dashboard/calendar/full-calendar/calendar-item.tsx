import React from 'react';

import { getBadgeClass } from '../badge';
import { cn } from '@/lib/utils';

import type { EventContentArg } from '@fullcalendar/core';

const CalendarItem = (props: {
  arg: EventContentArg;
  onEventClick: (event: string | null) => void;
}) => {
  return (
    <div
      className={cn(
        'h-5 w-full cursor-pointer overflow-hidden p-1 text-[10px] font-semibold text-wrap text-white hover:opacity-80 sm:text-xs md:text-sm md:text-nowrap dark:font-medium dark:text-black',
        getBadgeClass(props.arg.event.extendedProps.type[0]).bg
      )}
      onClick={() => props.onEventClick(props.arg.event.extendedProps.eventId)}
    >
      {props.arg.event.title}
    </div>
  );
};

export default CalendarItem;
