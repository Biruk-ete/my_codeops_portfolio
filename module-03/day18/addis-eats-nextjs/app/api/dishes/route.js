import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    const allDishes = await db.dish.findMany();

    if (query) {
        const filteredDishes = allDishes.filter(dish =>
            dish.name.toLowerCase().includes(query.toLowerCase())
        );
        return NextResponse.json(filteredDishes);
    }

    return NextResponse.json(allDishes);
}