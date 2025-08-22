'use client';

import {
  Award,
  Calendar,
  GraduationCap,
  TrendingUp,
  Briefcase,
} from 'lucide-react';
import React from 'react';

import { capitalizeFirstLetter } from '@/lib/helpers';
import { useUserStore } from '@/stores/userStore';

import { Badge } from '@/components/ui/badge';

const HomeHeader = () => {
  const user = useUserStore((state) => state.user);
  if (!user || !user.uscID) return null;

  return (
    <div className="mt-4 flex w-full items-start sm:px-5 md:px-10">
      <div>
        <h1 className="w-full text-xl font-extrabold sm:text-2xl md:text-4xl">
          Greetings, {capitalizeFirstLetter(user.firstName)}!{' '}
          <span className="animate-wiggle inline-block">👋</span>
        </h1>
        <p className="text-xs md:mt-1 md:text-sm">
          Welcome to the DOST SA USC Tracker.
        </p>
        <div className="text-muted-foreground mt-4 flex w-full flex-wrap items-center gap-2 text-[10px] font-semibold md:text-xs">
          <InfoBadge
            icon={GraduationCap}
            text={capitalizeFirstLetter(user.program)}
          />
          <InfoBadge
            icon={TrendingUp}
            text={user.yearLevel ? `Year ${user.yearLevel}` : undefined}
          />
          <InfoBadge
            icon={Award}
            text={
              user.scholarshipType
                ? user.scholarshipType.toUpperCase()
                : undefined
            }
          />
          <InfoBadge icon={Calendar} text={user.yearOfAward} />
          <InfoBadge icon={Briefcase} text={user.position} />
        </div>
      </div>
    </div>
  );
};

const InfoBadge = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string | undefined;
}) => {
  if (!text) return null;

  return (
    <Badge variant="outline" className="flex items-center gap-2 py-1 md:px-3">
      <Icon className="size-4" />
      {text}
    </Badge>
  );
};

export default HomeHeader;
