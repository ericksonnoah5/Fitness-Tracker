import { NextResponse } from "next/server";
import webpush from "web-push";
import { createClient } from "@/lib/supabase/server";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function POST(request: Request) {
  const supabase = await createClient();
  const { title, body, url } = await request.json();

  const { data: subscriptions, error } = await supabase
    .from("push_subscriptions")
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const payload = JSON.stringify({ title, body, url });

  const results = await Promise.allSettled(
    (subscriptions ?? []).map((sub) =>
      webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth },
        },
        payload,
      ),
    ),
  );

  const expired = subscriptions?.filter((_sub, i) => {
    const result = results[i];
    return (
      result.status === "rejected" &&
      (result.reason?.statusCode === 404 || result.reason?.statusCode === 410)
    );
  });

  if (expired?.length) {
    await supabase
      .from("push_subscriptions")
      .delete()
      .in(
        "endpoint",
        expired.map((sub) => sub.endpoint),
      );
  }

  return NextResponse.json({ sent: results.length });
}
