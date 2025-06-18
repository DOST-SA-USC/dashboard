'use client';
import React, { useState } from 'react';

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
      console.error('Sign out failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-full hover:cursor-pointer"
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
