"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { type SignupState, signup } from "@/lib/auth";

const initialState: SignupState = { error: null };

export function SignupForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    async (prevState: SignupState, formData: FormData) => {
      const result = await signup(prevState, formData);
      // The API logs the new user in right away, so go straight to the app.
      if (!result.error) router.push("/");
      return result;
    },
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Email"
        defaultValue={state.email}
        required
        className="rounded border border-neutral-300 bg-neutral-50 px-2 py-2 text-sm outline-none focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900"
      />
      <input
        name="username"
        type="text"
        autoComplete="username"
        placeholder="Username"
        defaultValue={state.username}
        required
        maxLength={30}
        className="rounded border border-neutral-300 bg-neutral-50 px-2 py-2 text-sm outline-none focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900"
      />
      <input
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="Password (at least 8 characters)"
        required
        minLength={8}
        className="rounded border border-neutral-300 bg-neutral-50 px-2 py-2 text-sm outline-none focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900"
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-sky-500 py-1.5 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60"
      >
        {pending ? "Signing up..." : "Sign up"}
      </button>

      <p aria-live="polite" className="min-h-5 text-center text-sm text-red-500">
        {state.error}
      </p>
    </form>
  );
}
