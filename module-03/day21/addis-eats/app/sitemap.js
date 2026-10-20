export default async function sitemap() {
    const baseUrl = "http://localhost:3000";

    const dishes = ["kitfo", "shiro"];

    const dishUrls = dishes.map((id) => ({
        url: `${baseUrl}/menu/${id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: `${baseUrl}/menu`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        ...dishUrls,
    ];
}