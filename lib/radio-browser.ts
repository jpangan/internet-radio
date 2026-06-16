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

export async function fetchStationsByCountry(isoCode: string, fallbackName?: string) {
  const base = await getBaseUrl();
  // bycountrycode endpoint returns 404 on some servers; search?countrycode= is reliable
  const url = isoCode
    ? `${base}/stations/search?countrycode=${encodeURIComponent(isoCode)}&order=votes&reverse=true&hidebroken=true&limit=300`
    : `${base}/stations/bycountry/${encodeURIComponent(fallbackName!)}?order=votes&reverse=true&hidebroken=true&limit=300`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("Failed to fetch stations");
  return res.json();
}
