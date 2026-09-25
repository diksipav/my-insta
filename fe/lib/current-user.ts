import { cookies } from "next/headers";

// Server-only: for use in Server Components. Fetches on the Next.js server have
// no browser cookie jar, so the session cookie is forwarded by hand.

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export type User = {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  bio: string | null;
};

export async function getCurrentUser(): Promise<User | null> {
  const sid = (await cookies()).get("sid")?.value;
  if (!sid) {
    return null;
  }

  const res = await fetch(`${API_URL}/me`, {
    headers: { Cookie: `sid=${sid}` },
    cache: "no-store",
  });

  if (res.status === 401) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`GET /me failed with status ${res.status}`);
  }

  const data: { user: User } = await res.json();
  return data.user;
}
