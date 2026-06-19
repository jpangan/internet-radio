import { NextResponse } from "next/server";
import { fetchTopStations } from "@/lib/radio-browser";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const order = (searchParams.get("order") ?? "votes") as "votes" | "clicktrend" | "clickcount";
  const limit = parseInt(searchParams.get("limit") ?? "12", 10);
  try {
    const stations = await fetchTopStations(order, limit);
    return NextResponse.json(stations);
  } catch {
    return NextResponse.json({ error: "Failed to fetch top stations" }, { status: 500 });
  }
}
