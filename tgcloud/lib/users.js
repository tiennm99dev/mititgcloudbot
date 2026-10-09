import { db } from 'sdk';
import { eq, sql } from 'sdk/db';
import { users } from '../schema.js';

/**
 * @typedef {object} TelegramUser
 * @property {number} id
 * @property {string} first_name
 * @property {string} [username]
 */

/**
 * @typedef {object} UserRow
 * @property {number} id
 * @property {number} tgId
 * @property {string} firstName
 * @property {string | null} username
 * @property {number} messageCount
 * @property {Date} createdAt
 * @property {Date} lastSeenAt
 */

/**
 * Creates the user on first contact and counts one more message.
 * @param {TelegramUser} from
 * @returns {Promise<UserRow>}
 */
export async function recordMessage(from) {
  const [row] = await db.insert(users)
    .values({ tgId: from.id, firstName: from.first_name, username: from.username ?? null, messageCount: 1 })
    .onConflictDoUpdate({
      target: users.tgId,
      set: {
        firstName: from.first_name,
        username: from.username ?? null,
        messageCount: sql`${users.messageCount} + 1`,
        lastSeenAt: sql`(unixepoch())`,
      },
    })
    .returning();
  return row;
}

/**
 * @param {number} tgId
 * @returns {Promise<UserRow | null>}
 */
export async function findUser(tgId) {
  return db.select().from(users).where(eq(users.tgId, tgId)).get();
}

/**
 * Totals across every user of the bot.
 * @returns {Promise<{ users: number, messages: number }>}
 */
export async function totals() {
  const row = await db.get(sql`SELECT count(*) AS users, coalesce(sum(message_count), 0) AS messages FROM users`);
  return { users: Number(row?.users ?? 0), messages: Number(row?.messages ?? 0) };
}
