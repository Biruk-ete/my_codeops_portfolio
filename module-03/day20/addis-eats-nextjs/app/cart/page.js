'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import './CartPage.css';

export default function CartPage() {
    const { cart, removeFromCart, getTotal } = useCart();

    return (
        <div className="cart-wrapper">
            <h1 className="cart-title">Your Gursha Basket</h1>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your basket is empty.</p>
                    <Link href="/menu" className="btn-primary">Explore the Menu</Link>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>Qty: {item.qty}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <span>ETB {item.price * item.qty}</span>
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Total: ETB {getTotal()}</h2>
                        <Link href="/checkout" className="btn-checkout">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}