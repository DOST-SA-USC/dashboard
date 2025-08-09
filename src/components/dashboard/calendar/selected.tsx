'use client';

import { Calendar, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDateStartEnd, getUserInitials } from '@/lib/helpers';
import { EventType } from '@/type';

import { GoogleCalendarIcon } from '../ui/icons';
import EventBadge from './badge';
import { deleteEventById } from '@/lib/db/events';

import ActionAlert from '../ui/action-alert';

const Selected = (props: {
  event: EventType | undefined | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
}) => {
  const handleDelete = async () => {
    if (!props.event?.id) return;

    try {
      await deleteEventById(props.event.id);
      props.onOpenChange(false);
      props.setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== props.event?.id)
      );
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-left">
              {props.event?.title}
            </DialogTitle>
            <span className="text-muted-foreground text-lg">•</span>
            <div className="space-x-2">
              {props.event?.type.map((type) => (
                <EventBadge key={type} type={type} />
              ))}
            </div>
          </div>
          <DialogDescription className="text-left">
            {props.event?.description}
          </DialogDescription>
        </DialogHeader>

        {props.event?.startDate && (
          <div className="flex items-center space-x-2">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-sm">
              {formatDateStartEnd(props.event.startDate, props.event.endDate)}
            </span>
          </div>
        )}

        <DialogFooter className="mt-4 flex-col !items-start !justify-between gap-4 md:flex-row">
          <div className="flex w-full items-center gap-3 md:w-auto">
            <Avatar className="bg-accent flex size-8 items-center justify-center text-base font-medium">
              <AvatarImage
                src={props.event?.authorImageURL as string}
                alt={props.event?.authorName}
              />
              <AvatarFallback>
                {getUserInitials(props.event?.authorName || '')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm leading-4 font-semibold">
                {props.event?.authorName}
              </p>
              <span className="text-xs">{props.event?.authorPosition}</span>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 md:w-auto">
            {props.event?.startDate && (
              <Button variant="outline" className="w-full" size="sm" asChild>
                <Link
                  href={`https://calendar.google.com/event?action=TEMPLATE&text=${encodeURIComponent(`[DSU] - ${props.event?.title}` || '')}&dates=${new Date(props.event?.startDate).toISOString().replace(/-|:|\.\d+/g, '')}/${new Date(props.event?.endDate || props.event?.startDate).toISOString().replace(/-|:|\.\d+/g, '')}&details=${encodeURIComponent(props.event?.description || '')}`}
                  target="_blank"
                >
                  <GoogleCalendarIcon className="size-6" />
                  Add to Calendar
                </Link>
              </Button>
            )}

            <ActionAlert
              button={{
                label: 'Delete',
                icon: Trash,
                onClick: () =>
                  toast.promise(handleDelete(), {
                    loading: 'Deleting Event...',
                    success: 'Event deleted successfully!',
                    error: (err) => `Failed to delete event: ${err}`,
                  }),
                variant: 'outline',
                className: 'text-destructive w-full',
                size: 'sm',
              }}
              body={{
                title: 'Delete Event',
                variant: 'destructive',
                description:
                  'Are you sure you want to delete this event? This action cannot be undone.',
              }}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Selected;
