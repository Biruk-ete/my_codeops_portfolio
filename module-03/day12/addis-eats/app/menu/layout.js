export default function MenuLayout({ children }) {
    return (
        <div style={{ display: "flex", gap: "2rem" }}>
            <aside
                style={{
                    minWidth: "180px",
                    borderRight: "1px solid #eee",
                    paddingRight: "1rem",
                }}
            >
                <h2>Categories</h2>
                <ul>
                    <li>Wot</li>
                    <li>Kitfo</li>
                    <li>Vegetarian</li>
                    <li>Drinks</li>
                </ul>
            </aside>

            <section style={{ flex: 1 }}>{children}</section>
        </div>
    );
}