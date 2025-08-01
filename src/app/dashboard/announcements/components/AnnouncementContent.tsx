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

import ANNOUNCEMENTS_DATA from '@/mockData/announcements.json';

const AnnouncementContent = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAnnouncements = useMemo(() => {
    return (ANNOUNCEMENTS_DATA as AnnouncementType[])
      .filter((announcement) => {
        if (activeFilter === 'all') return true;
        return announcement.type === activeFilter;
      })
      .filter((announcement) => {
        return announcement.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
  }, [activeFilter, searchQuery]);

  return (
    <>
      <div className="flex w-full gap-4">
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

      <div className="border-border flex h-full items-start justify-between border-t">
        <div className="mt-4 max-h-[70vh] w-full space-y-4 overflow-y-auto p-0 md:w-3/5 md:p-2">
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

        <SelectedAnnouncement
          announcement={selectedAnnouncement}
          setAnnouncement={setSelectedAnnouncement}
        />
      </div>
    </>
  );
};

export default AnnouncementContent;
