import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/lib/db'; // your drizzle instance

import * as authSchemas from '@/db/schema'; // import your auth schemas if needed

import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema: authSchemas,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
