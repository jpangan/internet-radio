const BASE_URL = "https://de1.api.radio-browser.info/json";

export async function fetchCountries() {
  const res = await fetch(
    `${BASE_URL}/countries?order=name&hidebroken=true`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
}

export async function fetchStationsByCountry(countryName: string) {
  const res = await fetch(
    `${BASE_URL}/stations/bycountry/${encodeURIComponent(countryName)}?order=votes&reverse=true&hidebroken=true&limit=50`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error("Failed to fetch stations");
  return res.json();
}
