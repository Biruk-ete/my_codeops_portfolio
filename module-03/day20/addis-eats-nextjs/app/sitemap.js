import { db } from '@/lib/db';

export default async function sitemap() {
    const dishes = await db.dish.findMany();

    const dishUrls = dishes.map((dish) => ({
        url: `https://mesobhouse.vercel.app/menu/${dish.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        {
            url: 'https://mesobhouse.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://mesobhouse.vercel.app/menu',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...dishUrls,
    ];
}