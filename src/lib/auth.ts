export const SESSION_COOKIE_NAME = "site_session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
export const SESSION_MAX_AGE_SECONDS = SESSION_DURATION_MS / 1000;

function toBase64Url(bytes: ArrayBuffer) {
  const arr = new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < arr.byteLength; i++) binary += String.fromCharCode(arr[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getKey() {
  const secret = process.env.mypasskey;
  if (!secret) throw new Error("mypasskey env var is not set");
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_DURATION_MS;
  const key = await getKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(String(expires)),
  );
  return `${expires}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  const [expiresStr, sig] = token.split(".");
  if (!expiresStr || !sig) return false;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const key = await getKey();
  const expectedSignature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(expiresStr),
  );
  const expectedSig = toBase64Url(expectedSignature);

  if (expectedSig.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expectedSig.length; i++) {
    diff |= expectedSig.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}
