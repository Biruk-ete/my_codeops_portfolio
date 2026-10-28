import { NextResponse } from 'next/server';

export function middleware(request) {
    const session = request.cookies.get('session');

    if (!session) {
        const url = new URL('/login', request.url);
        // Remember where they were trying to go
        url.searchParams.set('next', request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/checkout/:path*',
        '/orders/:path*',
    ],
};