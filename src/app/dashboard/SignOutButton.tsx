'use client';
import React from 'react';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { signOut } from '@/lib/db/auth';

const SignOutButton = () => {
  return (
    <Button className="w-full" onClick={signOut}>
      <LogOut />
      Sign Out
    </Button>
  );
};

export default SignOutButton;
