import { fetch } from 'sdk';

/**
 * Fetches a random line of GitHub Zen.
 * @returns {Promise<string>}
 */
export async function fetchZen() {
  const res = await fetch('https://api.github.com/zen', {
    headers: { 'User-Agent': 'mititgcloudbot', Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) throw new Error(`GitHub Zen returned ${res.status}`);
  return (await res.text()).trim();
}
