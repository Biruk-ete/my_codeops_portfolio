export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/cart", "/checkout", "/orders/"],
        },
        sitemap: "http://localhost:3000/sitemap.xml",
    };
}