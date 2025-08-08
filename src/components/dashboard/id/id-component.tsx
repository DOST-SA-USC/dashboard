import Image from 'next/image';
import React from 'react';

import HoverCard from '@/components/dashboard/ui/hover-card';
import { useIsMobile } from '@/hooks/use-mobile';

const IDComponent = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-row items-center gap-4 overflow-x-auto md:gap-8 md:p-8">
      {!isMobile ? (
        <>
          <HoverCard>
            <Image
              src="/scholar_id/idSkinFront.png"
              alt="Scholar ID"
              width={300}
              height={100}
              className="rounded-lg"
            />
          </HoverCard>
          <HoverCard>
            <Image
              src="/scholar_id/idSkinBack.png"
              alt="Scholar ID"
              width={300}
              height={100}
              className="rounded-lg"
            />
          </HoverCard>
        </>
      ) : (
        <>
          <Image
            src="/scholar_id/idSkinFront.png"
            alt="Scholar ID"
            width={300}
            height={100}
            className="rounded-lg"
          />
          <Image
            src="/scholar_id/idSkinBack.png"
            alt="Scholar ID"
            width={300}
            height={100}
            className="rounded-lg"
          />
        </>
      )}
    </div>
  );
};

export default IDComponent;
