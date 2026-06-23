"use client";
import router from "next/router";

export default function Page() {
  function recipies() {
    router.push(`recipes/page.tsx`);
  }
  function dashboard() {
    router.push(`dashboard/page.tsx`);
  }
  function fitness() {
    router.push(`/page.tsx`);
  }
  return (
    <>
      <button onClick={fitness}>hi</button>
      <button onClick={recipies}>Recipes</button>
      <button onClick={dashboard}>Dashboard</button>
    </>
  );
}
