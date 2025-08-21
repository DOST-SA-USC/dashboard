import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react'; // icon for links

import type { TabType } from '@/type';

const Item = (
  props: {
    data: {
      type: TabType;
      icon: string;
      title: string;
      description: string;
    };
  } & React.ComponentPropsWithoutRef<'button'>
) => {
  const { data, ...buttonProps } = props;
  return (
    <Button
      variant="outline"
      className={`h-auto w-full flex-row items-center justify-start gap-4 p-2 px-4 text-left md:p-4 ${
        data.type === 'links' ? 'hover:bg-accent' : ''
      }`}
      {...buttonProps}
    >
      <span className="text-2xl">{data.icon}</span>
      <div className="flex flex-1 flex-col items-start text-left">
        <div className="flex w-full items-center gap-2">
          <span className="text-sm font-semibold md:text-base">
            {data.title}
          </span>
          {data.type === 'links' && (
            <ExternalLink className="text-muted-foreground h-4 w-4" />
          )}
        </div>
        <div className="text-muted-foreground text-xs text-wrap md:text-sm">
          {data.description}
        </div>
      </div>
    </Button>
  );
};

export default Item;
