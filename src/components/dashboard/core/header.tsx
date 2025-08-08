'use client';

import Link from 'next/link';
import React from 'react';

import RoleBadge from '@/components/dashboard/ui/role-badge';
import ModeToggle from '@/components/dashboard/core/theme-switch';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { brandData, navData } from './component-data';
import SearchComponent from '../core/search';
import UserComponent from '../core/user';

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between border-b p-2 px-4">
      <div className="flex h-full items-center gap-3">
        <Link href={brandData.href} className="flex items-center gap-2">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage
              src={brandData.logo}
              width="180"
              height="180"
              alt={brandData.alt}
            />
            <AvatarFallback className="bg-accent rounded-lg">
              {brandData.fallback}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="hidden md:block">
          <h1 className="text-lg leading-5 font-bold">{brandData.title}</h1>
          <p className="text-muted-foreground text-xs">{brandData.subtitle}</p>
        </div>
      </div>

      <div className="flex h-full items-center gap-2">
        <RoleBadge />
        <ModeToggle variant="outline" />
        <SearchComponent data={navData} />
        <UserComponent />
      </div>
    </header>
  );
};

export default Header;
