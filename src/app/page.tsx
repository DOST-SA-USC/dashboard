import React from 'react';

import { LoginForm } from '@/components/login-form';
import ModeToggle from '@/components/ThemeSwitch';

export default async function Home() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <ModeToggle variant="default" />
      </div>
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
