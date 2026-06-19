import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const accessLogs = pgTable('access_logs', {
  id: serial('id').primaryKey(),
  postalCode: varchar('postal_code', { length: 8 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});