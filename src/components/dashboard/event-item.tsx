import React from 'react';
import type { EventType } from '@/type';
import { cn } from '@/lib/utils';

import EventBadge from './event-badge';

import { formatDateStartEnd } from '@/lib/helpers';

const EventItem = (
  props: { event: EventType } & React.HTMLProps<HTMLDivElement>
) => {
  const { event, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        'border-border dark:border-input/30 flex items-center justify-between space-y-2 rounded-md border p-4',
        className
      )}
    >
      <div>
        <h2 className="text-md font-semibold">{event.title}</h2>
        <p className="text-muted-foreground text-xs md:text-sm">
          {formatDateStartEnd(event.startDate, event.endDate)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {event.type.map((type, index) => (
          <EventBadge key={index} type={type} />
        ))}
      </div>
    </div>
  );
};

export default EventItem;
