import argon2 from "argon2";

export function hashPassword(password: string) {
  return argon2.hash(password, { type: argon2.argon2id });
}

export function verifyPassword(hash: string, password: string) {
  return argon2.verify(hash, password);
}

// Used when no user matches, so a failed login takes the same time whether or
// not the account exists (prevents finding valid usernames/emails by timing).
// Known email + wrong password, vs
// Unknown email + any password (we don't want to fail fast here,
// as attackers will quickly find this email doesn't exist)
const dummyHash = hashPassword("dummy-password-for-timing");

export async function verifyDummyPassword(password: string) {
  await argon2.verify(await dummyHash, password);
  return false;
}
