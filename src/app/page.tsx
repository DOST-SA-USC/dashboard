import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

import { ThemeSwitch } from '@/components/dashboard/core';
import LoginForm from '@/components/dashboard/login/form';
import { Card, CardContent } from '@/components/ui/card';
import { getSession } from '@/lib/auth/server';

import GoogleSignIn from '@/components/dashboard/login/google';

export default async function Home() {
  const session = await getSession();
  if (session) {
    redirect('/dashboard');
  }

  return (
    <>
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <ThemeSwitch variant="default" />
      </div>

      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex h-full w-full flex-col gap-2">
          <Card className="h-full w-full overflow-hidden p-0">
            <CardContent className="grid h-full w-full p-0 md:grid-cols-2">
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 py-8">
                <div className="flex w-full flex-col items-center justify-center text-center">
                  <Image
                    width={64}
                    height={64}
                    src="/logo.png"
                    alt="Logo"
                    className="mb-2"
                  />
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Sign In to continue.
                  </p>
                </div>
                <LoginForm />
                <GoogleSignIn />
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
            By clicking sign in, you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </>
  );
}
