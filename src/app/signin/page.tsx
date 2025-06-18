import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { signIn } from '@/lib/db/auth';
import { createClient } from '@/lib/supabase/server';

import SignInButton from './SignInButton';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { ChevronLeft } from 'lucide-react';

export default async function LoginPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect('/dashboard');
  }

  return (
    <Card className="h-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full w-full">
        <form className="flex w-full flex-col gap-2">
          <Label htmlFor="uscID">USC ID:</Label>
          <Input id="uscID" name="uscID" type="text" required />
          <Label htmlFor="password">Password:</Label>
          <Input id="password" name="password" type="password" required />

          <hr className="my-4" />

          <SignInButton formAction={signIn} />
          <Button className="w-full" variant="outline" asChild>
            <Link href="/">
              <ChevronLeft /> Go Back
            </Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
