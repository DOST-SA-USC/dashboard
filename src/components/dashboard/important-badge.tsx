import React from 'react';
import { Badge } from '../ui/badge';
import { CircleAlert } from 'lucide-react';
import type { AnnouncementType } from '@/type';

const ImportantBadge = (props: { priority: AnnouncementType['priority'] }) => {
  if (props.priority !== 'important') {
    return null;
  }

  return (
    <Badge
      variant="destructive"
      className="bg-destructive text-destructive-foreground flex items-center gap-1.5 font-semibold"
    >
      <CircleAlert />
      IMPORTANT
    </Badge>
  );
};

export default ImportantBadge;
