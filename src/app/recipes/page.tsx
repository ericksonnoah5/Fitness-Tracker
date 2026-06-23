"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  function recipies() {
    router.push(`/recipes`);
  }
  function dashboard() {
    router.push(`/dashboard`);
  }
  function fitness() {
    router.push(`/`);
  }
  return (
    <>
      <button onClick={fitness}>hi</button>
      <button onClick={recipies}>Recipes</button>
      <button onClick={dashboard}>Dashboard</button>
    </>
  );
}
