import React, { memo } from 'react';
import { Button } from '../../ui/button';

import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = (props: {
  page: {
    page: number;
    total: number;
  };
  onPageChange: (arg: { page: number; total: number }) => void;
}) => {
  return (
    <div className="flex items-center justify-between p-4">
      <Button
        variant="outline"
        onClick={() =>
          props.onPageChange({
            page: props.page.page - 1,
            total: props.page.total,
          })
        }
        size="sm"
        disabled={props.page.page === 1}
      >
        <ChevronLeft />
        Previous
      </Button>
      <span className="text-xs font-medium">
        {props.page.page}/{props.page.total}
      </span>
      <Button
        variant="outline"
        onClick={() =>
          props.onPageChange({
            page: props.page.page + 1,
            total: props.page.total,
          })
        }
        size="sm"
        disabled={props.page.page === props.page.total}
      >
        Next
        <ChevronRight />
      </Button>
    </div>
  );
};

export default memo(Pagination);
