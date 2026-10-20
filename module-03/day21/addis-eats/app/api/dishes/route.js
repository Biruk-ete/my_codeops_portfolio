export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase();

    const DISHES = [
        { id: "kitfo", name: "Kitfo", price: 320, category: "Kitfo" },
        { id: "shiro", name: "Shiro", price: 180, category: "Vegetarian" },
        { id: "doro", name: "Doro Wat", price: 420, category: "Wot" },
    ];

    if (query) {
        const filtered = DISHES.filter((d) => d.name.toLowerCase().includes(query));
        return Response.json(filtered);
    }

    return Response.json(DISHES);
}