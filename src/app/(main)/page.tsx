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
    router.push(`/raspberrypi`);
  }
  function recipes() {
    router.push(`/recipes`);
  }
  function signup() {
    router.push(`/signup`);
  }
  function test() {
    router.push(`/test`);
  }

  return (
    <>
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
        <Button onClick={account}>account</Button>
        <Button onClick={fitness}>fitness</Button>
        <Button onClick={katie}>katie</Button>
        <Button onClick={login}>login</Button>
        <Button onClick={noah}>noah</Button>
        <Button onClick={notes}>notes</Button>
        <Button onClick={raspberrypi}>raspberrypi</Button>
        <Button onClick={recipes}>recipes</Button>
        <Button onClick={signup}>signup</Button>
        <Button onClick={test}>test</Button>
      </div>
    </>
  );
}
