"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function IdHomePage() {
  const [totalWeight, changeTotal] = useState("");
  const [weight, changeWeight] = useState("");
  const [addsomeWeight, doaddsomeweight] = useState("");
  async function addWeight() {}

  return (
    <div>
      <h2>total cal</h2>
      <h2>weight</h2>
      <input
        type="text"
        value={addsomeWeight}
        onChange={(e) => doaddsomeweight(e.target.value)}
        placeholder="Add"
      />
      <button onClick={addWeight}>Add</button>
    </div>
  );
}
