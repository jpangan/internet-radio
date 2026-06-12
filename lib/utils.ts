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
