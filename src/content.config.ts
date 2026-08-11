import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

/**
 * Articles live as Markdown/MDX under `src/content/articles`. The filename
 * becomes the slug, so `kubernetes-dr.mdx` publishes at `/articles/kubernetes-dr`.
 */
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** Used for the list row, the meta description and the RSS item. */
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** Drafts render in dev and are excluded from the build and the feed. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
