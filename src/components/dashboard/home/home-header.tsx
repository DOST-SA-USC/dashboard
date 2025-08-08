'use client';

import { Award, Calendar, GraduationCap, TrendingUp } from 'lucide-react';
import React from 'react';

import { capitalizeFirstLetter } from '@/lib/helpers';
import { useUserStore } from '@/stores/userStore';

const HomeHeader = () => {
  const user = useUserStore((state) => state.user);
  if (!user || !user.uscID) return null;

  return (
    <div className="flex w-full items-start justify-between">
      <div>
        <h1 className="w-full text-xl font-extrabold sm:text-2xl md:text-4xl">
          Greetings, {capitalizeFirstLetter(user.firstName)}!{' '}
          <span className="animate-wiggle inline-block">👋</span>
        </h1>
        <p className="text-xs md:mt-1 md:text-sm">
          Welcome to the DOST SA USC Tracker.
        </p>
        <div className="text-muted-foreground mt-4 flex w-full items-center justify-center gap-4 text-xs font-semibold md:mt-6 md:text-sm">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4" />
            {capitalizeFirstLetter(user.program)}
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4" />
            Year {user.yearLevel}
          </div>
          <div className="flex items-center gap-2">
            <Award className="size-4" />
            {user.scholarshipType.toUpperCase()}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            {user.yearOfAward}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
