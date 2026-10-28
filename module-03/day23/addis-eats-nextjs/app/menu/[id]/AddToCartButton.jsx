'use client';

import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ dish }) {
    const { addToCart } = useCart();

    return (
        <button
            className="btn-add-large"
            onClick={() => addToCart(dish)}
            aria-label={`Add ${dish.name} to cart`}
        >
            + Add to Order
        </button>
    );
}