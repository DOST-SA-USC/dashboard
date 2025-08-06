import React from 'react';

import { getBadgeClass } from '@/components/dashboard/event-badge';
import { cn } from '@/lib/utils';

import type { EventContentArg } from '@fullcalendar/core';
const CalendarItem = (props: { arg: EventContentArg }) => {
  return (
    <div
      className={cn(
        'w-full overflow-hidden p-1 text-xs font-semibold text-white sm:text-sm dark:font-medium dark:text-black',
        getBadgeClass(props.arg.event.extendedProps.type[0]).bg
      )}
    >
      {props.arg.event.title}
    </div>
  );
};

export default CalendarItem;
