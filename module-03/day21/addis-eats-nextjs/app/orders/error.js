"use client";

export default function Error({ error, reset }) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong!</h2>
            <p className="text-gray-600 mb-4">We couldn't load your orders. Please try again.</p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Try again
            </button>
        </div>
    );
}