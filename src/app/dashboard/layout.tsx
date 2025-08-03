import React from 'react';

import { AppSidebar } from '@/app/dashboard/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { UserComponent } from './components/ui/user';
import ModeToggle from '@/components/ThemeSwitch';
import RoleBadge from '@/components/dashboard/role-badge';
import Setup from './components/setup';

import { getSession } from '@/lib/auth/server';
import { getUserDataById } from '@/lib/db/users';
import { redirect } from 'next/navigation';

import type { UserRoles } from '@/type';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session) {
    redirect('/');
  }

  const userData = await getUserDataById(session.user.id);

  function getCurrentDateTimeString() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    // Example: "Mon, Jul 28, 01:37 AM"
    const formatted = now.toLocaleString('en-US', options);
    // Remove commas and rearrange to "Mon Jul 28 01:37 AM"
    return formatted.replace(/,/g, '');
  }

  if (!userData) {
    return <Setup />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex w-full items-center justify-between gap-2 px-4">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />

              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <span className="text-muted-foreground hidden text-sm md:block">
                {getCurrentDateTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-4 px-4">
              <RoleBadge role={userData.role as UserRoles} />
              <ModeToggle variant="outline" />
              <UserComponent
                user={{
                  name: `${userData.firstName} ${userData.lastName}`,
                  email: userData.uscID,
                }}
              />
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
