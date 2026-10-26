import RevenueChart from "./RevenueChart";
import OrdersLineChart from "./OrdersLineChart";
import ChartDataTable from "./ChartDataTable";
import "./DashboardPage.css";

async function getOrders() {
    return [
        { id: "1", area: "Bole", total: 14200, date: "2026-06-01" },
        { id: "2", area: "Kazanchis", total: 8500, date: "2026-06-01" },
        { id: "3", area: "Megenagna", total: 11000, date: "2026-06-02" },
    ];
}

export default async function DashboardPage() {
    const orders = await getOrders();

    const byArea = ["Bole", "Kazanchis", "Megenagna"].map((area) => ({
        area,
        revenue: orders
            .filter((o) => o.area === area)
            .reduce((sum, o) => sum + o.total, 0),
    }));

    const byDay = [
        { date: "Jun 01", orders: 12 },
        { date: "Jun 02", orders: 19 },
        { date: "Jun 03", orders: 15 },
    ];

    return (
        <main className="dashboard-container">
            <h1 className="dashboard-title">Addis Eats Dashboard</h1>

            <section className="dashboard-section">
                <h2 className="section-title">Revenue by Neighbourhood</h2>
                <RevenueChart data={byArea} />
                <ChartDataTable data={byArea} />
            </section>

            <section className="dashboard-section">
                <h2 className="section-title">
                    Orders per day <span className="section-subtitle">(June 2026, Unit: Orders)</span>
                </h2>
                <OrdersLineChart data={byDay} />
                <ChartDataTable data={byDay} />
            </section>
        </main>
    );
}