// Ported verbatim from ui_kits/internet-radio-v2/gen.js
// Deterministic duotone gradient cover derived from a station name.

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface CoverGradient {
  from: string;
  to: string;
  h1: number;
  h2: number;
  css: string;
}

export function gradientFor(seed: string): CoverGradient {
  const h = hash(seed || "radio");
  const h1 = h % 360;
  const h2 = (h1 + 30 + (h % 50)) % 360;
  const s1 = 68 + (h % 18);
  const l1 = 56 + (h % 10);
  const s2 = 70 + ((h >> 3) % 16);
  const l2 = 34 + ((h >> 5) % 10);
  const from = `hsl(${h1} ${s1}% ${l1}%)`;
  const to = `hsl(${h2} ${s2}% ${l2}%)`;
  const ax = 18 + (h % 30);
  const ay = 12 + ((h >> 4) % 30);
  const css =
    `radial-gradient(120% 120% at ${ax}% ${ay}%, ${from} 0%, transparent 58%),` +
    `radial-gradient(130% 130% at ${100 - ax}% ${100 - ay}%, ${to} 0%, transparent 60%),` +
    `linear-gradient(135deg, hsl(${h1} ${s1}% ${l1 - 8}%), hsl(${h2} ${s2}% ${l2}%))`;
  return { from, to, h1, h2, css };
}

export function initials(name: string): string {
  const cleaned = (name || "").replace(/^(radio|the)\s+/i, "").trim();
  const parts = cleaned.split(/[\s.\-]+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export { hash as coverHash };
