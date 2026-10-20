import RevenueChart from "./RevenueChart";

// 1. Fake Data (Server-side)
async function getOrders() {
    return [
        { id: 1, item: "Kitfo", total: 320 },
        { id: 2, item: "Shiro", total: 150 },
        { id: 3, item: "Kitfo", total: 200 },
        { id: 4, item: "Doro Wat", total: 450 },
    ];
}

export default async function DashboardOverviewPage() {
    const orders = await getOrders();

    const menuRevenue = ["Kitfo", "Shiro", "Doro Wat"].map((itemName) => {
        const revenue = orders
            .filter((o) => o.item === itemName)
            .reduce((sum, o) => sum + o.total, 0);

        return { name: itemName, revenue };
    });

    return (
        <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Menu Overview</h1>
            <p style={{ color: "#666", marginBottom: "2rem" }}>
                How much revenue each dish is generating.
            </p>

            <RevenueChart data={menuRevenue} />
        </div>
    );
}