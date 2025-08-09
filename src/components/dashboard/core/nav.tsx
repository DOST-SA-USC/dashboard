'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

      <hr className="w-4/5" />

      <Tooltip>
        <TooltipTrigger asChild className="h-full w-full">
          <Button variant="ghost" className="h-full w-full py-3">
            <navData.resources.icon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{navData.resources.title}</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild className="h-full w-full">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-full w-full py-3">
                <navData.socials.icon />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{navData.socials.title}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent side="right" align="start">
          {navData.socials.items.map((item) => (
            <DropdownMenuItem key={item.title}>
              <item.icon className="size-3" />
              {item.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Nav;
