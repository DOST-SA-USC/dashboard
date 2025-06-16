import React from 'react';
import { LoaderCircle } from 'lucide-react';

const Loading = () => {
  return (
    <div className="animate-spin">
      <LoaderCircle />
    </div>
  );
};

export default Loading;
