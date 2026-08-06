import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { LoginGate } from "@/components/login-gate";
import { Hub } from "@/components/hub";

export default async function Page() {
  const cookieStore = await cookies();
  const authed = await verifySessionToken(
    cookieStore.get(SESSION_COOKIE_NAME)?.value,
  );

  return authed ? <Hub /> : <LoginGate />;
}
