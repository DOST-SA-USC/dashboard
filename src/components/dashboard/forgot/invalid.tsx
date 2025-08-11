'use client';

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
  return (
    <Card className="w-[90%] md:w-md">
      <CardHeader>
        <CardTitle className="font-primary font-extrabold">
          Forgot Password
        </CardTitle>
        <CardDescription>Invalid or Expired Token.</CardDescription>
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
