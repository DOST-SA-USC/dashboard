import { redirect } from 'next/navigation';
import React from 'react';

import { getSession } from '@/lib/auth/server';
import { getUserDataById } from '@/lib/db/users';
import { UserHydration } from '@/stores/user-hydration';

import NavBar from './components/ui/nav-bar';
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
    <div className="m-auto min-h-screen min-w-screen bg-[url('/pattern-light.png')] bg-[length:160px_160px] bg-repeat md:bg-[length:180px_180px] lg:bg-[length:200px_200px] dark:bg-[url('/pattern-dark.png')]">
      <UserHydration user={userData as UserType} />

      {userData ? (
        <>
          <NavBar />
          {children}
        </>
      ) : (
        <Setup userID={session.user.id} user={userData as UserType} />
      )}
    </div>
  );
}
