import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in • Instagram",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <div className="border border-neutral-300 px-10 py-8 dark:border-neutral-700">
          <h1 className="mb-8 text-center text-4xl font-semibold italic tracking-tight">
            Instagram
          </h1>
          <LoginForm />
        </div>

        <div className="border border-neutral-300 py-5 text-center text-sm dark:border-neutral-700">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-sky-500">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
