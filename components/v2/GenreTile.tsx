"use client";

import { gradientFor } from "@/lib/cover";

interface Genre {
  name: string;
  tag: string;
}

interface GenreTileProps {
  genre: Genre;
  onClick: () => void;
}

export default function GenreTile({ genre, onClick }: GenreTileProps) {
  const g = gradientFor(genre.name + genre.tag);
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "relative", height: 104, borderRadius: "var(--v-r-md)", overflow: "hidden",
        border: "none", cursor: "pointer", background: g.css, textAlign: "left", padding: 16, color: "#fff",
      }}
    >
      <span style={{
        position: "relative", fontSize: 17, fontWeight: 780,
        letterSpacing: "-0.02em", textShadow: "0 2px 12px rgba(0,0,0,0.3)",
      }}>
        {genre.name}
      </span>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(120deg, transparent 40%, rgba(0,0,0,0.25))",
      }} />
    </button>
  );
}

export const GENRES: Genre[] = [
  { name: "Jazz & Soul", tag: "jazz" },
  { name: "Electronic", tag: "electronic" },
  { name: "Indie & Alternative", tag: "indie" },
  { name: "Pop & Hits", tag: "pop" },
  { name: "Classical", tag: "classical" },
  { name: "News & Talk", tag: "news" },
  { name: "Hip-Hop", tag: "hip-hop" },
  { name: "World Music", tag: "world" },
];
