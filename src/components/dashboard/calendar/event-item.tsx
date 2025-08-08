import React from 'react';

import { formatDateStartEnd } from '@/lib/helpers';
import { cn } from '@/lib/utils';

import { Card } from '@/components/ui/card';
import EventBadge from './event-badge';

import type { EventType } from '@/type';
const EventItem = (
  props: { event: EventType } & React.HTMLProps<HTMLDivElement>
) => {
  const { event, className, ...rest } = props;

  return (
    <Card {...rest} className={cn('space-y-2 p-4', className)}>
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
    </Card>
  );
};

export default EventItem;
