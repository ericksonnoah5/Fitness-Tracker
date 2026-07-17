"use client";

import { supabase } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const CENTRAL_TIME_ZONE = "America/Chicago";

export default function DashboardV2Page() {
  const [now, setNow] = useState<Date>();

  const [current, getcurrent] = useState<Date>();

  const [number, setnumber] = useState(Number);

  async function start() {
    const time = new Date();
    await setNow(time);
    await setDatadate(time);
    await getTimes();
  }

  useEffect(() => {
    getDatadate();
    getTimes();
    const gettime = setInterval(() => {
      getcurrent(new Date());
      getTimes();
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
      times: 1,
    });
  }

  async function getTimes() {
    const { data: thetimes } = await supabase
      .from("PottyTime")
      .select("times")
      .eq("times", 1);

    if (thetimes != null) {
      setnumber(thetimes.length);
    }
  }

  return (
    <>
      <h1 className="flex h-full items-center justify-center p-10 text-3xl">
        Doggy potty dash
      </h1>
      <div className="grid h-screen w-screen grid-cols-2 grid-rows-4 sm:grid-cols-4">
        <h1 className="flex h-full items-center justify-center text-3xl">
          Poops: {number}
        </h1>
        <Button
          className="flex h-full items-center justify-center text-3xl"
          onClick={start}
        >
          poop
        </Button>
        <h1 className="flex h-full items-center justify-center text-3xl">
          {now
            ? now.toLocaleTimeString("en-US", { timeZone: CENTRAL_TIME_ZONE })
            : null}
        </h1>
        <h1 className="flex h-full items-center justify-center text-3xl">
          {current
            ? current.toLocaleTimeString("en-US", {
                timeZone: CENTRAL_TIME_ZONE,
              })
            : null}
        </h1>
        <h1 className="flex h-full items-center justify-center text-3xl">
          Pees: {number}
        </h1>
        <Button
          className="flex h-full items-center justify-center text-3xl"
          onClick={start}
        >
          pee
        </Button>
        <h1 className="flex h-full items-center justify-center text-3xl">
          00:00 pm
        </h1>
        <h1 className="flex h-full items-center justify-center text-3xl">
          Total:
        </h1>
        <h1 className="flex h-full items-center justify-center text-3xl">
          Accidents: 0
        </h1>
        <Button
          className="flex h-full items-center justify-center text-3xl"
          onClick={start}
        >
          accident
        </Button>
        <h1 className="flex h-full items-center justify-center text-3xl">
          Next poop: 00:00
        </h1>
        <h1 className="flex h-full items-center justify-center text-3xl">
          Next pee: 00:00
        </h1>
      </div>
    </>
  );
}
