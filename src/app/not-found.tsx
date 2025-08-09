import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function PrivatePage() {
  return (
    <Card className="h-auto w-full max-w-sm">
      <CardHeader>
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
    </Card>
  );
}
