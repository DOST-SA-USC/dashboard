'use client';
import { MousePointerClick } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatDate, getUserInitials } from '@/lib/helpers';
import { AnnouncementType } from '@/type';

const SelectedAnnouncement = (props: {
  announcement: AnnouncementType | null;
  setAnnouncement: (arg: null) => void;
}) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.announcement) {
      setIsOpen(true);
    }
  }, [props.announcement, isMobile]);

  if (isMobile) {
    return (
      <Drawer
        open={isOpen}
        onOpenChange={setIsOpen}
        onClose={() => props.setAnnouncement(null)}
      >
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>{props.announcement?.title}</DrawerTitle>
          </DrawerHeader>
          <div className="border-border mt-4 flex items-center justify-between border-y px-6 py-4">
            <div>
              <div className="flex items-center gap-3">
                <Avatar className="bg-accent flex size-8 items-center justify-center text-base font-medium">
                  {getUserInitials(props.announcement?.author || '')}
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-base leading-4 font-semibold">
                    {props.announcement?.author}
                  </p>
                  <span className="text-xs">DOST SA USC President</span>
                </div>
              </div>
            </div>
            <span className="text-muted-foreground text-xs">
              {formatDate(new Date(props.announcement?.createdAt || ''))}
            </span>
          </div>
          <div className="p-4">
            <h1 className="text-center text-xl font-extrabold">
              {props.announcement?.title}
            </h1>
            <p className="mt-2 text-justify text-sm">
              {props.announcement?.content}
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="hidden h-full min-h-[80vh] w-full flex-4/5 p-0 md:flex md:flex-col">
      {props.announcement ? (
        <Card className="h-full w-full flex-1 gap-0 p-0">
          <div className="flex items-center justify-between gap-3 border-b p-4">
            <div>
              <div className="flex items-center gap-3">
                <Avatar className="bg-accent flex size-8 items-center justify-center text-base font-medium">
                  {getUserInitials(props.announcement.author)}
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-base leading-4 font-semibold">
                    {props.announcement.author}
                  </p>
                  <span className="text-xs">DOST SA USC President</span>
                </div>
              </div>
            </div>
            <span className="text-muted-foreground text-xs">
              {formatDate(new Date(props.announcement.createdAt))}
            </span>
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-extrabold">
              {props.announcement.title}
            </h1>
            <p className="text-justify text-base">
              {props.announcement.content}
            </p>
          </div>
        </Card>
      ) : (
        <Card className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2">
          <MousePointerClick className="text-muted-foreground size-8" />
          <span className="text-muted-foreground text-sm">
            No Announcement Selected
          </span>
        </Card>
      )}
    </div>
  );
};

export default SelectedAnnouncement;
