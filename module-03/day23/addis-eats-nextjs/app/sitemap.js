import { db } from '@/lib/db';

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mesobhouse.vercel.app';

    let dishes = [];
    try {
        dishes = await db.dish.findMany();
    } catch (error) {
        console.error("Failed to fetch dishes for sitemap:", error);
    }

    const dishUrls = dishes.map((dish) => ({
        url: `${baseUrl}/menu/${dish.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/menu`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...dishUrls,
    ];
}