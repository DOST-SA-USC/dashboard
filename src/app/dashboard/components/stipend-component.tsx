'use client';

import { Link as LinkIcon, List } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import OverviewCard from '@/components/dashboard/overview-card';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DBM_DATA, STIPEND_DATA } from '@/mockData/stipend';

const StipendCard = (props: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <Card className="flex flex-col gap-1 p-4 text-sm md:text-base">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold md:text-sm">{props.title}</h2>
        <props.icon className="text-primary size-4" />
      </div>
      <span className="text-primary text-2xl font-extrabold">
        {props.value}
      </span>
      <p className="text-muted-foreground text-[10px] md:text-xs">
        {props.description}
      </p>
    </Card>
  );
};

const StipendComponent = (props: { className?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <OverviewCard
        title="Stipend Status"
        value={STIPEND_DATA.stipendForecast.value}
        description="Click to view stipend details."
        icon={List}
        action={() => setOpen(true)}
        className={`cursor-pointer transition-all duration-200 ease-in-out hover:opacity-85 ${props.className}`}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{STIPEND_DATA.title}</DialogTitle>
            <DialogDescription>{STIPEND_DATA.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <StipendCard
                title={STIPEND_DATA.monthlyStipend.title}
                value={STIPEND_DATA.monthlyStipend.value}
                description={STIPEND_DATA.monthlyStipend.description}
                icon={STIPEND_DATA.monthlyStipend.icon}
              />
              <StipendCard
                title={STIPEND_DATA.stipendForecast.title}
                value={STIPEND_DATA.stipendForecast.value}
                description={STIPEND_DATA.stipendForecast.description}
                icon={STIPEND_DATA.stipendForecast.icon}
              />
            </div>

            <Card className="flex flex-col gap-1 p-4 text-sm md:text-base">
              <p>
                <strong>Update by:</strong> {STIPEND_DATA.updateBy}
              </p>
              <p>
                <strong>Position:</strong> {STIPEND_DATA.position}
              </p>
              <p>
                <strong>Date:</strong> {STIPEND_DATA.date}
              </p>
              <div>
                <strong>Remarks:</strong>
                <ul className="ml-2 list-inside list-disc">
                  {STIPEND_DATA.remarks.map((remark, idx) => (
                    <li key={idx}>{remark}</li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card className="flex flex-col gap-1 p-4">
              <div className="flex items-center gap-2">
                <h2 className="text-primary font-semibold">{DBM_DATA.title}</h2>
                <span> - </span>
                <Link
                  href={DBM_DATA.link}
                  target="_blank"
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  <LinkIcon className="size-3" /> Link
                </Link>
              </div>
              <div className="text-sm md:text-base">
                <p>{DBM_DATA.description}</p>
                <ol className="ml-2 list-inside list-decimal md:ml-4">
                  {DBM_DATA.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </Card>
          </div>
          <DialogFooter className="text-muted-foreground flex !justify-start text-xs md:text-sm">
            Note: Stipend update will be periodically updated (7–15 days).
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StipendComponent;
