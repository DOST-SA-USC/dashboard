'use client';

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const signInWithGoogle = async () => {
  await authClient.signIn.social({
    provider: 'google',
    errorCallbackURL: '/errors',
  });
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await authClient.signIn.email({
      email,
      password,
    });

    if (!response.data) {
      throw new Error(response.error.message);
    }

    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Sign in failed');
  }
};

export const {
  signUp,
  signOut,
  useSession,
  resetPassword,
  requestPasswordReset,
} = createAuthClient();
