// POST /api/getStats — the caller's own stats plus bot-wide totals.

import { EndpointError } from 'sdk';
import { findUser, totals } from '../lib/users.js';

/**
 * @param {object} _input
 * @param {{ initData: { user?: { id: number } } }} ctx
 * @returns {Promise<{ firstName: string, messageCount: number, memberSince: string, totals: { users: number, messages: number } }>}
 */
export default async function (_input, ctx) {
  const tgId = ctx.initData.user?.id;
  if (!tgId) throw new EndpointError('Open the app from a private chat with the bot', { code: 'NO_USER' });

  const user = await findUser(tgId);
  if (!user) throw new EndpointError('Send the bot a message first', { code: 'NOT_FOUND' });

  return {
    firstName: user.firstName,
    messageCount: user.messageCount,
    memberSince: user.createdAt.toISOString(),
    totals: await totals(),
  };
}
