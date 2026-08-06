"use client";

import { useRouter } from "next/navigation";
import { Dumbbell, User } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-gradient-to-b from-gray-950 to-gray-900 px-4 py-16 text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
          <Dumbbell size={28} />
        </div>
        <h1 className="font-display text-3xl font-bold">Fitness App</h1>
        <p className="text-sm text-gray-400">Who&apos;s tracking today?</p>
      </div>

      <div className="grid w-full max-w-[420px] grid-cols-2 gap-4">
        <button
          onClick={() => router.push("/fitness/katie/home")}
          className="group flex flex-col items-center gap-3 rounded-2xl bg-gray-900 p-8 shadow-xl transition hover:-translate-y-1 hover:bg-gray-800 hover:shadow-2xl"
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-pink-500/15 text-pink-400 transition group-hover:bg-pink-500/25">
            <User size={28} />
          </div>
          <span className="text-lg font-semibold">Katie</span>
        </button>

        <button
          onClick={() => router.push("/fitness/noah/home")}
          className="group flex flex-col items-center gap-3 rounded-2xl bg-gray-900 p-8 shadow-xl transition hover:-translate-y-1 hover:bg-gray-800 hover:shadow-2xl"
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-blue-500/15 text-blue-400 transition group-hover:bg-blue-500/25">
            <User size={28} />
          </div>
          <span className="text-lg font-semibold">Noah</span>
        </button>
      </div>
    </div>
  );
}
