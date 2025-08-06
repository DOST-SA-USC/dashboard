'use server';

import { headers } from 'next/headers';

import { auth } from '../auth'; // path to your Better Auth server instance

export async function signIn(email: string, password: string) {
  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    asResponse: true, // returns a response object instead of data
  });

  return response;
}

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
