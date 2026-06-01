"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [Username, setusername] = useState("");
  const [Password, setpassword] = useState("");

  async function submit() {
    const { data } = await supabase
      .from("Users")
      .select("id")
      .eq("Username", Username)
      .eq("Password", Password);

    if (data && data.length > 0) {
      router.push(`/user/${Username}/Home`);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div>
        <h1>Login</h1>
        <input
          type="text"
          value={Username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={Password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}
