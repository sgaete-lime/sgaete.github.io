import { defineCollection, z } from 'astro:content';

const portfolioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    category: z.string(),
    thumbImg: z.string(),   // thumbnail
    fullImg: z.string(),    // main full-size image
    extraImgs: z.array(z.string()).optional(), // optional additional images
    youtube: z.array(z.string().url()).optional(),      // optional YouTube embed link
  }),
});

export const collections = {
  portfolio: portfolioCollection,
};
