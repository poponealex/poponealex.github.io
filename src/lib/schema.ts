/**
 * JSON-LD builders for the site's structured data.
 *
 * Every page emits a single `@graph` rather than a bag of independent snippets.
 * The Person, WebSite and image nodes carry stable `@id`s and page-level nodes
 * reference them by `@id` instead of restating them: nodes sharing an `@id`
 * describe one entity, so the Person is defined once and pointed at from every
 * page instead of being restated four slightly different ways.
 *
 * Everything is derived from `src/data`, so the markup cannot drift from what
 * the pages actually render.
 */

import { getImage } from 'astro:assets';
import portrait from '../assets/portrait.jpg';
import { certifications, credlyProfile } from '../data/certifications';
import { studies } from '../data/education';
import { roles } from '../data/experience';
import { nav, site, socialCard, socials } from '../data/site';
import { skills } from '../data/skills';

/** A single JSON-LD node. Each key takes a different value shape, so it stays open. */
type JsonLdNode = Record<string, unknown>;

/** Page node type, chosen by what the page actually is. */
export type PageSchemaType = 'ProfilePage' | 'CollectionPage' | 'WebPage';

/** The article fields a `BlogPosting` node needs. */
export interface ArticleSchema {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: readonly string[];
}

export interface GraphInput {
  /** Absolute canonical URL of the page, trailing slash included. */
  canonical: string;
  /** Request pathname, used to derive the breadcrumb trail. */
  pathname: string;
  /** Contents of the `<title>` element. */
  pageTitle: string;
  /** Bare page title, without the site-name suffix. Absent on the home page. */
  title?: string;
  description: string;
  /** Absolute, version-stamped URL of the social card. */
  imageUrl: string;
  schemaType: PageSchemaType;
  article?: ArticleSchema;
}

const PERSON_ID = `${site.url}/#person`;
const WEBSITE_ID = `${site.url}/#website`;
const CARD_ID = `${site.url}/#socialcard`;
const PORTRAIT_ID = `${site.url}/#portrait`;

/** Square, so the portrait survives whatever crop a consumer applies. */
const PORTRAIT_SIZE = 512;

/**
 * Split a `"City, Country"` string into the parts of a `PostalAddress`.
 *
 * The last comma-separated segment is the country; anything before it is the
 * locality. A single segment is treated as the country, which is what
 * `site.location` ("Luxembourg") is.
 *
 * @param location - Location string as written in `src/data`.
 * @returns A `PostalAddress` node.
 */
function toPostalAddress(location: string): JsonLdNode {
  const parts = location.split(',').map((part) => part.trim());
  const locality = parts.length > 1 ? parts.slice(0, -1).join(', ') : undefined;

  return {
    '@type': 'PostalAddress',
    ...(locality && { addressLocality: locality }),
    addressCountry: parts[parts.length - 1],
  };
}

/**
 * Express a location as a place hierarchy rather than an address.
 *
 * `Occupation.occupationLocation` expects an `AdministrativeArea`, so a
 * `PostalAddress` is not interchangeable here.
 *
 * @param location - Location string as written in `src/data`.
 * @returns A `City` node nested in its `Country`, or a bare `Country`.
 */
function toAdministrativeArea(location: string): JsonLdNode {
  const parts = location.split(',').map((part) => part.trim());
  const country = { '@type': 'Country', name: parts[parts.length - 1] };

  if (parts.length === 1) return country;

  return {
    '@type': 'City',
    name: parts.slice(0, -1).join(', '),
    containedInPlace: country,
  };
}

/**
 * Build the Person node — the entity the whole site exists to describe.
 *
 * @returns A `Person` node with credentials, employment and education attached.
 */
async function buildPerson(): Promise<JsonLdNode> {
  const avatar = await getImage({
    src: portrait,
    width: PORTRAIT_SIZE,
    height: PORTRAIT_SIZE,
    format: 'webp',
  });
  const avatarUrl = new URL(avatar.src, site.url).href;
  const [currentRole] = roles;

  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.name,
    url: `${site.url}/`,
    jobTitle: site.role,
    description: site.description,
    email: `mailto:${site.email}`,
    image: {
      '@type': 'ImageObject',
      '@id': PORTRAIT_ID,
      url: avatarUrl,
      contentUrl: avatarUrl,
      width: PORTRAIT_SIZE,
      height: PORTRAIT_SIZE,
    },
    address: toPostalAddress(site.location),
    // `rel="me"` on the rendered links makes the same claim in HTML; this is the
    // machine-readable half of the identity graph.
    sameAs: socials
      .filter((social) => !social.href.startsWith('mailto:'))
      .map((social) => social.href),
    knowsAbout: skills.flatMap((group) => [...group.items]),
    worksFor: {
      '@type': 'Organization',
      name: currentRole.org,
      ...(currentRole.orgUrl && { url: currentRole.orgUrl }),
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: currentRole.title,
      occupationLocation: toAdministrativeArea(currentRole.location),
    },
    alumniOf: studies.map((study) => ({
      '@type': 'EducationalOrganization',
      name: study.school,
      address: toPostalAddress(study.location),
    })),
    hasCredential: certifications.map((certification) => ({
      '@type': 'EducationalOccupationalCredential',
      name: certification.name,
      credentialCategory: 'certificate',
      educationalLevel: certification.level,
      dateCreated: String(certification.year),
      recognizedBy: { '@type': 'Organization', name: certification.issuer },
      // Individual badge URLs are not tracked, so every credential points at the
      // profile that verifies all of them.
      url: credlyProfile,
    })),
  };
}

