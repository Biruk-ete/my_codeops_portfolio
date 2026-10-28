import { ImageResponse } from 'next/og';
import { db } from '@/lib/db';

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }) {
    const { id } = await params;

    const dish = await db.dish.findUnique({ where: { id } });

    if (!dish) {
        return new ImageResponse(
            <div style={{ fontSize: 48, color: 'black', background: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Dish Not Found
            </div>,
            { ...size }
        );
    }

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    backgroundColor: '#FFF1EB',
                    padding: '80px',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                    <span style={{ fontSize: 30, color: '#7A1401', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>
                        Mesob House
                    </span>
                    <span style={{ fontSize: 30, color: '#8C716B' }}>|</span>
                    <span style={{ fontSize: 30, color: '#8C716B' }}>Ethiopian Cuisine</span>
                </div>

                <h1 style={{ fontSize: '80px', color: '#221A16', margin: '0 0 20px 0', lineHeight: 1.1 }}>
                    {dish.name}
                </h1>

                <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                    <p style={{ fontSize: '48px', color: '#7A1401', fontWeight: 700, margin: 0 }}>
                        ETB {dish.price}
                    </p>
                    <p style={{ fontSize: '32px', color: '#58413D', margin: 0, maxWidth: '600px' }}>
                        {dish.tag}
                    </p>
                </div>

                <p style={{ fontSize: '28px', color: '#58413D', marginTop: '40px', maxWidth: '900px', lineHeight: 1.4 }}>
                    {dish.description}
                </p>
            </div>
        ),
        {
            ...size,
        }
    );
}