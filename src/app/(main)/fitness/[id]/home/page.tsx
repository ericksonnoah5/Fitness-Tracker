"use client";

import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function IdHomePage() {
  const [totalWeight, changeTotal] = useState("");
  const [weight, changeWeight] = useState("");
  const [addsomeWeight, doaddsomeweight] = useState("");
  const [inputs, setInputs] = useState<any[]>([]);
  var [averageWeight, setaverageWeight] = useState(null);

  const params = useParams();
  const username = params.id as string;

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

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 bg-gray-950 pt-20 text-white">
      <div className="flex w-80 flex-col gap-4 rounded-2xl bg-gray-900 p-8 shadow-xl">
        <h2 className="text-center text-2xl font-bold">
          {totalWeight}{" "}
          <span className="text-lg font-normal text-gray-400">
            calories left
          </span>
        </h2>

        <h2 className="text-center text-2xl font-bold">
          {weight}{" "}
          <span className="text-lg font-normal text-gray-400">lbs to go</span>
        </h2>
      </div>

      <div className="flex w-80 flex-col gap-2 rounded-2xl bg-gray-900 p-8 shadow-xl">
        <h3 className="mb-2 text-lg font-semibold">Today's Inputs</h3>
        <div className="rounded-lg bg-blue-700">
          <button onClick={postWeight}>Get Average {averageWeight}</button>
        </div>
        {inputs.map((item, i) => (
          <div
            key={i}
            className="flex justify-between border-b border-gray-800 py-2 text-sm text-gray-300"
          >
            <span>{item.calories} cal</span>

            <span className="text-gray-500">
              {new Date(item.created_at).toLocaleTimeString()}
            </span>
          </div>
        ))}

        <div className="flex justify-between pt-2 font-semibold">
          <span>Total</span>
          <span>
            {inputs.reduce((sum, item) => sum + Number(item.calories), 0)} cal
          </span>
        </div>
      </div>

      <div className="flex w-80 flex-col gap-4 rounded-2xl bg-gray-900 p-8 shadow-xl">
        <input
          type="text"
          value={addsomeWeight}
          onChange={(e) => doaddsomeweight(e.target.value)}
          placeholder="Add calories"
          className="rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addWeight}
          className="rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
