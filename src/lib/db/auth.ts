'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { authState } from '@/type';

async function signIn(_: authState, formData: FormData): Promise<authState> {
  const supabase = await createClient();

  const uscEmailDomain = process.env.NEXT_PUBLIC_USC_EMAIL_DOMAIN as string;
  const data = {
    email: `${formData.get('uscID')}@${uscEmailDomain}` as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      error: true,
      message: 'Invalid sign in credentials',
    };
  }

  const dashboardURL = process.env.NEXT_PUBLIC_DASHBOARD_URL as string;

  revalidatePath(dashboardURL, 'layout');
  redirect(dashboardURL);
}

async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

export { signIn, signOut };
