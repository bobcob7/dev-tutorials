import { defineCollection, z } from "astro:content";

const tutorials = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    topics: z.array(z.string()),
    repo: z.string().url().optional(),
    publishDate: z.coerce.date(),
    order: z.number().optional(), // for multi-part series ordering
  }),
});

export const collections = { tutorials };
