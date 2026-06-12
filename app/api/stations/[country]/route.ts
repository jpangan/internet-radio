import { NextResponse } from "next/server";
import { fetchStationsByCountry } from "@/lib/radio-browser";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ country: string }> }
) {
  const { country } = await params;
  try {
    const stations = await fetchStationsByCountry(decodeURIComponent(country));
    return NextResponse.json(stations);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stations" },
      { status: 500 }
    );
  }
}
