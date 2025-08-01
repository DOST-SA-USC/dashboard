import React from 'react';
import type { AnnouncementType } from '@/type';

import RoleBadge from '@/components/dashboard/role-badge';
import ImportantBadge from '@/components/dashboard/important-badge';

import { truncateWithEllipsis, formatDate } from '@/lib/helpers';

const AnnouncementItem = (props: { announcement: AnnouncementType }) => {
  let borderColor;
  switch (props.announcement.type) {
    case 'officer':
      borderColor = 'border-chart-1';
      break;
    case 'faculty':
      borderColor = 'border-chart-2';
      break;
    default:
      borderColor = 'border-chart-3';
  }

  return (
    <div className={`border-l-4 md:space-y-2 ${borderColor} py-2 pl-4`}>
      <div className="text-muted-foreground flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <RoleBadge role={props.announcement.type} />
          <ImportantBadge priority={props.announcement.priority} />
        </div>
        <span className="md:text-xs] text-[10px]">
          {formatDate(new Date(props.announcement.createdAt))}
        </span>
      </div>
      <h2 className="text-md font-semibold md:text-xl">
        {props.announcement.title}
      </h2>
      <p className="text-muted-foreground text-xs md:text-sm">
        {truncateWithEllipsis(props.announcement.content)}
      </p>
    </div>
  );
};

export default AnnouncementItem;
