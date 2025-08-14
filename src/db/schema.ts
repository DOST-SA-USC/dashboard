import {
  boolean,
  date,
  pgTable,
  text,
  timestamp,
  jsonb,
  uuid,
} from 'drizzle-orm/pg-core';

// Better Auth Schemas
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}).enableRLS();

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
}).enableRLS();

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
}).enableRLS();

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp('updated_at').$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
}).enableRLS();

// DOST SA USC Schemas
export const userData = pgTable('user_data', {
  userId: text('user_id')
    .notNull()
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }),
  uscID: text('usc_id').notNull().unique(),
  firstName: text('first_name').notNull(),
  middleName: text('middle_name').notNull(),
  lastName: text('last_name').notNull(),
  emergencyContact: text('emergency_contact'),
  emergencyContactNumber: text('emergency_contact_number'),
  image: text('image').notNull(),
  program: text('program'),
  yearLevel: text('year_level'),
  birthDate: date('birth_date').notNull(),
  yearOfAward: text('year_of_award'),
  scholarshipType: text('scholarship_type'),
  role: text('role').notNull().default('student'),
  position: text('position'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}).enableRLS();

export const announcement = pgTable('announcements', {
  id: uuid('id').primaryKey(),
  title: text('title').notNull(),
  content: jsonb('content').notNull(),
  type: text('type').notNull(),
  urgent: boolean('urgent').notNull().default(false),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  authorId: text('author_id')
    .references(() => user.id, {
      onDelete: 'set null',
    })
    .notNull(),
  authorName: text('author_name').notNull(),
  authorPosition: text('author_position').notNull(),
  authorImageURL: text('author_image_url').notNull(),
}).enableRLS();

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  type: text('type').array().notNull(),
  description: text('description').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  authorId: text('author_id')
    .references(() => user.id, {
      onDelete: 'set null',
    })
    .notNull(),
  authorName: text('author_name').notNull(),
  authorPosition: text('author_position').notNull(),
  authorImageURL: text('author_image_url').notNull(),
}).enableRLS();

export const stipend = pgTable('stipend', {
  id: uuid('id').defaultRandom().primaryKey(),
  monthly: text('monthly').notNull(),
  forecast: text('forecast').notNull(),
  remarks: text('remarks').array().notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  authorId: text('author_id')
    .references(() => user.id, {
      onDelete: 'set null',
    })
    .notNull(),
  authorName: text('author_name').notNull(),
  authorPosition: text('author_position').notNull(),
  authorImageURL: text('author_image_url').notNull(),
}).enableRLS();

export const resources = pgTable('resources', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type').notNull(),
  content: jsonb('content'),
  link: text('link'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  authorId: text('author_id')
    .references(() => user.id, {
      onDelete: 'set null',
    })
    .notNull(),
  authorName: text('author_name').notNull(),
  authorPosition: text('author_position').notNull(),
  authorImageURL: text('author_image_url').notNull(),
}).enableRLS();
