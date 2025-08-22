import { defineCollection, z } from "astro:content";

const portfolioCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    category: z.string(),
    thumbImg: z.string(),   // thumbnail
    fullImg: z.string(),    // main full-size image
    extraImgs: z.array(z.string()).optional(),
    youtube: z.array(z.string().url()).optional(),
    order: z.number(), // required now
  }),
});

export const collections = {
  portfolio: portfolioCollection,
};
