import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { value } = await req.json();
  const valid = value === process.env.mypasskey;
  return NextResponse.json({ valid });
}
