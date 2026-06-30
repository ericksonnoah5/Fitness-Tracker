"use client";

import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function IdHomePage() {
  const [totalWeight, changeTotal] = useState("");
  const [weight, changeWeight] = useState("");
  const [addsomeWeight, doaddsomeweight] = useState("");
  const [inputs, setInputs] = useState<any[]>([]);

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
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center pt-20 gap-8">
      <div className="bg-gray-900 rounded-2xl p-8 w-80 flex flex-col gap-4 shadow-xl">
        <h2 className="text-2xl font-bold text-center">
          {totalWeight}{" "}
          <span className="text-gray-400 text-lg font-normal">
            calories left
          </span>
        </h2>

        <h2 className="text-2xl font-bold text-center">
          {weight}{" "}
          <span className="text-gray-400 text-lg font-normal">lbs to go</span>
        </h2>
      </div>

      <div className="bg-gray-900 rounded-2xl p-8 w-80 flex flex-col gap-2 shadow-xl">
        <h3 className="text-lg font-semibold mb-2">Today's Inputs</h3>

        {inputs.map((item, i) => (
          <div
            key={i}
            className="flex justify-between text-sm text-gray-300 border-b border-gray-800 py-2"
          >
            <span>{item.calories} cal</span>

            <span className="text-gray-500">
              {new Date(item.created_at).toLocaleTimeString()}
            </span>
          </div>
        ))}

        <div className="flex justify-between font-semibold pt-2">
          <span>Total</span>
          <span>
            {inputs.reduce((sum, item) => sum + Number(item.calories), 0)} cal
          </span>
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl p-8 w-80 flex flex-col gap-4 shadow-xl">
        <input
          type="text"
          value={addsomeWeight}
          onChange={(e) => doaddsomeweight(e.target.value)}
          placeholder="Add calories"
          className="bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addWeight}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
