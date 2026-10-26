'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { validateOrder } from '@/lib/schema';
import { createOrder, getOrder, markCancelled } from '@/lib/db';
import { getSession, destroySession } from '@/lib/session';


export async function placeOrder(prevState, formData) {
    try {
        const sessionUser = await getSession();
        const userId = sessionUser?.id || 'user_1';

        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            total: Number(formData.get('total')) || 650
        };

        const { success, errors } = validateOrder(data);
        if (!success) {
            return { fieldErrors: errors };
        }

        const newOrder = await createOrder({
            ...data,
            userId: userId
        });

        const orderData = {
            id: newOrder.id,
            ...data,
            status: 'Order Received',
            createdAt: new Date().toISOString()
        };
        const encodedData = encodeURIComponent(JSON.stringify(orderData));

        revalidatePath('/orders');

        return { success: true, orderId: newOrder.id, orderData: encodedData };

    } catch (error) {
        console.error("Place Order Error:", error);
        return { fieldErrors: { general: ["Something went wrong on the server."] } };
    }
}

export async function cancelOrder(orderId) {
    const user = await getSession();
    if (!user) throw new Error("Not signed in");

    const order = await getOrder(orderId);
    if (!order) throw new Error("Order not found");
    if (order.userId !== user.id) throw new Error("Not authorized to cancel this order");

    await markCancelled(orderId);
    revalidatePath('/orders');
    return { success: true };
}

export async function logout() {
    await destroySession();
    redirect('/login');
}