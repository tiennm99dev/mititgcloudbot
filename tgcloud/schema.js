import { table, integer, text, sql } from 'sdk/db';

// One row per Telegram user who has messaged the bot.
export const users = table('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  tgId: integer('tg_id').notNull().unique(),
  firstName: text('first_name').notNull(),
  username: text('username'),
  messageCount: integer('message_count').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  lastSeenAt: integer('last_seen_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});
