'use client';

import Link from 'next/link';
import React from 'react';

import RoleBadge from '@/components/dashboard/ui/role-badge';
import ModeToggle from '@/components/dashboard/core/theme-switch';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { BRAND_DATA, NAV_DATA } from '@/data/core';
import SearchComponent from '../core/search';
import UserComponent from '../core/user';

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between border-b p-2 px-4">
      <div className="flex h-full items-center gap-3">
        <Link href={BRAND_DATA.href} className="flex items-center gap-2">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage
              src={BRAND_DATA.logo}
              width="180"
              height="180"
              alt={BRAND_DATA.alt}
            />
            <AvatarFallback className="bg-accent rounded-lg">
              {BRAND_DATA.fallback}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="hidden md:block">
          <h1 className="text-lg leading-5 font-bold">{BRAND_DATA.title}</h1>
          <p className="text-muted-foreground text-xs">{BRAND_DATA.subtitle}</p>
        </div>
      </div>

      <div className="flex h-full items-center gap-2">
        <RoleBadge />
        <ModeToggle variant="outline" />
        <SearchComponent data={NAV_DATA} />
        <UserComponent />
      </div>
    </header>
  );
};

export default Header;
