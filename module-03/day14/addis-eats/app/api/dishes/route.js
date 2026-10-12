const DISHES = [
    { id: "kitfo", name: "Kitfo", price: 320, category: "Kitfo" },
    { id: "shiro", name: "Shiro", price: 180, category: "Vegetarian" },
    { id: "doro", name: "Doro Wat", price: 420, category: "Wot" },
];

export async function GET() {
    return Response.json(DISHES);
}