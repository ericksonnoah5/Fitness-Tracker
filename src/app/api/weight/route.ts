import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const user = body.username;

  const { data } = await supabase
    .from("Input")
    .select("*")
    .eq("Username", user);

  const { data: day } = await supabase.from("Day").select("theday").eq("id", 1);

  if (data?.length != null) {
    var datalength = data?.length;

    var total = 0;
    for (var i = 0; i < datalength; i++) {
      const num: number = Number(data[i].calories);
      total = total + num;
    }
    const average = total / day?.[0].theday;

    return NextResponse.json(average);
  }
}
