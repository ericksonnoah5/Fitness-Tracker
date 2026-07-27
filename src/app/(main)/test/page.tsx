"use client";

import NotificationSettings from "@/components/notification-settings";
import PhotoUpload from "@/components/photo-upload";
import { Button } from "@/components/ui/button";

export default function Page() {
  async function sendTestNotification() {
    await fetch("/api/push/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test notification",
        body: "It works!",
        url: "/",
      }),
    });
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">Notifications</h2>
        <NotificationSettings />
        <Button variant="outline" onClick={sendTestNotification}>
          Send test notification
        </Button>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">Photos</h2>
        <PhotoUpload />
      </section>
    </div>
  );
}
