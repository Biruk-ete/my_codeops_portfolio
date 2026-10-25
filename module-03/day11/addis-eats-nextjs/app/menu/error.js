'use client';

export default function Error({ reset }) {
    return (
        <div style={{ padding: '60px', textAlign: 'center' }}>
            <h2>Something went wrong loading the menu!</h2>
            <button onClick={() => reset()} style={{ marginTop: '16px', padding: '8px 16px' }}>
                Try again
            </button>
        </div>
    );
}