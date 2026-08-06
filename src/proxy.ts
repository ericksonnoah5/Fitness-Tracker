import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

// Everything else (root "/", /api/login, and static assets under /public)
// stays reachable without a session so the login gate itself can load.
const PROTECTED_PREFIXES = [
  "/account",
  "/login",
  "/signup",
  "/fitness",
  "/notes",
  "/recipes",
  "/test",
  "/katie",
  "/noah",
  "/dashboard",
  "/api/weight",
  "/api/push",
  "/api/verify-passkey",
  "/api/test",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const authed = await verifySessionToken(token);

  if (!authed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
