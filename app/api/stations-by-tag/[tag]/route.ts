import { NextResponse } from "next/server";
import { fetchStationsByTag } from "@/lib/radio-browser";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tag: string }> }
) {
  const { tag } = await params;
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? "12", 10);
  try {
    const stations = await fetchStationsByTag(decodeURIComponent(tag), limit);
    return NextResponse.json(stations);
  } catch {
    return NextResponse.json({ error: "Failed to fetch stations by tag" }, { status: 500 });
  }
}
