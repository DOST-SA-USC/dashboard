import React from 'react';

import { Badge } from '@/components/ui/badge';

import type { EventType } from '@/type';

export function getBadgeClass(type: EventType['type'][0]) {
  switch (type) {
    case 'scientia':
      return {
        bg: '!bg-chart-1',
        badge: '!bg-chart-1/20 !border-chart-1 !text-chart-4',
      };
    case 'virtus':
      return {
        bg: '!bg-chart-2',
        badge: '!bg-chart-2/20 !border-chart-2 !text-chart-2',
      };
    case 'devotio':
      return {
        bg: '!bg-chart-3',
        badge: '!bg-chart-3/20 !border-chart-3 !text-chart-3',
      };
    default:
      return {
        bg: '!bg-gray-400',
        badge: '!bg-gray-200/60 !border-gray-400 !text-gray-600',
      };
  }
}

const EventBadge = (props: { type: EventType['type'][0] }) => {
  return (
    <Badge
      variant="outline"
      className={`text-[10px] font-semibold md:text-xs ${getBadgeClass(props.type).badge}`}
    >
      {props.type}
    </Badge>
  );
};

export default EventBadge;
