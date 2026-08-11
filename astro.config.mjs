import { execSync } from 'node:child_process';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

/**
 * Commit date of the last source change, used as the sitemap's `lastmod`.
 *
 * Build time would be the wrong value: it moves on every deploy whether or not
 * anything changed, so the field stops carrying information. A commit date only
 * moves when the pages do.
 *
 * It is one date for the whole site rather than one per URL on purpose. A change
 * to a layout, a component or a data module rewrites every page, so for a site
 * this size a shared timestamp is accurate far more often than it is coarse.
 *
 * Needs real history: under a shallow clone most paths have no commit, and then
 * this returns undefined so the field is omitted rather than invented.
 *
 * @returns The commit date, or undefined when git cannot answer.
 */
function lastSourceChange() {
  try {
    const stamp = execSync('git log -1 --format=%cI -- src public astro.config.mjs', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    return stamp ? new Date(stamp) : undefined;
  } catch {
    return undefined;
  }
}

// No UI framework is registered: every interaction so far (theme toggle,
// scroll reveal) is a few lines of plain DOM. Add @astrojs/react back the
// moment a component genuinely needs component state.
export default defineConfig({
  site: 'https://www.perlmutter.tech',
  integrations: [mdx(), sitemap({ lastmod: lastSourceChange() })],
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'auto' },
  prefetch: true,
});
