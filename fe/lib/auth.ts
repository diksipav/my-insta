// Auth uses an httpOnly session cookie set by the API. The browser attaches it
// automatically to every /api/* request (proxied to the backend in next.config.ts),
// so there are no tokens to store or refresh here.

// Submitted values are returned so the form can show them again after an error
// (React resets forms after an action). Passwords are never sent back.
export type LoginState = { error: string | null; emailOrUsername?: string };
export type SignupState = { error: string | null; email?: string; username?: string };

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const emailOrUsername = String(formData.get("emailOrUsername") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!emailOrUsername || !password) {
    return { error: "Please enter your username or email, and password.", emailOrUsername };
  }

  const error = await postJson("/api/auth/login", { emailOrUsername, password });
  return { error, emailOrUsername };
}

export async function signup(_prevState: SignupState, formData: FormData): Promise<SignupState> {
  const email = String(formData.get("email") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !username || !password) {
    return { error: "Please fill in all fields.", email, username };
  }

  const error = await postJson("/api/auth/register", { email, username, password });
  return { error, email, username };
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
}

// Returns null on success, or a message to show the user.
async function postJson(path: string, body: unknown): Promise<string | null> {
  let res: Response;
  try {
    res = await fetch(path, {
      method: "POST",
      // The API only accepts JSON on mutating requests (part of CSRF protection).
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return "Can't reach the server. Please try again.";
  }

  if (res.ok) {
    return null;
  }

  // 4xx responses carry a message meant for the user, e.g. "This username isn't available."
  if (res.status >= 400 && res.status < 500) {
    const data: { error?: string } | null = await res.json().catch(() => null);
    if (data?.error) {
      return data.error;
    }
  }
  return "Something went wrong. Please try again.";
}
