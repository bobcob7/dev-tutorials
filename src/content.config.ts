import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const tutorials = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/tutorials",
    generateId: ({ entry }) =>
      entry.replace(/\.(md|mdx)$/, "").replace(/\/index$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    topics: z.array(z.string()),
    repo: z.string().url().optional(),
    publishDate: z.coerce.date(),
    order: z.number().optional(),
  }),
});

export const collections = { tutorials };
