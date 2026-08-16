"use client";

import { supabase } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PaperBag } from "lucide-react";
import { OctagonX } from "lucide-react";
import { Dog } from "lucide-react";
import { AlarmClock } from "lucide-react";

import { Droplets } from "lucide-react";

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
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
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
    <div className="font-bold text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 h-full w-full object-cover"
      >
        <source src="../../atlas.mp4" type="video/mp4" />
      </video>
      <div className="h-full rounded-3xl bg-black bg-black/60 font-sans tracking-wide backdrop-blur-md">
        <div className="h-full rounded-2xl bg-black/60 p-4">
          <h1 className="flex h-full items-center justify-center text-wrap p-10 text-center text-5xl">
            <Dog className="!h-12 !w-12"></Dog> Doggy potty dash
          </h1>
        </div>
        <div className="grid h-[600px] h-full w-screen grid-cols-1 sm:grid-cols-4">
          <h1 className="m-2 flex hidden h-full items-center justify-center p-5 text-3xl sm:block sm:text-center">
            Poos {poopnumber}
          </h1>
          <Button
            className="m-2 flex h-full items-center justify-center p-5 text-3xl"
            onClick={setpoopdata}
          >
            <PaperBag className="!h-10 !w-10"></PaperBag> Poop
          </Button>
          <h1 className="m-2 flex h-full items-center justify-center p-5 text-3xl">
            {lastpoop
              ? lastpoop.toLocaleTimeString("en-US", {
                  timeZone: CENTRAL_TIME_ZONE,
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
              : null}
          </h1>
          <h1 className="m-2 flex h-full items-center justify-center gap-3 p-5 text-center text-3xl">
            <AlarmClock className="h-10 w-10"></AlarmClock>
            {formatElapsed(nextpoop)}
          </h1>
          <div className="block text-center sm:hidden">
            ________________________________________
          </div>

          <h1 className="m-2 flex hidden h-full items-center justify-center p-5 text-3xl sm:block sm:text-center">
            Pees: {peenumber}
          </h1>
          <Button
            className="m-2 flex h-full items-center justify-center p-5 text-3xl"
            onClick={setpeedata}
          >
            <Droplets className="!h-10 !w-10"></Droplets> Pee
          </Button>
          <h1 className="m-2 flex h-full items-center justify-center p-5 text-3xl">
            {lastpee
              ? lastpee.toLocaleTimeString("en-US", {
                  timeZone: CENTRAL_TIME_ZONE,
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
              : null}
          </h1>
          <h1 className="m-2 flex h-full items-center justify-center gap-3 p-5 text-center text-3xl">
            <AlarmClock className="h-10 w-10"></AlarmClock>
            {formatElapsed(nextpee)}
          </h1>
          <div className="block text-center sm:hidden">
            _______________________________________
          </div>

          <h1 className="m-2 flex hidden h-full items-center justify-center p-5 text-3xl sm:block sm:text-center">
            Accidents: {accidents}
          </h1>
          <Button
            className="m-2 flex h-full items-center justify-center p-5 text-3xl"
            onClick={setaccidentdata}
          >
            <OctagonX className="!h-10 !w-10"></OctagonX>Accident
          </Button>
          <h1 className="m-2 flex hidden h-full items-center justify-center p-5 text-3xl sm:block sm:text-center">
            {currenttime
              ? currenttime.toLocaleTimeString("en-US", {
                  timeZone: CENTRAL_TIME_ZONE,
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
              : null}
          </h1>
          <h1 className="m-2 flex h-full items-center justify-center p-5 text-3xl">
            <Image
              src="/atlas.jpg"
              alt="Atlas"
              width={200}
              height={100}
            ></Image>
          </h1>
        </div>
      </div>
    </div>
  );
}
