import { defineCollection, z } from 'astro:content';

const portfolioCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        desc: z.string(),
        category: z.string(),
        thumbImg: z.string(), //thumbnail
        fullImg: z.string(), //full-size in lightbox
    }),
});

export const collections = {
    'portfolio': portfolioCollection
}