"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      router.push(`/user/${Username}/Home`);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-xl flex flex-col gap-4 w-80">
        <h1 className="text-white text-3xl font-bold text-center">Login</h1>
        <input
          type="text"
          value={Username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="Username"
          className="bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={Password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
          className="bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={submit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
