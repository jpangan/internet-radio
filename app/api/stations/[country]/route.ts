import { NextResponse } from "next/server";
import { fetchStationsByCountry } from "@/lib/radio-browser";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ country: string }> }
) {
  const { country } = await params;
  const decoded = decodeURIComponent(country);
  // ISO-2 codes are always exactly 2 uppercase letters; no country name is that short
  const isIso = /^[A-Z]{2}$/.test(decoded);
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const name = searchParams.get("name") ?? "";
  try {
    const stations = await fetchStationsByCountry(
      isIso ? decoded : "",
      isIso ? undefined : decoded,
      offset,
      name
    );
    return NextResponse.json(stations);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stations" },
      { status: 500 }
    );
  }
}
