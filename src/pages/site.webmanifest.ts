import { site } from '../data/site';

/**
 * Web app manifest, generated rather than kept as a static file so the name and
 * description cannot drift from `site.ts`.
 *
 * The colours match the favicon's own background, so an install splash reads as
 * one surface instead of a dark mark on a light card.
 *
 * @returns The manifest as a JSON response.
 */
export function GET() {
  const manifest = {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    description: site.description,
    lang: site.locale,
    start_url: '/',
    display: 'standalone',
    background_color: '#0C1013',
    theme_color: '#0C1013',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
}
