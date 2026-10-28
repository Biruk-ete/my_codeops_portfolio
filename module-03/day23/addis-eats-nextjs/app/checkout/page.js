'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { placeOrder } from '../actions';
import { useCart } from '@/context/CartContext';
import './CheckoutPage.css';

export default function CheckoutPage() {
    const [state, formAction, isPending] = useActionState(placeOrder, null);
    const router = useRouter();

    const { getTotal, cart, clearCart } = useCart();
    const grandTotal = getTotal() + 158;

    const [hasRedirected, setHasRedirected] = useState(false);

    useEffect(() => {
        if (state?.success && state?.orderId && state?.orderData && !hasRedirected) {
            setHasRedirected(true);
            clearCart();
            router.push(`/orders/${state.orderId}?data=${state.orderData}`);
        }
    }, [state, router, clearCart, hasRedirected]);

    return (
        <div className="checkout-wrapper">
            <h1 className="checkout-title">Delivery Details</h1>

            <div className="checkout-layout">
                <form action={formAction} className="checkout-form">
                    <input type="hidden" name="total" value={grandTotal} />

                    {state?.fieldErrors?.general && (
                        <p className="error-msg" role="alert" style={{ padding: '10px', background: '#fee2e2', borderRadius: '4px' }}>
                            {state.fieldErrors.general[0]}
                        </p>
                    )}

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                        {state?.fieldErrors?.name && <p className="error-msg" role="alert">{state.fieldErrors.name[0]}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        {/* Added inputMode="numeric" for the mobile keypad */}
                        <input type="tel" id="phone" name="phone" inputMode="numeric" required />
                        {state?.fieldErrors?.phone && <p className="error-msg" role="alert">{state.fieldErrors.phone[0]}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" required />
                        {state?.fieldErrors?.address && <p className="error-msg" role="alert">{state.fieldErrors.address[0]}</p>}
                    </div>

                    <button type="submit" disabled={isPending} className="btn-submit">
                        {isPending ? 'Placing Order...' : `Place Order • ETB ${grandTotal}`}
                    </button>
                </form>

                <div className="checkout-summary">
                    <h2>Order Summary</h2>
                    {cart.map(item => (
                        <div key={item.id} className="summary-item">
                            <span>{item.qty}x {item.name}</span>
                            <span>ETB {item.price * item.qty}</span>
                        </div>
                    ))}
                    <hr />
                    <div className="summary-item">
                        <span>Delivery Fee</span>
                        <span>ETB 158</span>
                    </div>
                    <div className="summary-total">
                        <span>Total:</span>
                        <span>ETB {grandTotal}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}