"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock } from "lucide-react";

export function LoginGate() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!value || loading) return;
    setLoading(true);
    setError(false);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });

    if (response.ok) {
      router.refresh();
    } else {
      setError(true);
      setValue("");
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-gray-950 px-4 text-white">
      <Lock size={40} />
      <div className="flex w-full max-w-[400px] flex-col gap-4 rounded-2xl bg-gray-900 p-10 shadow-2xl">
        <h1 className="text-center text-2xl font-bold">Enter passkey</h1>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Passkey"
          className="rounded-lg bg-gray-700 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
          <p className="text-center text-sm text-red-400">
            Incorrect passkey
          </p>
        )}
        <button
          onClick={submit}
          disabled={loading}
          className="rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Checking…" : "Enter"}
        </button>
      </div>
    </div>
  );
}
