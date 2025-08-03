'use server';
import { auth } from '@/lib/auth';

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Sign in failed');
  }
};
