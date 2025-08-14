'use server';

import { headers } from 'next/headers';

import { auth } from '../auth'; // path to your Better Auth server instance

export const signIn = async (email: string, password: string) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Sign in failed');
  }
};

export async function signOut() {
  const response = await auth.api.signOut({
    headers: await headers(),
    asResponse: true,
  });

  return response;
}

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  return session;
}
