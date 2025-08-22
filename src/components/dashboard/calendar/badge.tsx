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
    case 'organization development':
      return {
        bg: '!bg-gray-300',
        badge: '!bg-gray-300/20 !border-gray-300 !text-gray-300',
      };
    default:
      return {
        bg: '!bg-gray-500',
        badge: '!bg-gray-500/20 !border-gray-500 !text-gray-500',
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
