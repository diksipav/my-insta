// Auth uses an httpOnly session cookie set by the API. The browser attaches it
// automatically to every /api/* request (proxied to the backend in next.config.ts),
// so there are no tokens to store or refresh here.

export type LoginState = { error: string | null };

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const emailOrUsername = String(formData.get("emailOrUsername") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!emailOrUsername || !password) {
    return { error: "Please enter your username or email, and password." };
  }

  let res: Response;
  try {
    res = await fetch("/api/auth/login", {
      method: "POST",
      // The API only accepts JSON on mutating requests (part of CSRF protection).
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrUsername, password }),
    });
  } catch {
    return { error: "Can't reach the server. Please try again." };
  }

  if (res.status === 401) {
    return { error: "Incorrect username or password." };
  }
  if (!res.ok) {
    return { error: "Something went wrong. Please try again." };
  }

  return { error: null };
}
