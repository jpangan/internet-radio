import type { Station } from "./types";

export function dedupeStations(stations: Station[]): Station[] {
  const seen = new Set<string>();
  return stations.filter((station) => {
    const key = station.stationuuid || `${station.name}\0${station.url_resolved}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function countryCodeToFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const code = countryCode.toUpperCase();
  return String.fromCodePoint(
    ...code.split("").map((c) => 0x1f1e0 - 65 + c.charCodeAt(0))
  );
}

export function parseTags(tags: string, limit = 2): string[] {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, limit);
}

export function formatBitrate(bitrate: number): string {
  if (!bitrate) return "";
  return `${bitrate} kbps`;
}
