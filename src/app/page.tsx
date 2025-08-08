import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

import { ThemeSwitch } from '@/components/dashboard/core';
import LoginForm from '@/components/dashboard/login/form';
import { Card, CardContent } from '@/components/ui/card';
import { getSession } from '@/lib/auth/server';

export default async function Home() {
  const session = await getSession();
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[url('/pattern-light.png')] bg-[length:160px_160px] bg-repeat p-6 md:bg-[length:180px_180px] md:p-10 lg:bg-[length:200px_200px] dark:bg-[url('/pattern-dark.png')]">
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <ThemeSwitch variant="default" />
      </div>
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
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
                <LoginForm />
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
    </div>
  );
}
