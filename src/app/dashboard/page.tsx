import React from 'react';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

import SignOutButton from './SignOutButton';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <Card className="h-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-primary font-extrabold">
          {data.user.email}
        </CardTitle>
        <CardDescription>Welcome to your private dashboard!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <SignOutButton />
      </CardContent>
      <CardFooter className="text-sm">
        <p>© 2025, DOST SA USC. All Rights Reserved.</p>
      </CardFooter>
    </Card>
  );
}
