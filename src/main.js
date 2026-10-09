import './style.css';

/**
 * @typedef {object} Stats
 * @property {string} firstName
 * @property {number} messageCount
 * @property {string} memberSince
 * @property {{ users: number, messages: number }} totals
 */

const webApp = window.Telegram?.WebApp;

/**
 * @param {string} id
 * @returns {HTMLElement}
 */
const el = (id) => /** @type {HTMLElement} */ (document.getElementById(id));

/** @param {Stats} stats */
function render(stats) {
  el('first-name').textContent = stats.firstName;
  el('message-count').textContent = String(stats.messageCount);
  el('member-since').textContent = new Date(stats.memberSince).toLocaleDateString();
  el('total-users').textContent = String(stats.totals.users);
  el('total-messages').textContent = String(stats.totals.messages);
  el('status').hidden = true;
  el('stats').hidden = false;
}

/** @param {string} text */
function showStatus(text) {
  el('status').textContent = text;
  el('status').hidden = false;
  el('stats').hidden = true;
}

/** Fetches the caller's stats from the getStats endpoint and renders them. */
function load() {
  if (!webApp?.initData) {
    showStatus('Open this page from the bot inside Telegram.');
    return;
  }
  showStatus('Loading…');
  webApp.Serverless.call('getStats', {}, (/** @type {{ type: string, message: string } | null} */ err, /** @type {Stats} */ stats) => {
    if (err) showStatus(err.type === 'ENDPOINT_ERROR' ? err.message : 'Something went wrong. Try again.');
    else render(stats);
  });
}

webApp?.ready();
el('refresh').addEventListener('click', load);
load();
