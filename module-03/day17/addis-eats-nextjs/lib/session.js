import { cookies } from 'next/headers';

const users = [
    { id: 'user_1', name: 'Abebe Bikila', email: 'abebe@example.com', password: 'password123', role: 'customer' },
    { id: 'user_2', name: 'Chef Yohanis', email: 'chef@example.com', password: 'password123', role: 'staff' }
];

export async function createSession(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return null;

    const sessionToken = JSON.stringify({ id: user.id, role: user.role });

    (await cookies()).set('session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });

    return user;
}

export async function getSession() {
    const sessionCookie = (await cookies()).get('session')?.value;
    if (!sessionCookie) return null;

    try {
        const sessionData = JSON.parse(sessionCookie);
        const user = users.find(u => u.id === sessionData.id);
        return user || null;
    } catch {
        return null;
    }
}

export async function destroySession() {
    (await cookies()).delete('session');
}