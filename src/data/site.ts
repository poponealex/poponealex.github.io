/** Single source of truth for identity, metadata and outbound links. */

export interface SocialLink {
  /** Display name, also used as the accessible label. */
  name: string;
  href: string;
  /** Short form shown in the footer's contact column. */
  handle: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export const site = {
  name: 'Alexandre Perlmutter',
  initials: 'AP',
  role: 'Cloud & Platform Engineer',
  tagline: 'Kubernetes, infrastructure-as-code and DevSecOps for enterprise clients.',
  // Kept under ~125 characters: Google truncates search snippets around 155, and
  // social previews clip closer to 125. One string feeds both.
  description:
    'Cloud and platform engineer. I run production Kubernetes, Terraform and DevSecOps on AWS and Azure for enterprise clients.',
  url: 'https://www.perlmutter.tech',
  locale: 'en',
  /**
   * `og:locale` takes `language_TERRITORY` where `lang` takes the bare subtag, so
   * the two cannot share one value. `en_GB` matches the en-GB dates on articles.
   */
  ogLocale: 'en_GB',
  location: 'Luxembourg',
  email: 'alexandre@perlmutter.tech',
} as const;

/**
 * The default social card, shared by the OG tags and the JSON-LD image node.
 *
 * Crawlers and social platforms cache og:image by URL, so a regenerated card
 * behind the old URL can go unseen for weeks. Bump `version` whenever
 * scripts/og-card.swift is re-run.
 */
export const socialCard = {
  path: '/og-default.png',
  version: 2,
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.role}`,
} as const;

export const socials: readonly SocialLink[] = [
  { name: 'GitHub', href: 'https://github.com/poponealex', handle: '@poponealex' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/aperlmutter', handle: 'in/aperlmutter' },
  {
    name: 'Credly',
    href: 'https://www.credly.com/users/aperlmutter/badges',
    handle: 'credly/aperlmutter',
  },
  { name: 'Email', href: `mailto:${site.email}`, handle: site.email },
];

export const nav: readonly NavLink[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Writing', href: '/articles' },
];
