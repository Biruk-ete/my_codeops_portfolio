'use server';

import { revalidatePath } from 'next/cache';
import { validateOrder } from '@/lib/schema';

export async function placeOrder(prevState, formData) {
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

    const orderId = `ord_${Math.floor(1000 + Math.random() * 9000)}`;

    const orderData = {
        id: orderId,
        ...data,
        status: 'Order Received',
        createdAt: new Date().toISOString()
    };

    const encodedData = encodeURIComponent(JSON.stringify(orderData));

    revalidatePath('/orders');

    return { success: true, orderId: orderId, orderData: encodedData };
}