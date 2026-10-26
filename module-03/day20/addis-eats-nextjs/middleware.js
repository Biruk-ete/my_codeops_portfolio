import { NextResponse } from 'next/server';

export function middleware(request) {
    // 1. Check for the cookie
    const session = request.cookies.get('session');

    // 2. If no cookie exists, redirect to login
    if (!session) {
        const url = new URL('/login', request.url);
        // Remember where they were trying to go
        url.searchParams.set('next', request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    // 3. Allow them through
    return NextResponse.next();
}

// ✅ THIS IS THE MOST IMPORTANT PART
export const config = {
    matcher: [
        '/checkout/:path*',
        '/orders/:path*',
    ],
};