'use client';

import React, { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from '@/components/ui/select';

import { Search } from 'lucide-react';

const AnnouncementContent = () => {
  const [activeFilter, setActiveFilter] = useState('all');

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
      <hr />
    </>
  );
};

export default AnnouncementContent;
