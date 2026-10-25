'use client';

import { useActionState } from 'react';
import { placeOrder } from '../actions';
import './CheckoutPage.css';

export default function CheckoutPage() {
    const [state, formAction, isPending] = useActionState(placeOrder, null);

    return (
        <div className="checkout-wrapper">
            <h1 className="checkout-title">Delivery Details</h1>

            <form action={formAction} className="checkout-form">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" />
                    {state?.fieldErrors?.name && <p className="error-msg">{state.fieldErrors.name[0]}</p>}
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" />
                    {state?.fieldErrors?.phone && <p className="error-msg">{state.fieldErrors.phone[0]}</p>}
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" />
                    {state?.fieldErrors?.address && <p className="error-msg">{state.fieldErrors.address[0]}</p>}
                </div>

                <button type="submit" disabled={isPending} className="btn-submit">
                    {isPending ? 'Placing Order...' : 'Place Order'}
                </button>

                {state?.success && <p className="success-msg">{state.message}</p>}
            </form>
        </div>
    );
}