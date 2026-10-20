const orders = [];

export function getOrder(id) {
    return orders.find((o) => o.id === id) || {
        id,
        status: "Cooking",
        updatedAt: new Date().toISOString(),
    };
}