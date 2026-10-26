import { NextResponse } from 'next/server';
import { validateOrder } from '@/lib/schema';

export async function POST(request) {
    try {
        const body = await request.json();
        const { success, errors } = validateOrder(body);

        if (!success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    fieldErrors: errors
                },
                { status: 422 }
            );
        }

        const newOrder = {
            id: `ord_${Math.floor(Math.random() * 1000)}`,
            ...body,
            createdAt: new Date().toISOString()
        };

        return NextResponse.json(newOrder, { status: 201 });

    } catch (err) {
        return NextResponse.json(
            { error: "Invalid JSON format" },
            { status: 400 }
        );
    }
}