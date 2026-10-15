// Registers the bot's command menu and menu button. `npm run deploy` runs it
// after each push with `tgcloud run`, which passes no init data. Mini App calls
// always carry verified init data, so they are refused.

import { EndpointError } from 'sdk';
import { registerMenu } from '../lib/menu.js';

/**
 * @param {object} _input
 * @param {{ initData?: object }} ctx
 * @returns {Promise<{ ok: true }>}
 */
export default async function (_input, ctx) {
  if (ctx.initData) throw new EndpointError('Not available', { code: 'CLI_ONLY' });
  await registerMenu();
  return { ok: true };
}
