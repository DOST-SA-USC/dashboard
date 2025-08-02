import React from 'react';
import type { EventContentArg } from '@fullcalendar/core';
import { cn } from '@/lib/utils';

import { getBadgeClass } from '@/components/dashboard/event-badge';

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
