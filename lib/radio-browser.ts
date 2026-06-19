const FALLBACK_SERVERS = [
  "https://de1.api.radio-browser.info",
  "https://nl1.api.radio-browser.info",
  "https://at1.api.radio-browser.info",
];

async function getBaseUrl(): Promise<string> {
  try {
    const res = await fetch("https://all.api.radio-browser.info/json/servers", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const servers: Array<{ name: string }> = await res.json();
      if (servers.length > 0) {
        const picked = servers[Math.floor(Math.random() * servers.length)];
        return `https://${picked.name}/json`;
      }
    }
  } catch {}
  return `${FALLBACK_SERVERS[Math.floor(Math.random() * FALLBACK_SERVERS.length)]}/json`;
}

export async function fetchCountries() {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/countries?order=name&hidebroken=true`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
}

export async function fetchTopStations(
  order: "votes" | "clicktrend" | "clickcount",
  limit = 12
) {
  const base = await getBaseUrl();
  const params = new URLSearchParams({
    order,
    reverse: "true",
    hidebroken: "true",
    limit: String(limit),
  });
  const res = await fetch(`${base}/stations/search?${params}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch top stations");
  return res.json();
}

export async function fetchStationsByTag(tag: string, limit = 12) {
  const base = await getBaseUrl();
  const params = new URLSearchParams({
    order: "votes",
    reverse: "true",
    hidebroken: "true",
    limit: String(limit),
  });
  const res = await fetch(
    `${base}/stations/bytagexact/${encodeURIComponent(tag)}?${params}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error("Failed to fetch stations by tag");
  return res.json();
}

export async function fetchStationsByCountry(
  isoCode: string,
  fallbackName?: string,
  offset = 0,
  name = ""
) {
  const base = await getBaseUrl();
  const params = new URLSearchParams({
    order: "votes",
    reverse: "true",
    hidebroken: "true",
    limit: "300",
    offset: String(offset),
  });
  if (isoCode) {
    params.set("countrycode", isoCode);
  } else if (fallbackName) {
    params.set("country", fallbackName);
  }
  if (name) params.set("name", name);
  const res = await fetch(`${base}/stations/search?${params}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch stations");
  return res.json();
}
