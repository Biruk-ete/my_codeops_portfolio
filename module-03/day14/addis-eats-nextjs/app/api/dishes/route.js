import { NextResponse } from 'next/server';

const dishes = [
    { id: 'kitfo', name: 'Prime Beef Kitfo', price: 720, category: 'Tibs' },
    { id: 'shiro', name: 'Clay-pot Shiro Bozena', price: 450, category: 'Stews' },
    { id: 'doro-wat', name: 'Special Doro Wat', price: 650, category: 'Stews' }
];

export async function GET() {
    return NextResponse.json(dishes);
}