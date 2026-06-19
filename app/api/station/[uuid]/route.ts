import { NextResponse } from "next/server";
import { fetchStationByUuid } from "@/lib/radio-browser";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params;
  try {
    const station = await fetchStationByUuid(uuid);
    if (!station) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(station);
  } catch {
    return NextResponse.json({ error: "Failed to fetch station" }, { status: 500 });
  }
}
