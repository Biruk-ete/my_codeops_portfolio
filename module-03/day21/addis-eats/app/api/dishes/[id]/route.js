const DISHES = [
    { id: "kitfo", name: "Kitfo", price: 320, category: "Kitfo" },
    { id: "shiro", name: "Shiro", price: 180, category: "Vegetarian" },
    { id: "doro", name: "Doro Wat", price: 420, category: "Wot" },
];

export async function GET(request, { params }) {
    const { id } = await params;  

    const dish = DISHES.find((d) => d.id === id);

    if (!dish) {
        return Response.json(
            { error: "No such dish" },
            { status: 404 }
        );
    }

    return Response.json(dish);
}