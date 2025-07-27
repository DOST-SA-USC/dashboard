import React from 'react';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { LoginForm } from '@/components/login-form';

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect((process.env.NEXT_PUBLIC_DASHBOARD_URL as string) || '/dashboard');
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
