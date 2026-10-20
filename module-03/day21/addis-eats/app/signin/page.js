"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SignInForm() {
  const [name, setName] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const next = searchParams.get("next") ?? "/";

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      if (!next.startsWith("/")) {
        router.push("/");
      } else {
        router.push(next);
      }
      router.refresh();
    } else {
      alert("Invalid login. Try 'Almaz'.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (try Almaz)" />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<p>Loading form...</p>}>
      <SignInForm />
    </Suspense>
  );
}