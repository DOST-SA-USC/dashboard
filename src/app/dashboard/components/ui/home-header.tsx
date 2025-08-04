'use client';

import React, { useState } from 'react';

import {
  Calendar,
  IdCardLanyard,
  Award,
  TrendingUp,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import ScholarIDModal from '../scholar-id';
import { capitalizeFirstLetter } from '@/lib/helpers';

import type { UserType } from '@/type';

const HomeHeader = (props: { user: UserType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ScholarIDModal
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
      />

      <div className="mt-10 flex w-full items-start justify-between px-2 sm:px-10 lg:px-20">
        <div>
          <h1 className="w-full text-xl font-extrabold sm:text-2xl md:text-4xl">
            Greetings, {capitalizeFirstLetter(props.user.firstName)}! 👋
          </h1>
          <p className="text-xs md:mt-1 md:text-sm">
            Welcome to the Scholars&apos; Dashboard
          </p>
          <div className="text-muted-foreground mt-4 flex w-full items-center justify-center gap-4 text-xs font-semibold md:mt-6 md:text-sm">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-4" />
              BS {capitalizeFirstLetter(props.user.program)}
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4" />
              Year {props.user.yearLevel}
            </div>
            <div className="flex items-center gap-2">
              <Award className="size-4" />
              {props.user.scholarshipType.toUpperCase()}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              {props.user.yearOfAward}
            </div>
          </div>
        </div>
        <div className="hidden self-center lg:block">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <IdCardLanyard className="size-4" />
            View Scholar ID
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
