import React from 'react';

import Setup from './components/setup';

import NavBar from './components/ui/nav-bar';

import { getSession } from '@/lib/auth/server';
import { getUserDataById } from '@/lib/db/users';
import { redirect } from 'next/navigation';

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

  if (!userData) {
    return <Setup />;
  }

  return (
    <div className="h-full w-full bg-[url('/pattern-light.png')] bg-[length:200px_200px] bg-repeat dark:bg-[url('/pattern-dark.png')]">
      <NavBar user={userData as UserType} />
      <div className="mx-auto mt-14 md:px-4 md:py-6">{children}</div>
    </div>
  );
}
