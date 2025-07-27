'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

import { useActionState } from 'react';
import { signIn } from '@/lib/db/auth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import type { authState } from '@/type';

const initialState: authState = { message: '', error: false };

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
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
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="space-y-8 p-8 py-14">
            <div className="flex flex-col items-center text-center">
              <Image
                width={64}
                height={64}
                src="/logo.png"
                alt="Logo"
                className="mb-2"
              />
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground text-balance">
                Sign In to your scholar account.
              </p>
            </div>
            <form className="flex flex-col gap-2" action={formAction}>
              <Label htmlFor="uscID">USC ID</Label>
              <Input id="uscID" name="uscID" type="text" required />

              <div className="mt-2 flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
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
                {isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </div>
          <div className="bg-muted relative hidden md:block">
            <Image
              width={500}
              height={500}
              src="/placeholder.jpg" // temporary
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking sign in, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
