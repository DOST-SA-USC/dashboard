import React from 'react';
import type { EventType } from '@/type';
import { Badge } from '@/components/ui/badge';

const EventItem = (props: { event: EventType }) => {
  function formatEventDate(startDate: string, endDate?: string): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : undefined;

    const month = start.toLocaleString('en-US', { month: 'short' });
    const startDay = start.getDate();

    if (end) {
      const sameMonth =
        start.getMonth() === end.getMonth() &&
        start.getFullYear() === end.getFullYear();
      const endDay = end.getDate();
      if (sameMonth) {
        return `${month} ${startDay}-${endDay}`;
      } else {
        const endMonth = end.toLocaleString('en-US', { month: 'short' });
        return `${month} ${startDay} - ${endMonth} ${endDay}`;
      }
    }

    return `${month} ${startDay}`;
  }

  function getBadgeClass(type: EventType['type'][0]): string {
    switch (type) {
      case 'scientia':
        return 'bg-chart-1/20 border-chart-1 text-chart-4';
      case 'virtus':
        return 'bg-chart-2/20 border-chart-2 text-chart-2';
      case 'devotio':
        return 'bg-chart-3/20 border-chart-3 text-chart-3';
      default:
        return 'bg-gray-200/60 border-gray-400 text-gray-600';
    }
  }

  return (
    <div className="bg-muted flex items-center justify-between gap-4 rounded-lg p-3 md:p-4">
      <div>
        <h2 className="text-md font-semibold">{props.event.title}</h2>
        <p className="text-muted-foreground text-xs md:text-sm">
          {formatEventDate(props.event.startDate, props.event.endDate)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {props.event.type.map((type, index) => (
          <Badge
            variant="outline"
            key={index}
            className={`text-[10px] font-semibold md:text-xs ${getBadgeClass(type)}`}
          >
            {type}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default EventItem;
