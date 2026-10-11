import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value ?? "guest";

    return (
        <main>
            <h1>Checkout</h1>
            <p>Session: {session}</p>
        </main>
    );
}