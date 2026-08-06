"use client";

import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Flame, Scale, Plus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UsernameHomePage() {
  const router = useRouter();
  const [totalWeight, changeTotal] = useState("");
  const [weight, changeWeight] = useState("");
  const [addsomeWeight, doaddsomeweight] = useState("");
  const [inputs, setInputs] = useState<any[]>([]);
  var [averageWeight, setaverageWeight] = useState(null);

  const params = useParams();
  const username = params.username as string;
  const displayName = username
    ? username.charAt(0).toUpperCase() + username.slice(1)
    : "";

  useEffect(() => {
    if (username) {
      myFunction();
    }
  }, [username]);

  async function myFunction() {
    const { data } = await supabase
      .from("Weight")
      .select("Total_Cal")
      .eq("Username", username)
      .single();

    changeTotal(String(data?.Total_Cal ?? 0));

    const num = (data?.Total_Cal ?? 0) / 3500;
    changeWeight(String(Math.round(num)));

    const now = new Date();

    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );

    const tomorrowStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
      0,
    );

    const { data: inputData, error } = await supabase
      .from("Input")
      .select("calories, created_at")
      .eq("Username", username)
      .gte("created_at", todayStart.toISOString())
      .lt("created_at", tomorrowStart.toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    }

    setInputs(inputData ?? []);
  }

  async function postWeight() {
    const response = await fetch("/api/weight", {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
    });
    const data = await response.json();
    setaverageWeight(data);
    console.log(data);
  }

  async function addWeight() {
    if (!addsomeWeight) return;

    const { data: userData } = await supabase
      .from("Users")
      .select("id")
      .eq("Username", username)
      .single();

    if (!userData) return;

    const { error } = await supabase.from("Input").insert({
      calories: Number(addsomeWeight),
      user_id: userData.id,
      Username: username,
    });

    if (error) {
      console.log(error);
      return;
    }

    const { data: weightData } = await supabase
      .from("Weight")
      .select("Total_Cal")
      .eq("user_id", userData.id)
      .single();

    await supabase
      .from("Weight")
      .update({
        Total_Cal: (weightData?.Total_Cal ?? 0) + Number(addsomeWeight),
      })
      .eq("user_id", userData.id);

    doaddsomeweight("");
    myFunction();
  }

  const todayTotal = inputs.reduce(
    (sum, item) => sum + Number(item.calories),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-950 px-4 pb-16 pt-10 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/login")}
            className="flex size-9 items-center justify-center rounded-full bg-gray-900 text-gray-400 transition hover:bg-gray-800 hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-display text-2xl font-bold">
            Hey {displayName}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-gray-900 p-6 text-center shadow-xl">
            <div className="flex size-10 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
              <Flame size={20} />
            </div>
            <p className="text-2xl font-bold">{totalWeight}</p>
            <p className="text-xs text-gray-400">calories left</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-gray-900 p-6 text-center shadow-xl">
            <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
              <Scale size={20} />
            </div>
            <p className="text-2xl font-bold">{weight}</p>
            <p className="text-xs text-gray-400">lbs to go</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-gray-900 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Today&apos;s Inputs</h3>
            <button
              onClick={postWeight}
              className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold transition hover:bg-blue-700"
            >
              Get Average {averageWeight ?? ""}
            </button>
          </div>

          {inputs.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-500">
              Nothing logged yet today.
            </p>
          ) : (
            <div className="flex flex-col">
              {inputs.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-gray-800 py-2 text-sm text-gray-300 last:border-none"
                >
                  <span>{item.calories} cal</span>
                  <span className="text-gray-500">
                    {new Date(item.created_at).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between border-t border-gray-800 pt-3 font-semibold">
            <span>Total</span>
            <span>{todayTotal} cal</span>
          </div>
        </div>

        <div className="flex gap-3 rounded-2xl bg-gray-900 p-4 shadow-xl">
          <input
            type="text"
            value={addsomeWeight}
            onChange={(e) => doaddsomeweight(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addWeight()}
            placeholder="Add calories"
            className="flex-1 rounded-xl bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addWeight}
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 transition hover:bg-blue-700"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
