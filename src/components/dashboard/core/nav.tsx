'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { navData } from './component-data';

const Nav = () => {
  const pathname = usePathname();

  return (
    <>
      {navData.menu.map((item) => (
        <Tooltip key={item.title}>
          <TooltipTrigger asChild className="h-full w-full">
            <Button
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="h-full w-full py-3"
              asChild
            >
              <Link href={item.href}>
                <item.icon />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </>
  );
};

export default Nav;
