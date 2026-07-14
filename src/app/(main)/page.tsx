"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();

  function account() {
    router.push(`/account`);
  }
  function fitness() {
    router.push(`/login`);
  }
  function katie() {
    router.push(`/katie`);
  }
  function login() {
    router.push(`/login`);
  }
  function noah() {
    router.push(`/noah`);
  }
  function notes() {
    router.push(`/notes`);
  }
  function raspberrypi() {
    router.push(`/dashboard`);
  }
  function recipes() {
    router.push(`/recipes`);
  }
  function signup() {
    router.push(`/signup`);
  }
  function dashboardv2() {
    router.push(`/dashboardv2`);
  }
  function test() {
    router.push(`/test`);
  }

  return (
    <>
      <div className="grid h-screen w-screen grid-cols-1 grid-rows-4 gap-5 sm:grid-cols-2">
        <Button className="flex h-full text-5xl" onClick={fitness}>
          Fitness
        </Button>
        <Button className="flex h-full text-5xl" onClick={dashboardv2}>
          Dashboardv2
        </Button>
        <Button className="flex h-full text-5xl" onClick={katie}>
          Katie
        </Button>
        <Button className="flex h-full text-5xl" onClick={noah}>
          Noah
        </Button>
        <Button className="flex h-full text-5xl" onClick={notes}>
          Notes
        </Button>
        <Button className="flex h-full text-5xl" onClick={raspberrypi}>
          Dashboard
        </Button>
        <Button className="flex h-full text-5xl" onClick={recipes}>
          Recipes
        </Button>
        <Button className="flex h-full text-5xl" onClick={test}>
          Test
        </Button>
      </div>
    </>
  );
}
