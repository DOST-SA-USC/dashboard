import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/components/ui/card';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const PageCard = (props: {
  title: string;
  description: string;
  link?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Card className={props.className}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          {props.description}
        </CardDescription>
        {props.link && (
          <CardAction className="flex items-center justify-end">
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground ml-1" asChild>
                <Link href={props.link} className="flex items-center">
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>More {props.title}</TooltipContent>
            </Tooltip>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default PageCard;
