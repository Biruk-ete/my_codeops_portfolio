import React, { createContext, useContext, useReducer, useMemo } from 'react'
import { cartReducer } from './cartReducer'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] })
    
    const total = useMemo(() => {
        return state.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
    }, [state.items])
    
    const contextValue = useMemo(() => ({
        items: state.items,
        dispatch,
        total,
        addItem: (dish) => dispatch({ type: "add", dish }),
        removeItem: (id) => dispatch({ type: "remove", id }),
        clearCart: () => dispatch({ type: "clear" })
    }), [state.items, total])
    
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}