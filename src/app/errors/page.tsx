'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AuthErrorPage() {
  const params = useSearchParams();
  const error = params.get('error');

  let message = 'An unknown error occurred.';

  if (error === 'signup_disabled') {
    message =
      'Scholar Account does not exist, if you think that this is a mistake please contact DOST SA USC via uscdostsa@gmail.com for assistance.';
  } else if (error === 'please_restart_the_process') {
    message = 'Something went wrong. Please try signing in again.';
  }

  return (
    <Card className="h-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-primary font-extrabold">
          Something went Wrong!
        </CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button className="w-full" asChild>
          <Link href="/">
            <ChevronLeft /> Go Back
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
