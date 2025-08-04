'use client';

import React, { useState, useEffect, useMemo } from 'react';

import { EventItem, EventModal } from './event-item';

import { EventType } from '@/type';
import { Button } from '@/components/ui/button';
import { List, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { ButtonGroup } from '@/components/ui/button-group';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

import { useIsMobile } from '@/hooks/use-mobile';

const EventList = (props: { events: EventType[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  // Filter events based on search query
  const filteredEvents = useMemo(
    () =>
      props.events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [props.events, searchQuery]
  );

  const handleClickEvent = (event: EventType) => {
    // props.setIsDrawerOpen(false);
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="border-border flex w-full gap-2 border-b px-2 pb-3">
        <div className="placeholder:text-muted-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 items-center rounded-md border px-3 py-1 text-sm shadow-xs backdrop-blur-xl transition-[color,box-shadow] outline-none">
          <Search className="text-muted-foreground size-4" />
          <input
            placeholder="Search events..."
            type="search"
            className="placeholder:text-muted-foreground w-full p-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredEvents.length > 5 && (
          <ButtonGroup orientation="horizontal">
            <Button variant="outline">
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline">
              <ChevronRight className="size-4" />
            </Button>
          </ButtonGroup>
        )}
      </div>

      {filteredEvents.length > 0 ? (
        <div className="mt-2 h-full space-y-2 overflow-y-auto px-2 text-left md:m-0">
          {filteredEvents.map((event, index) => (
            <EventItem
              key={index}
              event={event}
              onClick={() => handleClickEvent(event)}
            />
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground mt-10 px-2 text-center">
          No events found.
        </div>
      )}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </>
  );
};

const CurrentEvents = (props: { events: EventType[] }) => {
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsDrawerOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      <div className="mt-2.5 hidden h-full w-3/5 flex-col gap-4 md:flex lg:w-1/4">
        <EventList events={props.events} />
      </div>

      <Button
        className="mt-4 flex w-full items-center justify-center md:hidden"
        variant="outline"
        onClick={() => setIsDrawerOpen(true)}
      >
        <List className="size-4" />
        View all Events & Activities
      </Button>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="mb-2">All Events & Activities</DrawerTitle>
            <DrawerDescription className="sr-only">
              All Events & Activities
            </DrawerDescription>

            <EventList events={props.events} />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CurrentEvents;
