import './CheckoutPage.css';

export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
    return (
        <div className="checkout-wrapper">
            <h1 className="checkout-title">Checkout</h1>
            <p className="checkout-desc">
                This page is dynamic because it depends on the request (user session).
            </p>
        </div>
    );
}