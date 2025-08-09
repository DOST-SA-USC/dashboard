'use client';

import React from 'react';
import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { EventType } from '@/type';
import { Button } from '@/components/ui/button';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getUserInitials, formatDateStartEnd } from '@/lib/helpers';
import EventBadge from './event-badge';

import { Calendar } from 'lucide-react';
import { GoogleCalendarIcon } from '../ui/icons';

const Selected = (props: {
  event: EventType | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
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
          {props.event?.startDate && (
            <Button
              variant="outline"
              className="w-full md:w-auto"
              size="sm"
              asChild
            >
              <Link
                href={`https://calendar.google.com/event?action=TEMPLATE&text=${encodeURIComponent(`[DSU] - ${props.event?.title}` || '')}&dates=${new Date(props.event?.startDate).toISOString().replace(/-|:|\.\d+/g, '')}/${new Date(props.event?.endDate || props.event?.startDate).toISOString().replace(/-|:|\.\d+/g, '')}&details=${encodeURIComponent(props.event?.description || '')}`}
                target="_blank"
              >
                <GoogleCalendarIcon className="size-6" />
                Add to Calendar
              </Link>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Selected;
