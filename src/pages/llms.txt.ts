import type { APIContext } from 'astro';
import { certifications } from '../data/certifications';
import { roles } from '../data/experience';
import { nav, site } from '../data/site';
import { skills } from '../data/skills';

/**
 * llms.txt — a plain-text digest for models that read the site without rendering
 * it, laid out as the convention expects: an H1, a blockquote summary, then
 * sections of links and facts.
 *
 * Assembled from the same data modules the pages render from, so it cannot end up
 * describing a version of the site that no longer exists. The page list carries
 * labels and URLs only: per-page blurbs live on the pages themselves, and copying
 * them here would create a second set to keep in step.
 *
 * @param context - Astro's API context, used for the site URL.
 * @returns llms.txt as a plain-text response.
 */
export function GET(context: APIContext) {
  const origin = context.site ?? new URL(site.url);
  const absolute = (path: string) => new URL(path, origin).href;
  // `nav` stores hrefs without a trailing slash, but the built pages are indexed
  // with one. Linking the bare form would point every reader at a redirect. Only
  // pages get this: the feed and sitemap are files, and a slash would break them.
  const pageUrl = (path: string) => absolute(path.endsWith('/') ? path : `${path}/`);
  const [currentRole] = roles;

  const pages = [{ label: 'Home', href: '/' }, ...nav]
    .map((page) => `- [${page.label}](${pageUrl(page.href)})`)
    .join('\n');

  const capabilities = skills
    .map((group) => `- ${group.label}: ${group.items.join(', ')}`)
    .join('\n');

  const credentials = certifications
    .map(
      (certification) => `- ${certification.name} — ${certification.issuer}, ${certification.year}`
    )
    .join('\n');

  const body = `# ${site.name}

> ${site.role} based in ${site.location}. ${site.tagline}

## Pages

${pages}

## Current role

${currentRole.title} at ${currentRole.org} — ${currentRole.location}, ${currentRole.period}.

## Capabilities

${capabilities}

## Certifications

${credentials}

## Feeds

- [RSS](${absolute('/rss.xml')})
- [Sitemap](${absolute('/sitemap-index.xml')})

## Contact

- Email: ${site.email}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
