import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Fetch articles newest first, dropping drafts everywhere except `astro dev`.
 *
 * Shared by the index, the post template and the RSS feed so the three can
 * never disagree about what counts as published.
 *
 * @returns Published articles sorted by publication date, most recent first.
 */
export async function getPublishedArticles(): Promise<CollectionEntry<'articles'>[]> {
  const articles = await getCollection('articles', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );

  return articles.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/**
 * Format a publication date for display.
 *
 * @param date - The date to format.
 * @returns The date as e.g. "6 August 2026".
 */
export function formatArticleDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
