'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { signOut } from '@/lib/db/auth';

import { LogOut } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';

const SignOutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);

    try {
      await signOut();
    } catch (error) {
      toast.error(
        `An error occurred while signing out: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-full cursor-pointer"
      onClick={handleSignOut}
      disabled={loading}
    >
      {loading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </>
      )}
    </Button>
  );
};

export default SignOutButton;
