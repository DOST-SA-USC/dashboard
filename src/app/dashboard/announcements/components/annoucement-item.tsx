import React, { memo, useMemo } from 'react';

import ImportantBadge from '@/components/dashboard/important-badge';
import RoleBadge from '@/components/dashboard/role-badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import {
  getRelativeDate,
  getUserInitials,
  truncateWithEllipsis,
} from '@/lib/helpers';

import type { AnnouncementType } from '@/type';

const AnnouncementItem = (
  props: {
    announcement: AnnouncementType;
  } & React.HTMLAttributes<HTMLDivElement>
) => {
  const { announcement, ...rest } = props;

  const extractFirstTextNode = useMemo(() => {
    if (
      announcement.content &&
      typeof announcement.content === 'object' &&
      'content' in announcement.content &&
      Array.isArray(announcement.content.content)
    ) {
      const paragraphNode = announcement.content.content.find(
        (node: { type?: string; content?: Array<{ text?: string }> }) =>
          node.type === 'paragraph'
      );
      return paragraphNode?.content?.[0]?.text;
    }
    return '';
  }, [announcement.content]);

  return (
    <Card
      className="hover:bg-accent hover:text-accent-foreground cursor-pointer gap-0 space-y-2 border-1 p-4"
      {...rest}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="bg-accent flex size-6 items-center justify-center text-base font-medium">
            <AvatarImage
              src={props.announcement?.authorImageURL as string}
              alt={props.announcement?.authorName}
            />
            <AvatarFallback>
              {getUserInitials(props.announcement?.authorName || '')}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs md:text-sm">{announcement.authorName}</span>
        </div>

        <span className="text-muted-foreground text-[10px] md:text-xs">
          {getRelativeDate(new Date(announcement.createdAt))}
        </span>
      </div>

      <h2 className="text-base font-semibold md:text-lg">
        {announcement.title}
      </h2>

      <p className="text-xs md:text-sm">
        {truncateWithEllipsis(extractFirstTextNode || 'No content available.')}
      </p>

      <div className="flex items-center gap-2">
        <ImportantBadge priority={announcement.urgent} />
        <RoleBadge role={announcement.type} />
      </div>
    </Card>
  );
};

export default memo(AnnouncementItem);
