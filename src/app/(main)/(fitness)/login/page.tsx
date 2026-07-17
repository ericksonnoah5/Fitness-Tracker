"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const [Username, setusername] = useState("");
  const [Password, setpassword] = useState("");

  async function submit() {
    const { data, error } = await supabase
      .from("Users")
      .select("id")
      .eq("Username", Username)
      .eq("Password", Password);
    console.log(data, error);
    if (data && data.length > 0) {
      router.push(`/fitness/${Username}/home`);
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-950">
      <div className="flex p-14 text-3xl text-white">
        Fitness App&nbsp;&nbsp; <Dumbbell></Dumbbell>
      </div>
      <div className="flex w-[400px] flex-col justify-center gap-4 rounded-2xl bg-gray-900 p-12 shadow-2xl sm:w-[500px]">
        <h1 className="text-center text-3xl font-bold text-white">Login</h1>
        <input
          type="text"
          value={Username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="Username"
          className="rounded-lg bg-gray-700 px-4 py-3 text-white placeholder-gray-400 outline-none hover:bg-gray-800 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={Password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
          className="rounded-lg bg-gray-700 px-4 py-3 text-white placeholder-gray-400 outline-none hover:bg-gray-800 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={submit}
          className="rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
