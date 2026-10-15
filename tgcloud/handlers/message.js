// Runs on each `message` update. The platform calls the default export with the
// Message; the full update is `ctx.update`.

import { api } from 'sdk';
import { MINI_APP_URL } from '../lib/config.js';
import { recordMessage } from '../lib/users.js';
import { fetchZen } from '../lib/zen.js';

/**
 * @param {{ chat: { id: number }, from?: import('../lib/users.js').TelegramUser, text?: string }} message
 */
export default async function (message) {
  const chatId = message.chat.id;
  if (!message.from) return;

  const user = await recordMessage(message.from);
  const command = message.text?.split(/[\s@]/, 1)[0];

  if (command === '/start') {
    await api.sendMessage({
      chat_id: chatId,
      text: `Hi ${user.firstName}! Send me anything and I'll count it.\n/zen — a line of GitHub Zen`,
      ...(MINI_APP_URL && {
        reply_markup: { inline_keyboard: [[{ text: 'Open stats', web_app: { url: MINI_APP_URL } }]] },
      }),
    });
    return;
  }

  if (command === '/zen') {
    let text;
    try {
      text = await fetchZen();
    } catch (err) {
      console.error(err);
      text = 'GitHub Zen is unavailable right now, try again later.';
    }
    await api.sendMessage({ chat_id: chatId, text });
    return;
  }

  await api.sendMessage({
    chat_id: chatId,
    text: `You said: ${message.text ?? '(no text)'}\nMessages so far: ${user.messageCount}`,
  });
}
