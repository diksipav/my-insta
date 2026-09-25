"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { type LoginState, login } from "@/lib/auth";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    async (prevState: LoginState, formData: FormData) => {
      const result = await login(prevState, formData);
      if (!result.error) router.push("/");
      return result;
    },
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input
        name="emailOrUsername"
        type="text"
        autoComplete="username"
        placeholder="Username or email"
        required
        className="rounded border border-neutral-300 bg-neutral-50 px-2 py-2 text-sm outline-none focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900"
      />
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Password"
        required
        className="rounded border border-neutral-300 bg-neutral-50 px-2 py-2 text-sm outline-none focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900"
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-sky-500 py-1.5 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60"
      >
        {pending ? "Logging in..." : "Log in"}
      </button>

      <p aria-live="polite" className="min-h-5 text-center text-sm text-red-500">
        {state.error}
      </p>
    </form>
  );
}
