import React from 'react';

import NavBar from './components/ui/nav-bar';
import Setup from './setup/setup';

import { getSession } from '@/lib/auth/server';
import { getUserDataById } from '@/lib/db/users';
import { redirect } from 'next/navigation';

import { UserHydration } from '@/stores/user-hyradtion';

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
      <div className="m-auto h-full w-full bg-[url('/pattern-light.png')] bg-[length:160px_160px] bg-repeat md:bg-[length:180px_180px] lg:bg-[length:200px_200px] dark:bg-[url('/pattern-dark.png')]">
        {userData ? (
          <>
            <NavBar />
            <div className="mx-auto max-w-[1600px] md:px-4">{children}</div>
          </>
        ) : (
          <Setup userID={session.user.id} user={userData as UserType} />
        )}
      </div>
    </>
  );
}
