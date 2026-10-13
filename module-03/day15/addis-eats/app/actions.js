"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/schema";

const orders = [];

export async function placeOrder(prevState, formData) {
    const parsed = orderSchema.safeParse({
        name: formData.get("name"),
        phone: formData.get("phone"),
        dishId: formData.get("dishId"),
        quantity: formData.get("quantity"),
    });

    if (!parsed.success) {
        return {
            error: "Validation failed",
            fieldErrors: parsed.error.flatten().fieldErrors,
        };
    }

    const order = {
        id: `ord_${Date.now()}`,
        ...parsed.data,
        total: parsed.data.quantity * 320,
        currency: "ETB",
    };
    orders.push(order);

    revalidatePath("/orders");

    return { id: order.id };
}

export async function cancelOrder(orderId) {
    // 1. Who is asking?
    const cookieStore = await cookies();
    const user = { id: cookieStore.get("userId")?.value ?? null };
    if (!user.id) throw new Error("Not signed in");

    // 2. Do they own this record?
    const order = orders.find((o) => o.id === orderId);
    if (!order) throw new Error("No such order");
    if (order.userId !== user.id) throw new Error("Not yours");

    // 3. Do it.
    order.cancelled = true;
    revalidatePath("/orders");
}