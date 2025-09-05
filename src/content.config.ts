import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/articles",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { articles };
