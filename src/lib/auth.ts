import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

import * as authSchemas from '@/db/schema'; // import your auth schemas if needed
import { db } from '@/lib/db'; // your drizzle instance

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
