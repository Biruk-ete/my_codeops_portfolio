'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Load from localStorage on first mount
    useEffect(() => {
        const saved = localStorage.getItem('mesob-cart');
        if (saved) setCart(JSON.parse(saved));
    }, []);

    // Save to localStorage on every change
    useEffect(() => {
        localStorage.setItem('mesob-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (dish) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === dish.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { ...dish, qty: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('mesob-cart');
    };

    const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const getTotalItems = () => cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);