"use client";

import { useActionState } from "react";
import { placeOrder } from "../actions";

export default function CheckoutForm() {
    const [state, formAction, pending] = useActionState(placeOrder, null);

    return (
        <form action={formAction}>
        <input name="name" placeholder="Name" />
        {state?.fieldErrors?.name && <p role="alert">{state.fieldErrors.name[0]}</p>}

        <input name="phone" placeholder="Phone" />
        {state?.fieldErrors?.phone && <p role="alert">{state.fieldErrors.phone[0]}</p>}

        <input name="dishId" placeholder="Dish id" defaultValue="kitfo" />
        <input name="quantity" type="number" defaultValue="1" min="1" />
        {state?.fieldErrors?.quantity && <p role="alert">{state.fieldErrors.quantity[0]}</p>}

        <button disabled={pending}>
            {pending ? "Sending…" : "Place order"}
        </button>

        {state?.id && <p>Order placed: {state.id}</p>}
        </form>
    );
}