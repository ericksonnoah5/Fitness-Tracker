"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const CENTRAL_TIME_ZONE = "America/Chicago";

export default function DashboardV2Page() {
  const [now, setNow] = useState<Date>();

  const [current, getcurrent] = useState<Date>();
  function start() {
    setNow(new Date());
  }

  const gettime: ReturnType<typeof setInterval> = setInterval(() => {
    getcurrent(new Date());
  }, 1000);

  return (
    <>
      <div className="grid h-screen w-screen grid-cols-3 grid-rows-4">
        <Button className="h-full items-center text-3xl" onClick={start}>
          potty
        </Button>
        <h1 className="flex h-full items-center text-3xl">
          {now
            ? now.toLocaleTimeString("en-US", { timeZone: CENTRAL_TIME_ZONE })
            : null}
        </h1>
        <h1 className="flex h-full items-center text-3xl">
          {current
            ? current.toLocaleTimeString("en-US", {
                timeZone: CENTRAL_TIME_ZONE,
              })
            : null}
        </h1>
      </div>
    </>
  );
}
