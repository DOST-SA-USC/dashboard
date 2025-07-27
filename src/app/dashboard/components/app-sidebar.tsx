'use client';

import * as React from 'react';
import Image from 'next/image';
import { Frame, Map, PieChart } from 'lucide-react';

import { NavMain } from './nav-main';
import { NavUser } from '@/app/dashboard/components/nav-user';
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
    title: 'Design Engineering',
    url: '#',
    icon: Frame,
  },
  {
    title: 'Sales & Marketing',
    url: '#',
    icon: PieChart,
  },
  {
    title: 'Travel',
    url: '#',
    icon: Map,
  },
];

export function AppSidebar(props: {
  userData: { name: string; email: string };
}) {
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
      <SidebarFooter>
        <NavUser user={props.userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
