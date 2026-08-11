import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { getPublishedArticles } from '../lib/articles';

/**
 * RSS feed for the writing section.
 *
 * @param context - Astro's API context, used for the site URL.
 * @returns The feed as an XML response.
 */
export async function GET(context: APIContext) {
  const articles = await getPublishedArticles();

  return rss({
    title: `${site.name} — Writing`,
    description: 'Notes on Kubernetes, infrastructure-as-code and platform engineering.',
    site: context.site ?? site.url,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      categories: [...article.data.tags],
      link: `/articles/${article.id}/`,
    })),
    customData: `<language>${site.locale}</language>`,
  });
}
