import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { LogoutButton } from "./logout-button";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-4xl font-semibold italic tracking-tight">Instagram</h1>
      <p className="text-sm">
        Logged in as <span className="font-semibold">@{user.username}</span> ({user.email})
      </p>
      <LogoutButton />
    </main>
  );
}
