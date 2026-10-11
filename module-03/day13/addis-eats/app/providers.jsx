"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function useCart() {
    return useContext(CartContext);
    }

    function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    function addItem(item) {
        setItems((prev) => [...prev, item]);
    }

    return (
        <CartContext.Provider value={{ items, addItem }}>
        {children}
        </CartContext.Provider>
    );
    }

    export function Providers({ children }) {
    return <CartProvider>{children}</CartProvider>;
}