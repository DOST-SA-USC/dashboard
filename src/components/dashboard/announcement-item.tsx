import React from 'react';
import type { AnnouncementType } from '@/type';
import { Badge } from '@/components/ui/badge';

import {
  capitalizeFirstLetter,
  truncateWithEllipsis,
  formatDate,
} from '@/lib/helpers';

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
        <div className="space-x-2">
          <Badge variant="outline" className="md:text-xs] text-[10px]">
            {capitalizeFirstLetter(props.announcement.type)}
          </Badge>
          {props.announcement.priority === 'urgent' && (
            <Badge variant="destructive" className="text-[10px] md:text-xs">
              Urgent
            </Badge>
          )}
        </div>
        <span className="md:text-xs] text-[10px]">
          {formatDate(props.announcement.date)}
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
