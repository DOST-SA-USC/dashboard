import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

import * as authSchemas from '@/db/schema'; // import your auth schemas if needed
import { db } from '@/lib/db'; // your drizzle instance

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchemas,
  }),
  emailAndPassword: {
    enabled: true,
    signUp: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      accessType: 'offline',
      prompt: 'login',
      disableSignUp: true, // disable sign up for Google
      disableImplicitSignUp: true,
    },
  },
  plugins: [nextCookies()],
});
