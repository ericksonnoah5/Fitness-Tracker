"use client";

import { supabase } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const CENTRAL_TIME_ZONE = "America/Chicago";

export default function DashboardV2Page() {
  const [now, setNow] = useState<Date>();

  const [current, getcurrent] = useState<Date>();

  function start() {
    const time = new Date();
    setNow(time);
    setDatadate(time);
  }

  useEffect(() => {
    getDatadate();
    const gettime = setInterval(() => {
      getcurrent(new Date());
    }, 1000);

    return () => clearInterval(gettime);
  }, []);

  async function getDatadate() {
    const { data: pooptime } = await supabase
      .from("PottyTime")
      .select("time")
      .order("time", { ascending: false })
      .limit(1)
      .single();

    if (pooptime) {
      setNow(new Date(pooptime.time));
    }
  }

  async function setDatadate(time: Date) {
    const { error } = await supabase.from("PottyTime").insert({
      time: time.toISOString(),
    });
  }

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
