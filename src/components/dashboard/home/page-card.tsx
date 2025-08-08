import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
        <CardTitle className="text-primary">{props.title}</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          {props.description}
        </CardDescription>
        {props.link && (
          <CardAction className="flex items-center justify-end">
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground ml-1" asChild>
                <Link href={props.link} className="flex items-center">
                  <ExternalLink className="text-primary ml-1 size-4" />
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
