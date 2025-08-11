'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { GoogleIcon } from '../ui/icons';

import { signInWithGoogle } from '@/lib/auth/client';

const Google = () => {
  return (
    <>
      <div className="after:border-border relative w-full text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
      <Button
        variant="outline"
        onClick={signInWithGoogle}
        className="w-full rounded-full md:w-auto"
      >
        <GoogleIcon />
        Sign In with Google
      </Button>
    </>
  );
};

export default Google;
