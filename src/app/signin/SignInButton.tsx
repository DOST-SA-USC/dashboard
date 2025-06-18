'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

import { LoaderCircle } from 'lucide-react';

const SignInButton = (props: React.ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full hover:cursor-pointer"
      disabled={pending}
      {...props}
    >
      {pending ? <LoaderCircle className="animate-spin" /> : 'Sign In'}
    </Button>
  );
};

export default SignInButton;
