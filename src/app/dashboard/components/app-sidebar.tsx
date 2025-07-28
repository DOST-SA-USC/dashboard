'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  House,
  Megaphone,
  Calendar,
  CircleDollarSign,
  BookOpen,
} from 'lucide-react';

import { NavMain } from './ui/nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const companyData = {
  name: 'ISKOLA',
  description: 'DOST SA USC',
  logo: '/logo.png',
};

const navData = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: House,
  },
  {
    title: 'Announcements',
    url: '/dashboard/announcements',
    icon: Megaphone,
  },
  {
    title: 'Events',
    url: '/dashboard/events',
    icon: Calendar,
  },
  {
    title: 'Stipends',
    url: '/dashboard/stipends',
    icon: CircleDollarSign,
  },
  {
    title: 'Resources',
    url: '/dashboard/resources',
    icon: BookOpen,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image
                  width={100}
                  height={100}
                  src={companyData.logo}
                  alt={companyData.name}
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold">{companyData.name}</span>
                <span className="truncate text-xs">
                  {companyData.description}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData} />
      </SidebarContent>
      <SidebarFooter>{/* // dost sa usc socials */}</SidebarFooter>
    </Sidebar>
  );
}
