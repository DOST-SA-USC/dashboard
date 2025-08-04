'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { signOut } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/theme-switch';

import { LogOut } from 'lucide-react';

const Setup = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  function handleSignOut() {
    setIsPending(true);
    toast.promise(signOut(), {
      loading: 'Signing out...',
      success: () => {
        router.push('/');
        return 'Signed out successfully!';
      },
      error: (error: Error) => {
        setIsPending(false);
        return error.message || 'Sign out failed';
      },
    });
  }

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="flex w-xl flex-col gap-2">
        <div className="flex w-full items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isPending}
          >
            <LogOut className="size-4" />
          </Button>
          <ModeToggle variant="default" />
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Set Up Your Account</CardTitle>
            <CardDescription>
              Please set up your Account to access the dashboard features.
            </CardDescription>
          </CardHeader>
          <CardContent>{/* Stuff */}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setup;
