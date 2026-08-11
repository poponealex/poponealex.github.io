import type { APIContext } from 'astro';
import { site } from '../data/site';

/**
 * robots.txt, generated rather than kept in `public/` so the sitemap URL cannot
 * drift from `site.url` the way a hardcoded copy silently would.
 *
 * Every crawler is welcome, search and AI alike. There are deliberately no
 * per-agent groups: `User-agent: *` already covers the AI crawlers, so naming
 * them individually would repeat `Allow: /` without changing what any of them may
 * do, and the list would rot as agents are renamed and added.
 *
 * @param context - Astro's API context, used for the site URL.
 * @returns robots.txt as a plain-text response.
 */
export function GET(context: APIContext) {
  const origin = context.site ?? new URL(site.url);
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap-index.xml', origin).href}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
