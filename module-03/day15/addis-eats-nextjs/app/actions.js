'use server';

import { revalidatePath } from 'next/cache';
import { validateOrder } from '@/lib/schema';

const currentUser = { id: 'user_123', name: 'Biruk' };
const ordersDB = [{ id: 'ord_999', userId: 'user_123' }];

export async function placeOrder(prevState, formData) {
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address')
    };

    const { success, errors } = validateOrder(data);
    if (!success) {
        return { fieldErrors: errors };
    }

    console.log("Order placed successfully:", data);

    revalidatePath('/orders');

    return { success: true, message: "Order placed!" };
}

export async function cancelOrder(orderId) {
    if (!currentUser) {
        throw new Error("Not signed in");
    }

    const order = ordersDB.find(o => o.id === orderId);
    if (!order) {
        throw new Error("Order not found");
    }

    if (order.userId !== currentUser.id) {
        throw new Error("Not authorized to cancel this order");
    }

    console.log(`Order ${orderId} cancelled.`);
    revalidatePath('/orders');

    return { success: true, message: "Order cancelled successfully" };
}