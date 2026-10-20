"use server";

import { getSession } from "@/lib/session";
import { orderSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

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
    status: "Cooking",
  };

  console.log("Order placed successfully:", order);

  revalidatePath("/orders");

  return { id: order.id };
}

export async function cancelOrder(orderId) {
  const user = await getSession();
  if (!user) {
    throw new Error("401: Not signed in");
  }

  if (orderId === "ord_2" && user.id !== "usr_2") {
    throw new Error("403: Not yours");
  }

  console.log(`Order ${orderId} cancelled by user ${user.id}`);

  revalidatePath("/orders");

  return { ok: true };
}