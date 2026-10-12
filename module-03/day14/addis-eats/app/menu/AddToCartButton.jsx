"use client";

import { useCart } from "../providers";

export default function AddToCartButton({ dish }) {
    const { addItem } = useCart();

    return (
        <button onClick={() => addItem(dish)}>
        Add {dish.name} to cart
        </button>
    );
}