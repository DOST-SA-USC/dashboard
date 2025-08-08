import { CircleAlert } from 'lucide-react';
import React from 'react';

import { Badge } from '../../ui/badge';

import type { AnnouncementType } from '@/type';

const ImportantBadge = (props: { priority: AnnouncementType['urgent'] }) => {
  if (!props.priority) {
    return null;
  }

  return (
    <Badge
      variant="destructive"
      className="bg-destructive text-destructive-foreground flex items-center gap-1.5 font-semibold"
    >
      <CircleAlert />
      URGENT
    </Badge>
  );
};

export default ImportantBadge;
