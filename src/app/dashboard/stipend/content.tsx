import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import OverviewCard from '@/components/dashboard/home/overview-card';
import {
  STIPEND_DETAILS,
  STIPEND_OVERVIEW,
} from '@/components/dashboard/stipend/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Update from '@/components/dashboard/stipend/update';

import type { StipendType } from '@/type';

import { getUserInitials, formatDateStartEnd } from '@/lib/helpers';

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
        <Card className="h-full w-full gap-4 pt-0">
          <CardHeader className="flex w-full items-center justify-between p-4">
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
                <span className="text-xs">{props.data.authorPosition}</span>
              </div>
            </div>
            <span className="text-muted-foreground text-xs">
              {formatDateStartEnd(props.data.createdAt as string)}
            </span>
          </CardHeader>

          <hr />

          <CardContent className="my-4 flex-1 md:my-0">
            <h1 className="font-semibold">Remarks:</h1>
            <ul className="list-disc pl-5">
              {props.data.remarks.map((remark, idx) => (
                <li key={idx}>{remark}</li>
              ))}
            </ul>
          </CardContent>

          <hr />

          <CardFooter className="text-muted-foreground flex !justify-start text-xs md:text-sm">
            {STIPEND_DETAILS.note}
          </CardFooter>
        </Card>

        <div className="flex h-full w-full flex-col gap-2 md:w-2/5">
          <Card className="h-full w-full gap-2">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-1">
              {STIPEND_DETAILS.resources.map((resource, idx) => (
                <div key={idx} className="flex gap-2">
                  <Link
                    href={resource.disabled ? '#' : resource.href}
                    className={`text-secondary flex items-center gap-2 underline hover:opacity-80 ${resource.disabled ? 'pointer-events-none opacity-50' : ''}`}
                    aria-disabled={resource.disabled}
                    tabIndex={resource.disabled ? -1 : 0}
                  >
                    <LinkIcon className="h-4 w-4" />
                    {resource.label}
                  </Link>
                  {resource.disabled && (
                    <span className="bg-muted text-muted-foreground ml-2 rounded px-2 py-0.5 text-xs font-semibold">
                      soon
                    </span>
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
