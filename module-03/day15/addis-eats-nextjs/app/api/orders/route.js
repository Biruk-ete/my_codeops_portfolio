import { NextResponse } from 'next/server';
import { validateOrder } from '@/lib/schema';

export async function POST(request) {
    try {
        const body = await request.json();

        // 1. Validate the body using our shared schema
        const { success, errors } = validateOrder(body);

        // 2. If it fails, return 422 (Unprocessable Entity)
        if (!success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    fieldErrors: errors
                },
                { status: 422 }
            );
        }

        // 3. If it succeeds, pretend to save to a database and return 201 (Created)
        const newOrder = {
            id: `ord_${Math.floor(Math.random() * 1000)}`,
            ...body,
            createdAt: new Date().toISOString()
        };

        return NextResponse.json(newOrder, { status: 201 });

    } catch (err) {
        // 4. If the JSON is malformed, return 400 (Bad Request)
        return NextResponse.json(
            { error: "Invalid JSON format" },
            { status: 400 }
        );
    }
}