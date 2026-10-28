export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mesobhouse.vercel.app';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/cart', '/checkout', '/orders', '/profile', '/kitchen'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}