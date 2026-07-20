"use client";

import { supabase } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const CENTRAL_TIME_ZONE = "America/Chicago";

export default function DashboardV2Page() {
  const [currenttime, setcurrenttime] = useState<Date>();
  const [poopnumber, setpoopnumber] = useState(Number);
  const [peenumber, setpeenumber] = useState(Number);
  const [lastpoop, setlastpoop] = useState<Date>();
  const [lastpee, setlastpee] = useState<Date>();
  const [peeandpoop, setpeeandpoop] = useState(Number);
  const [accidents, setaccidents] = useState(Number);
  const [nextpoop, setnextpoop] = useState(Number);
  const [nextpee, setnextpee] = useState(Number);

  const currenttimeRef = useRef<Date>();
  const lastpoopRef = useRef<Date>();
  const lastpeeRef = useRef<Date>();

  function updateCurrentTime(time: Date) {
    currenttimeRef.current = time;
    setcurrenttime(time);
  }
  function updateLastPoop(time: Date) {
    lastpoopRef.current = time;
    setlastpoop(time);
  }
  function updateLastPee(time: Date) {
    lastpeeRef.current = time;
    setlastpee(time);
  }

  async function start() {
    const time = new Date();
    updateCurrentTime(time);
    await getPoopTime();
    await getPeetime();
    await getAccidents();
    await getTimes();
    await getPoop();
    await getPee();
    lastpoopt();
    lastpeep();
  }

  useEffect(() => {
    start();

    const gettime = setInterval(() => {
      updateCurrentTime(new Date());
      lastpoopt();
      lastpeep();
    }, 1000);

    return () => clearInterval(gettime);
  }, []);

  function lastpoopt() {
    if (lastpoopRef.current != null && currenttimeRef.current != null) {
      const npoop =
        currenttimeRef.current.getTime() - lastpoopRef.current.getTime();
      setnextpoop(npoop);
    }
  }
  function lastpeep() {
    if (lastpeeRef.current != null && currenttimeRef.current != null) {
      const npee =
        currenttimeRef.current.getTime() - lastpeeRef.current.getTime();
      setnextpee(npee);
    }
  }

  function formatElapsed(ms: number) {
    if (ms < 0) return null;
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m ago`;
    if (minutes > 0) return `${minutes}m ${seconds}s ago`;
    return `${seconds}s ago`;
  }

  async function getPoopTime() {
    const { data: pooptime } = await supabase
      .from("PottyTime")
      .select("time")
      .eq('"poop times"', 1)
      .order("time", { ascending: false })
      .limit(1)
      .single();

    if (pooptime) {
      updateLastPoop(new Date(pooptime.time));
    }
  }
  async function getPeetime() {
    const { data: peetime } = await supabase
      .from("PottyTime")
      .select("time")
      .eq('"pee times"', 1)
      .order("time", { ascending: false })
      .limit(1)
      .single();

    if (peetime) {
      updateLastPee(new Date(peetime.time));
    }
  }

  async function getAccidents() {
    const { data: hasaccidents } = await supabase
      .from("PottyTime")
      .select("accident")
      .eq("accident", 1);

    if (hasaccidents) {
      setaccidents(hasaccidents.length);
    }
  }

  async function getTimes() {
    const { data: thetimes } = await supabase
      .from("PottyTime")
      .select('"poop times", "pee times"')
      .or('"pee times".eq.1,"poop times".eq.1');

    if (thetimes) {
      setpeeandpoop(thetimes.length);
    }
  }

  async function getPoop() {
    const { data: thetimes } = await supabase
      .from("PottyTime")
      .select('"poop times"')
      .eq('"poop times"', 1);

    if (thetimes) {
      setpoopnumber(thetimes.length);
    }
  }

  async function getPee() {
    const { data: thetimes } = await supabase
      .from("PottyTime")
      .select('"pee times"')
      .eq('"pee times"', 1);

    if (thetimes) {
      setpeenumber(thetimes.length);
    }
  }

  async function setpoopdata() {
    if (currenttime != null) {
      const { data, error } = await supabase.from("PottyTime").insert({
        time: currenttime.toISOString(),
        "poop times": 1,
      });
    }
    await getPoop();
    await getTimes();
    await getPoopTime();
  }

  async function setpeedata() {
    if (currenttime != null) {
      const { data, error } = await supabase.from("PottyTime").insert({
        time: currenttime.toISOString(),
        "pee times": 1,
      });
    }
    await getPee();
    await getTimes();
    await getPeetime();
  }

  async function setaccidentdata() {
    if (currenttime != null) {
      const { data, error } = await supabase.from("PottyTime").insert({
        time: currenttime.toISOString(),
        accident: 1,
      });
    }
    await getAccidents();
  }

  return (
    <>
      <h1 className="flex h-full items-center justify-center p-10 text-3xl">
        Doggy potty dash
      </h1>
      <div className="grid h-screen w-screen grid-cols-2 grid-rows-6 sm:grid-cols-4">
        <h1 className="flex h-full items-center justify-center text-3xl">
          Poops: {poopnumber}
        </h1>
        <Button
          className="flex h-full items-center justify-center text-3xl"
          onClick={setpoopdata}
        >
          poop
        </Button>
        <h1 className="flex h-full items-center justify-center text-3xl">
          {lastpoop
            ? lastpoop.toLocaleTimeString("en-US", {
                timeZone: CENTRAL_TIME_ZONE,
              })
            : null}
        </h1>
        <h1 className="flex h-full items-center justify-center text-3xl">
          Last poop: {formatElapsed(nextpoop)}
        </h1>

        <h1 className="flex h-full items-center justify-center text-3xl">
          Pees: {peenumber}
        </h1>
        <Button
          className="flex h-full items-center justify-center text-3xl"
          onClick={setpeedata}
        >
          pee
        </Button>
        <h1 className="flex h-full items-center justify-center text-3xl">
          {lastpee
            ? lastpee.toLocaleTimeString("en-US", {
                timeZone: CENTRAL_TIME_ZONE,
              })
            : null}
        </h1>
        <h1 className="flex h-full items-center justify-center text-3xl">
          Last pee: {formatElapsed(nextpee)}
        </h1>

        <h1 className="flex h-full items-center justify-center text-3xl">
          Accidents: {accidents}
        </h1>
        <Button
          className="flex h-full items-center justify-center text-3xl"
          onClick={setaccidentdata}
        >
          accident
        </Button>
        <h1 className="flex h-full items-center justify-center text-3xl">
          {currenttime
            ? currenttime.toLocaleTimeString("en-US", {
                timeZone: CENTRAL_TIME_ZONE,
              })
            : null}
        </h1>
        <h1 className="flex h-full items-center justify-center text-3xl">
          Total: {peeandpoop}
        </h1>
      </div>
    </>
  );
}
