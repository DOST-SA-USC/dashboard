import { redirect } from 'next/navigation';
import React from 'react';

import { Header, Nav } from '@/components/dashboard/core';
import { Card } from '@/components/ui/card';
import { getSession } from '@/lib/auth/server';
import { getUserDataById } from '@/lib/db/users';
import { UserHydration } from '@/stores/user-hydration';

import Setup from './setup/setup';

import type { UserType } from '@/type';

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

  return (
    <>
      <UserHydration user={userData as UserType} />

      {userData ? (
        <div className="flex h-screen w-full gap-2 sm:h-[90vh] sm:w-[90vw] md:h-[650px] md:w-4xl lg:w-[1100px]">
          <Card className="hidden h-fit flex-col items-center gap-2 p-1 shadow-sm md:flex">
            <Nav />
          </Card>
          <Card className="h-full w-full !gap-0 overflow-hidden !p-0 shadow-sm">
            <Header />
            <main className="flex h-full w-full flex-1 flex-col gap-4 overflow-auto p-4">
              {children}
            </main>
          </Card>
        </div>
      ) : (
        <Setup userID={session.user.id} user={userData as UserType} />
      )}
    </>
  );
}
