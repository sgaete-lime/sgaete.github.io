import { defineCollection, z } from "astro:content";

const portfolioCollection = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    desc: z.string(),
    category: z.string(),
    thumbImg: image(),   // thumbnail
    fullImg: image(),    // main full-size image
    extraImgs: z.array(image()).optional(),
    youtube: z.array(z.string().url()).optional(),
    order: z.number(), // required now
  }),
});

export const collections = {
  portfolio: portfolioCollection,
};
