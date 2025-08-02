/* 
  - add debounce  once search functionality is implemented
  - add pagination
*/

'use client';

import React, { useState, useMemo } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from '@/components/ui/select';
import AnnouncementItem from './annoucement-item';
import SelectedAnnouncement from './selected-announcement';

import { Search } from 'lucide-react';

import type { AnnouncementType } from '@/type';

const AnnouncementContent = (props: {
  announcementData: AnnouncementType[];
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAnnouncements = useMemo(() => {
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
    <div className="border-border flex h-full max-h-[80vh] items-start justify-between overflow-hidden border-t">
      <div className="flex h-full w-full flex-col gap-4 md:w-3/5">
        <div className="border-border flex w-full gap-4 border-b py-3.5 md:p-3.5">
          <div className="flex w-full items-center gap-2">
            <div className="placeholder:text-muted-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 items-center rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none">
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
        <div className="h-full w-full space-y-4 overflow-y-auto px-0 md:px-2">
          {filteredAnnouncements.map((announcement, index) => (
            <AnnouncementItem
              key={index}
              announcement={announcement}
              onClick={() => setSelectedAnnouncement(announcement)}
            />
          ))}
          {filteredAnnouncements.length === 0 && (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-muted-foreground">No announcements found.</p>
            </div>
          )}
        </div>
      </div>

      <SelectedAnnouncement
        announcement={selectedAnnouncement}
        setAnnouncement={setSelectedAnnouncement}
      />
    </div>
  );
};

export default AnnouncementContent;
