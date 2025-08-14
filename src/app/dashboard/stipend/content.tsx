import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import OverviewCard from '@/components/dashboard/home/overview-card';
import { STIPEND_DETAILS, STIPEND_OVERVIEW } from '@/data/stipend';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Update from '@/components/dashboard/stipend/update';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import type { StipendType } from '@/type';

import { getUserInitials, getRelativeDate } from '@/lib/helpers';

const Content = (props: { data: StipendType }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <OverviewCard
          title={STIPEND_OVERVIEW[0].title}
          value={props.data.monthly}
          description={STIPEND_OVERVIEW[0].description}
          icon={STIPEND_OVERVIEW[0].icon}
        />
        <OverviewCard
          title={STIPEND_OVERVIEW[1].title}
          value={props.data.forecast}
          description={STIPEND_OVERVIEW[1].description}
          icon={STIPEND_OVERVIEW[1].icon}
        />
      </div>

      <div className="flex h-full w-full flex-col justify-between gap-4 md:flex-row">
        <Card className="h-full w-full gap-4 py-0">
          <div className="border-border m-0 flex w-full items-center justify-between border-b px-4 py-2">
            <div className="flex items-center gap-3">
              <Avatar className="bg-accent flex size-8 items-center justify-center text-base font-medium">
                <AvatarImage
                  src={props.data.authorImageURL}
                  alt={props.data.authorName}
                />
                <AvatarFallback>
                  {getUserInitials(props.data.authorName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-base leading-5 font-semibold">
                  {props.data.authorName}
                </p>
                <span className="text-[10px] md:text-xs">
                  {props.data.authorPosition}
                </span>
              </div>
            </div>
            <span className="text-muted-foreground text-xs">
              {getRelativeDate(new Date(props.data.createdAt ?? ''))}
            </span>
          </div>

          <CardContent className="flex-1 text-sm md:my-0 md:text-base">
            <h1 className="font-semibold">Remarks:</h1>
            <ul className="list-disc pl-5">
              {props.data.remarks.map((remark, idx) => (
                <li key={idx}>{remark}</li>
              ))}
            </ul>
          </CardContent>

          <div className="text-muted-foreground border-border flex !justify-start border-t px-4 py-2 text-xs md:text-sm">
            {STIPEND_DETAILS.note}
          </div>
        </Card>

        <div className="flex h-full w-full flex-col gap-2 md:w-2/5">
          <Card className="h-full w-full gap-2">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-1">
              {STIPEND_DETAILS.resources.map((resource, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {resource.disabled ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <Link
                            href="#"
                            className="text-secondary pointer-events-none flex items-center gap-2 underline opacity-50 hover:opacity-80"
                            aria-disabled
                            tabIndex={-1}
                          >
                            <LinkIcon className="h-4 w-4" />
                            {resource.label}
                          </Link>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right">soon</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Link
                      href={resource.href}
                      className="text-secondary flex items-center gap-2 underline hover:opacity-80"
                      tabIndex={0}
                    >
                      <LinkIcon className="h-4 w-4" />
                      {resource.label}
                    </Link>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          <Update data={props.data} />
        </div>
      </div>
    </>
  );
};

export default Content;
