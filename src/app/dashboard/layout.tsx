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
    <div className="m-auto flex min-h-screen min-w-screen flex-col items-center justify-center bg-[url('/pattern-light.png')] bg-[length:160px_160px] bg-repeat md:bg-[length:180px_180px] lg:bg-[length:200px_200px] dark:bg-[url('/pattern-dark.png')]">
      <UserHydration user={userData as UserType} />

      {userData ? (
        <div className="flex h-screen w-full gap-2 sm:h-[90vh] sm:w-[90%] md:h-[80vh] md:w-4/5 lg:h-[70vh] lg:w-3/5">
          <Card className="hidden h-fit flex-col items-center gap-2 p-1 shadow-sm md:flex">
            <Nav />
          </Card>
          <Card className="h-full w-full !gap-0 !p-0 shadow-sm">
            <Header />
            <main className="flex h-full w-full flex-1 flex-col gap-4 p-4">
              {children}
            </main>
          </Card>
        </div>
      ) : (
        <Setup userID={session.user.id} user={userData as UserType} />
      )}
    </div>
  );
}
