import { NextResponse } from 'next/server';

const dishes = [
    { id: 'kitfo', name: 'Prime Beef Kitfo', price: 720, category: 'Tibs' },
    { id: 'shiro', name: 'Clay-pot Shiro Bozena', price: 450, category: 'Stews' },
    { id: 'doro-wat', name: 'Special Doro Wat', price: 650, category: 'Stews' }
];

export async function GET(request, { params }) {
    const { id } = await params;

    const dish = dishes.find(d => d.id === id);

    if (!dish) {
        return NextResponse.json(
            { error: "No such dish" },
            { status: 404 }
        );
    }

    return NextResponse.json(dish);
}