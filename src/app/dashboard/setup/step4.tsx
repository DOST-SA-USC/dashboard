import React from 'react';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

import IDComponent from '../components/ui/id-component';
import { FormType } from '@/type';

const Form4 = (props: {
  prev?: () => void;
  data?: FormType;
  update: () => void;
}) => {
  return (
    <>
      <IDComponent />
      <div className="mt-10 flex w-full justify-between">
        <Button variant="outline" type="button" onClick={props.prev}>
          <ChevronLeft className="size-4" />
          Back
        </Button>
        <Button type="button" onClick={props.update}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default Form4;
