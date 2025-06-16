import React from 'react';
import Link from 'next/link';

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

import { ChevronLeft } from 'lucide-react';

export default async function PrivatePage() {
  return (
    <Card className="h-auto w-full max-w-sm">
      <CardHeader>
        <Avatar>
          <AvatarImage src="./logo.png" />
          <AvatarFallback>Logo</AvatarFallback>
        </Avatar>

        <CardTitle className="font-primary font-extrabold">
          404 Not Found
        </CardTitle>
        <CardDescription>Requested resource was Not Found.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button className="w-full" asChild>
          <Link href="/">
            <ChevronLeft /> Go Back
          </Link>
        </Button>
      </CardContent>
      <CardFooter className="text-sm">
        <p>© 2025, DOST SA USC. All Rights Reserved.</p>
      </CardFooter>
    </Card>
  );
}
