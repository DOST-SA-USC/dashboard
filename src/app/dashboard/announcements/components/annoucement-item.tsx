import React, { memo } from 'react';

import ImportantBadge from '@/components/dashboard/important-badge';
import RoleBadge from '@/components/dashboard/role-badge';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { getRelativeDate, getUserInitials, truncateWithEllipsis } from '@/lib/helpers';

import type { AnnouncementType } from '@/type';

const AnnouncementItem = (
  props: {
    announcement: AnnouncementType;
  } & React.HTMLAttributes<HTMLDivElement>
) => {
  const { announcement, ...rest } = props;

  return (
    <Card
      className="hover:bg-accent hover:text-accent-foreground cursor-pointer gap-0 space-y-2 border-1 p-4"
      {...rest}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="bg-accent flex size-6 items-center justify-center text-xs">
            {getUserInitials(announcement.author)}
          </Avatar>
          <span className="text-xs md:text-sm">{announcement.author}</span>
        </div>

        <span className="text-muted-foreground text-[10px] md:text-xs">
          {getRelativeDate(new Date(announcement.createdAt))}
        </span>
      </div>

      <h2 className="text-base font-semibold md:text-lg">
        {announcement.title}
      </h2>

      <p className="text-xs md:text-sm">
        {truncateWithEllipsis(announcement.content)}
      </p>

      <div className="flex items-center gap-2">
        <ImportantBadge priority={announcement.priority} />
        <RoleBadge role={announcement.type} />
      </div>
    </Card>
  );
};

export default memo(AnnouncementItem);
