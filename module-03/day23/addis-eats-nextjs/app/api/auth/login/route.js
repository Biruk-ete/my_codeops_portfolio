import { NextResponse } from 'next/server';
import { createSession } from '@/lib/session';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        const user = await createSession(email, password);

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}