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
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-5">
        <Button className="h-[300px] w-[300px] text-4xl" onClick={fitness}>
          Fitness
        </Button>
        <Button className="h-[300px] w-[300px] text-4xl" onClick={dashboardv2}>
          Dashboardv2
        </Button>
        <Button className="h-[300px] w-[300px] text-4xl" onClick={katie}>
          Katie
        </Button>
        <Button className="h-[300px] w-[300px] text-4xl" onClick={noah}>
          Noah
        </Button>
        <Button className="h-[300px] w-[300px] text-4xl" onClick={notes}>
          Notes
        </Button>
        <Button className="h-[300px] w-[300px] text-4xl" onClick={raspberrypi}>
          Dashboard
        </Button>
        <Button className="h-[300px] w-[300px] text-4xl" onClick={recipes}>
          Recipes
        </Button>
        <Button className="h-[300px] w-[300px] text-4xl" onClick={test}>
          Test
        </Button>
      </div>
    </>
  );
}