/**
 * Build the WebSite node.
 *
 * Deliberately carries no `potentialAction`: the site has no search endpoint, so
 * advertising a search action would point at a route that does not exist.
 *
 * @returns A `WebSite` node published by the Person.
 */
function buildWebSite(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${site.url}/`,
    name: site.name,
    description: site.description,
    inLanguage: site.locale,
    publisher: { '@id': PERSON_ID },
  };
}

/**
 * Build the social card as a referenceable image node.
 *
 * @param imageUrl - Absolute, version-stamped URL of the card.
 * @returns An `ImageObject` node.
 */
function buildSocialCard(imageUrl: string): JsonLdNode {
  return {
    '@type': 'ImageObject',
    '@id': CARD_ID,
    url: imageUrl,
    contentUrl: imageUrl,
    width: socialCard.width,
    height: socialCard.height,
  };
}

/**
 * Derive the breadcrumb trail from the URL path.
 *
 * Labels come from `nav` so the trail reads the way the navigation does
 * (`/articles` renders as "Writing"), with the page's own title as the label for
 * the leaf. A single-crumb trail carries no information, so the root gets none.
 *
 * @param pathname - Request pathname.
 * @param leafLabel - Title of the current page, used for the final crumb.
 * @returns A `BreadcrumbList` node, or null when the page is the site root.
 */
function buildBreadcrumb(pathname: string, leafLabel: string): JsonLdNode | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = segments.map((segment, index) => {
    const isLeaf = index === segments.length - 1;
    const href = `/${segments.slice(0, index + 1).join('/')}/`;
    const navLabel = nav.find((link) => link.href === `/${segment}`)?.label;

    return {
      '@type': 'ListItem',
      position: index + 2,
      name: navLabel ?? (isLeaf ? leafLabel : segment),
      // The final crumb is the current page, so it carries a name but no `item`.
      ...(!isLeaf && { item: new URL(href, site.url).href }),
    };
  });

  return {
    '@type': 'BreadcrumbList',
    '@id': `${pathname === '/' ? `${site.url}/` : new URL(pathname, site.url).href}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
      ...crumbs,
    ],
  };
}

/**
 * Build the node describing the page itself.
 *
 * @param input - The page's canonical URL, titles and node type.
 * @param hasBreadcrumb - Whether a `BreadcrumbList` is present to link to.
 * @returns A `WebPage`, `ProfilePage` or `CollectionPage` node.
 */
function buildPage(input: GraphInput, hasBreadcrumb: boolean): JsonLdNode {
  const { canonical, pageTitle, description, schemaType } = input;

  return {
    '@type': schemaType,
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: pageTitle,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: site.locale,
    primaryImageOfPage: { '@id': CARD_ID },
    // A profile page *is about* its subject; the other pages merely mention them.
    ...(schemaType === 'ProfilePage'
      ? { mainEntity: { '@id': PERSON_ID } }
      : { about: { '@id': PERSON_ID } }),
    ...(hasBreadcrumb && { breadcrumb: { '@id': `${canonical}#breadcrumb` } }),
  };
}

/**
 * Build the BlogPosting node for an article page.
 *
 * @param canonical - Absolute canonical URL of the article.
 * @param article - The article's front matter.
 * @returns A `BlogPosting` node authored and published by the Person.
 */
function buildBlogPosting(canonical: string, article: ArticleSchema): JsonLdNode {
  return {
    '@type': 'BlogPosting',
    '@id': `${canonical}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.pubDate.toISOString(),
    dateModified: (article.updatedDate ?? article.pubDate).toISOString(),
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    ...(article.tags.length > 0 && { keywords: [...article.tags] }),
    inLanguage: site.locale,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: { '@id': `${canonical}#webpage` },
    image: { '@id': CARD_ID },
  };
}

/**
 * Assemble the full `@graph` for one page.
 *
 * @param input - Everything the layout knows about the page being rendered.
 * @returns The JSON-LD document to serialise into the head.
 */
export async function buildGraph(input: GraphInput): Promise<JsonLdNode> {
  const breadcrumb = buildBreadcrumb(input.pathname, input.title ?? input.pageTitle);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      await buildPerson(),
      buildWebSite(),
      buildSocialCard(input.imageUrl),
      buildPage(input, breadcrumb !== null),
      ...(breadcrumb ? [breadcrumb] : []),
      ...(input.article ? [buildBlogPosting(input.canonical, input.article)] : []),
    ],
  };
}

/**
 * Serialise a graph for embedding in a `<script type="application/ld+json">`.
 *
 * Escapes `<` so a stray `</script>` in any content string cannot terminate the
 * element early and turn the rest of the JSON into markup.
 *
 * @param graph - The graph returned by `buildGraph`.
 * @returns JSON safe to inject into a script element.
 */
export function serialiseGraph(graph: JsonLdNode): string {
  return JSON.stringify(graph).replace(/</g, '\\u003c');
}
