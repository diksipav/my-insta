"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { logout } from "@/lib/auth";

export function LogoutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await logout();
          router.push("/login");
          router.refresh();
        })
      }
      className="rounded-lg border border-neutral-300 px-4 py-1.5 text-sm font-semibold hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-900"
    >
      {pending ? "Logging out..." : "Log out"}
    </button>
  );
}
