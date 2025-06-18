'use client';

import React, { useActionState, useEffect, useState } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { LoaderCircle, Eye, EyeOff } from 'lucide-react';

import { signIn } from '@/lib/db/auth';

import { toast } from 'sonner';

import { authState } from '@/type';

const initialState: authState = { message: '', error: false };

const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(signIn, initialState);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state.message) {
      if (state.error) {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-2" action={formAction}>
      <Label htmlFor="uscID">USC ID:</Label>
      <Input id="uscID" name="uscID" type="text" required />
      <div className="flex items-center justify-between">
        <Label htmlFor="password">Password:</Label>
        <button
          type="button"
          className="text-muted-foreground cursor-pointer text-xs hover:underline"
        >
          Forgot Password?
        </button>
      </div>
      <div className="relative">
        <Input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <Button
        type="submit"
        className="mt-4 w-full cursor-pointer"
        disabled={isPending}
      >
        {isPending ? <LoaderCircle className="animate-spin" /> : 'Sign In'}
      </Button>
    </form>
  );
};

export default SignInForm;
