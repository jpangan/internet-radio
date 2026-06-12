import { NextResponse } from "next/server";
import { fetchCountries } from "@/lib/radio-browser";

export async function GET() {
  try {
    const countries = await fetchCountries();
    return NextResponse.json(countries);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}
