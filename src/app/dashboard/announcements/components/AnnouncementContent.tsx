/* 
  - add debounce  once search functionality is implemented
  - add pagination
*/

'use client';

import { Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import AnnouncementItem from './annoucement-item';
import NewAnnouncement from './new-announcement';
import SelectedAnnouncement from './selected-announcement';

import type { AnnouncementType } from '@/type';

const AnnouncementContent = (props: {
  announcementData: AnnouncementType[] | null;
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAnnouncements = useMemo(() => {
    if (!props.announcementData) return [];
    return props.announcementData
      .filter((announcement) => {
        if (activeFilter === 'all') return true;
        return announcement.type === activeFilter;
      })
      .filter((announcement) => {
        return announcement.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
  }, [activeFilter, searchQuery, props.announcementData]);

  return (
    <div className="flex h-full max-h-[90vh] w-full flex-1 items-start justify-between gap-4 overflow-hidden md:max-h-[80vh]">
      <div className="flex h-full w-full flex-col gap-4 md:flex-4/5">
        <div className="flex w-full gap-4 py-3.5 md:p-3.5">
          <div className="flex w-full items-center gap-2">
            <div className="placeholder:text-muted-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 items-center rounded-md border px-3 py-1 text-sm shadow-xs backdrop-blur-xs transition-[color,box-shadow] outline-none">
              <Search className="text-muted-foreground size-4" />
              <input
                placeholder="Search announcements..."
                type="search"
                className="placeholder:text-muted-foreground w-full p-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Select
            onValueChange={(value) => setActiveFilter(value)}
            value={activeFilter}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent className="w-44">
              <SelectGroup>
                <SelectLabel>Select Filter</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="officer">Officer</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="h-full max-h-[90vh] w-full space-y-4 overflow-y-auto px-0 md:px-2">
          {filteredAnnouncements.map((announcement, index) => (
            <AnnouncementItem
              key={index}
              announcement={announcement}
              onClick={() => setSelectedAnnouncement(announcement)}
            />
          ))}
          {filteredAnnouncements.length === 0 && (
            <Card className="flex h-40 w-full items-center justify-center">
              <p className="text-muted-foreground">No announcements found.</p>
            </Card>
          )}
        </div>
      </div>
      <div className="flex h-full flex-col gap-4 md:w-full">
        <div className="flex w-full items-center justify-end gap-2 py-3.5 md:p-3.5">
          <NewAnnouncement />
        </div>

        <SelectedAnnouncement
          announcement={selectedAnnouncement}
          setAnnouncement={setSelectedAnnouncement}
        />
      </div>
    </div>
  );
};

export default AnnouncementContent;
