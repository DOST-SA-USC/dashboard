import React from 'react';

import EventBadge from '@/components/dashboard/event-badge';
import Event from '@/components/dashboard/event-item';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDateStartEnd } from '@/lib/helpers';
import { DialogProps } from '@radix-ui/react-dialog';

import type { EventType } from '@/type';

const EventModal = (
  props: { event: EventType } & React.ComponentProps<React.FC<DialogProps>>
) => {
  const { event, ...dialogProps } = props;
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            {formatDateStartEnd(event.startDate, event.endDate)}
          </DialogDescription>
        </DialogHeader>

        <p className="my-1 text-justify indent-4">{event.description}</p>

        <div className="flex items-center justify-center gap-2 md:justify-start">
          {event.type.map((type, index) => (
            <EventBadge key={index} type={type} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EventItem = (
  props: {
    event: EventType;
  } & React.HTMLProps<HTMLDivElement>
) => {
  const { event, ...rest } = props;
  return (
    <Event
      event={event}
      className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/30 cursor-pointer md:flex md:flex-col md:items-start"
      {...rest}
    />
  );
};

export { EventItem, EventModal };
