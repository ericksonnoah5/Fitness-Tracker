"use client";

import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Link style</Button>
    </>
  );
}
