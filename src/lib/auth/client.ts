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

export const { signIn, signUp, signOut, useSession } = createAuthClient();
