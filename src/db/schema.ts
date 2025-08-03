import {
  pgTable,
  unique,
  pgPolicy,
  numeric,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const userData = pgTable(
  'user_data',
  {
    uscId: numeric('usc_id').notNull(),
    firstName: text('first_name'),
    middleName: text('middle_name'),
    lastName: text('last_name'),
    role: text().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    id: uuid().defaultRandom().primaryKey().notNull(),
  },
  (table) => [
    unique('user_data_usc_id_key').on(table.uscId),
    pgPolicy('Enable users to view their own data only', {
      as: 'permissive',
      for: 'select',
      to: ['authenticated'],
      using: sql`(( SELECT auth.uid() AS uid) = id)`,
    }),
  ]
);
