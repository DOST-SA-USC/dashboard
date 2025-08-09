import React from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

import OverviewCard from '@/components/dashboard/home/overview-card';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

import {
  STIPEND_OVERVIEW,
  STIPEND_DETAILS,
} from '@/components/dashboard/stipend/data';

const Stipend = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {STIPEND_OVERVIEW.map((item, idx) => (
          <OverviewCard
            key={idx}
            title={item.title}
            value={item.value}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="flex h-full w-full flex-col justify-between gap-4 md:flex-row">
        <Card className="h-full w-full gap-2 pt-0">
          <CardHeader className="flex w-full items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Avatar className="bg-accent flex size-8 items-center justify-center text-base font-medium">
                <AvatarImage src="#" alt={STIPEND_DETAILS.author.name} />
                <AvatarFallback>
                  {STIPEND_DETAILS.author.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-base leading-5 font-semibold">
                  {STIPEND_DETAILS.author.name}
                </p>
                <span className="text-xs">{STIPEND_DETAILS.author.role}</span>
              </div>
            </div>
            <span className="text-muted-foreground text-xs">
              {STIPEND_DETAILS.author.timeAgo}
            </span>
          </CardHeader>

          <hr />

          <CardContent className="my-4 flex-1 md:my-0">
            <h1 className="font-semibold">Remarks:</h1>
            <ul className="list-disc pl-5">
              {STIPEND_DETAILS.remarks.map((remark, idx) => (
                <li key={idx}>{remark}</li>
              ))}
            </ul>
          </CardContent>

          <hr />

          <CardFooter className="text-muted-foreground flex !justify-start text-xs md:text-sm">
            {STIPEND_DETAILS.note}
          </CardFooter>
        </Card>

        <Card className="h-full w-full gap-2 md:w-2/5">
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
      </div>
    </>
  );
};

export default Stipend;
