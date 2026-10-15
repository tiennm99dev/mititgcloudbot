import { api } from 'sdk';
import { MINI_APP_URL } from './config.js';

/** Commands shown in the chat's "/" menu, in this order. */
const COMMANDS = [
  { command: 'start', description: 'Greeting and stats button' },
  { command: 'zen', description: 'A line of GitHub Zen' },
];

/**
 * Registers the bot's default command list and, once MINI_APP_URL is set, a
 * menu button that opens the Mini App. Both calls are idempotent.
 * @returns {Promise<void>}
 */
export async function registerMenu() {
  await Promise.all([
    api.setMyCommands({ commands: COMMANDS }),
    MINI_APP_URL && api.setChatMenuButton({
      menu_button: { type: 'web_app', text: 'Stats', web_app: { url: MINI_APP_URL } },
    }),
  ]);
}
