import React from 'react';
import Link from 'next/link';

import { createClient } from '@/lib/supabase/server';

import SignInForm from '@/components/SignInForm';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { ExternalLink } from 'lucide-react';

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  return (
    <Card className="h-auto w-full max-w-sm">
      <CardHeader>
        <Avatar>
          <AvatarImage src="./logo.png" />
          <AvatarFallback>logo</AvatarFallback>
        </Avatar>

        <CardTitle className="font-primary font-extrabold">
          DOST SA USC
        </CardTitle>
        <CardDescription>
          DOST Scholars’ Association in the University of San Carlos.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {data?.user ? (
          <Button className="w-full cursor-pointer" asChild>
            <Link href={process.env.NEXT_PUBLIC_DASHBOARD_URL as string}>
              Dashboard
            </Link>
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full cursor-pointer">Sign In</Button>
            </DialogTrigger>
            <DialogContent className="w-96">
              <DialogHeader>
                <DialogTitle>Sign In</DialogTitle>
                <DialogDescription>
                  Enter your credentials to access your account.
                </DialogDescription>
              </DialogHeader>
              <SignInForm />
            </DialogContent>
          </Dialog>
        )}
        <Button className="w-full" variant="outline" asChild>
          <Link href="https://www.facebook.com/dostsausc" target="_blank">
            <ExternalLink /> Facebook
          </Link>
        </Button>
      </CardContent>
      <CardFooter className="text-sm">
        <p>© 2025, DOST SA USC. All Rights Reserved.</p>
      </CardFooter>
    </Card>
  );
}
