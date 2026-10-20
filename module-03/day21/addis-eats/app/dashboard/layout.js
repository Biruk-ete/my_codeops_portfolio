import Link from "next/link";

export default function DashboardLayout({ children }) {
    return (
        <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>

            <nav style={{
                height: "60px", background: "#1f2937", color: "white",
                display: "flex", alignItems: "center", padding: "0 20px", justifyContent: "space-between"
            }}>
                <h2>Addis Eats Admin</h2>
                <Link href="/" style={{ color: "white" }}>Back to Site</Link>
            </nav>

            <div style={{ display: "flex", flex: 1 }}>

                <aside style={{
                    width: "250px", background: "#f3f4f6", padding: "20px", borderRight: "1px solid #e5e7eb"
                }}>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        <li><Link href="/dashboard">Overview</Link></li>
                        <li><Link href="/orders">Orders</Link></li>
                        <li><Link href="/menu">Menu Items</Link></li>
                    </ul>
                </aside>

                {/* MAIN CONTENT (This is where page.js goes!) */}
                <main style={{ flex: 1, padding: "40px", background: "white" }}>
                    {children}
                </main>

            </div>

            <footer style={{
                height: "50px", background: "#1f2937", color: "white",
                display: "flex", alignItems: "center", justifyContent: "center"
            }}>
                © 2026 Addis Eats Admin Panel
            </footer>

        </div>
    );
}