export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/cart', '/checkout', '/orders', '/profile', '/kitchen'],
        },
        sitemap: 'https://mesobhouse.vercel.app/sitemap.xml',
    };
}