"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function Hub() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="relative h-screen w-screen">
      <button
        onClick={logout}
        className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-black/60"
      >
        <LogOut size={16} /> Log out
      </button>
      <div className="grid h-screen w-screen grid-cols-1 grid-rows-5 gap-5 sm:grid-cols-2 sm:grid-rows-3">
        <Button
          className="flex h-full text-5xl"
          onClick={() => router.push("/login")}
        >
          Fitness
        </Button>
        <Button
          className="flex h-full text-5xl"
          onClick={() => router.push("/dashboardv2")}
        >
          Potty
        </Button>
        <Button
          className="flex h-full text-5xl"
          onClick={() => router.push("/katie")}
        >
          Katie
        </Button>
        <Button
          className="flex h-full text-5xl"
          onClick={() => router.push("/noah")}
        >
          Noah
        </Button>
        <Button
          className="flex h-full text-5xl"
          onClick={() => router.push("/test")}
        >
          Test
        </Button>
      </div>
    </div>
  );
}
