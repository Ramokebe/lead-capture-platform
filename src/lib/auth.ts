import { SignJWT, jwtVerify } from "jose";
import { createHash, timingSafeEqual } from "crypto";

function getSecret(): Uint8Array {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD not set");
  return new TextEncoder().encode(
    createHash("sha256").update(password).digest("hex")
  );
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export function verifyPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const inputBuf = Buffer.from(input);
  const passwordBuf = Buffer.from(password);

  if (inputBuf.length !== passwordBuf.length) return false;
  return timingSafeEqual(inputBuf, passwordBuf);
}
