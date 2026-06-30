"use client";
import { useRouter } from "next/navigation";

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
  function home() {
    router.push(`/`);
  }

  return (
    <>
      <button onClick={account}>account-</button>
      <button onClick={fitness}>fitness- </button>
      <button onClick={katie}>katie- </button>
      <button onClick={login}>login- </button>
      <button onClick={noah}>noah- </button>
      <button onClick={notes}>notes- </button>
      <button onClick={raspberrypi}>raspberrypi- </button>
      <button onClick={recipes}>recipes- </button>
      <button onClick={signup}>signup- </button>
      <button onClick={home}>home- </button>
    </>
  );
}
