import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign up • Instagram",
};

export default async function SignupPage() {
  if (await getCurrentUser()) {
    redirect("/");
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <div className="border border-neutral-300 px-10 py-8 dark:border-neutral-700">
          <h1 className="mb-2 text-center text-4xl font-semibold italic tracking-tight">
            Instagram
          </h1>
          <p className="mb-6 text-center text-sm font-semibold text-neutral-500">
            Sign up to see photos and videos from your friends.
          </p>
          <SignupForm />
        </div>

        <div className="border border-neutral-300 py-5 text-center text-sm dark:border-neutral-700">
          Have an account?{" "}
          <Link href="/login" className="font-semibold text-sky-500">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
