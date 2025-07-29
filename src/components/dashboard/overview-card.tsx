import React from 'react';

import { type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

const OverviewCard = (props: {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  action?: () => void;
  className?: string;
}) => {
  return (
    <Card
      className={`flex flex-col gap-2 p-4 md:p-6 ${props.className}`}
      onClick={props.action}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-card-foreground text-xs font-medium md:text-sm">
          {props.title}
        </h1>
        <props.icon className="text-muted-foreground size-3 md:size-5" />
      </div>
      <span className="text-foreground text-2xl font-extrabold md:text-4xl">
        {props.value}
      </span>
      <p className="text-muted-foreground text-[10px] md:text-xs">
        {props.description}
      </p>
    </Card>
  );
};

export default OverviewCard;
