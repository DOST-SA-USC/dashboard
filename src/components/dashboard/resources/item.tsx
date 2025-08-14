import React from 'react';
import { Button } from '@/components/ui/button';

const Item = (
  props: {
    data: { icon: string; title: string; description: string };
  } & React.ComponentPropsWithoutRef<'button'>
) => {
  const { data, ...buttonProps } = props;
  return (
    <Button
      variant="outline"
      className="h-auto w-full flex-row items-center justify-start gap-4 p-2 px-4 text-left md:p-4"
      {...buttonProps}
    >
      <span className="text-2xl">{data.icon}</span>
      <div>
        <div className="text-sm font-semibold md:text-base">{data.title}</div>
        <div className="text-muted-foreground text-xs text-wrap md:text-sm">
          {data.description}
        </div>
      </div>
    </Button>
  );
};

export default Item;
