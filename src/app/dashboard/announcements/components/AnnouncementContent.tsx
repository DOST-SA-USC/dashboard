'use client';

import { Search } from 'lucide-react';
import { useMemo, useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';
import Pagination from '@/components/dashboard/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { getAnnouncements } from '@/lib/db/announcements';
import { debounce } from '@/lib/helpers';

import AnnouncementItem from './annoucement-item';
import NewAnnouncement from './new-announcement';
import SelectedAnnouncement from './selected-announcement';

import type { AnnouncementType } from '@/type';

const AnnouncementContent = (props: {
  announcementData: AnnouncementType[];
  totalPages: number;
}) => {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState({
    page: 1,
    total: props.totalPages,
  });

  const fetchAnnouncements = useMemo(
    () => (query: string, type: string) => {
      setIsLoading(true);
      const filter =
        type === 'all' ? undefined : (type as AnnouncementType['type']);

      getAnnouncements(currentPage.page, query, filter)
        .then(({ announcements, size }) => {
          setAnnouncements(announcements);
          setCurrentPage((prev) => ({
            ...prev,
            totalPages: size,
          }));
        })
        .catch((error) => {
          console.error('Error fetching announcements:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [currentPage.page]
  );

  const debouncedFetch = useMemo(
    () =>
      debounce((...args: unknown[]) => {
        const [query, type] = args as [string, string];
        fetchAnnouncements(query, type);
      }, 300),
    [fetchAnnouncements]
  );

  useEffect(() => {
    // Avoid fetching again for the initial page
    if (
      currentPage.page === 1 &&
      searchQuery === '' &&
      activeFilter === 'all'
    ) {
      setAnnouncements(props.announcementData);
      return;
    }

    if (searchQuery !== '') {
      debouncedFetch(searchQuery, activeFilter);
    } else {
      fetchAnnouncements(searchQuery, activeFilter);
    }
  }, [
    searchQuery,
    activeFilter,
    fetchAnnouncements,
    debouncedFetch,
    currentPage.page,
    props.announcementData,
  ]);

  return (
    <div className="flex h-full w-full flex-1 items-start justify-between gap-4 overflow-hidden md:max-h-[80vh]">
      <div className="flex h-full max-h-[80vh] w-full flex-col gap-4 overflow-auto md:flex-4/5">
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
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="h-full w-full flex-1 space-y-4 overflow-y-auto px-0 md:px-2">
          {isLoading ? (
            <>
              {[...Array(2)].map((_, idx) => (
                <Skeleton key={idx} className="bg-transparent">
                  <Card className="!bg-background flex h-40 w-full items-center justify-center" />
                </Skeleton>
              ))}
            </>
          ) : (
            <>
              {announcements.map((announcement, index) => (
                <AnnouncementItem
                  key={index}
                  announcement={announcement}
                  onClick={() => setSelectedAnnouncement(announcement)}
                />
              ))}
              {announcements.length === 0 && (
                <Card className="flex h-40 w-full items-center justify-center">
                  <p className="text-muted-foreground">
                    No announcements found.
                  </p>
                </Card>
              )}
            </>
          )}
          <Pagination page={currentPage} onPageChange={setCurrentPage} />
        </div>
      </div>
      <div className="flex h-full flex-col gap-4 md:w-full">
        <div className="flex h-16 w-full items-center justify-end gap-2 py-3.5 md:p-3.5">
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
