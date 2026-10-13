import { orderSchema } from "@/lib/schema";

const orders = [];  // in-memory for now — a real app uses a DB

export async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json(
            { error: "Body must be valid JSON" },
            { status: 400 }
        );
    }

    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
        return Response.json(
            {
                error: "Validation failed",
                fieldErrors: parsed.error.flatten().fieldErrors,
            },
            { status: 422 }
        );
    }

    const order = {
        id: `ord_${Date.now()}`,
        ...parsed.data,
        total: parsed.data.quantity * 320,   // simplified for the demo
        currency: "ETB",
    };
    orders.push(order);

    return Response.json(order, { status: 201 });
}