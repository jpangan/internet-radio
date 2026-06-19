"use client";

import { useState } from "react";
import FlagIcon from "@/components/FlagIcon";
import type { Country } from "@/lib/types";

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

export default function CountryCard({ country, onClick }: CountryCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 14, padding: 14,
        borderRadius: "var(--v-r-md)", border: "1px solid var(--v-hairline)",
        background: hover ? "var(--v-elev-2)" : "var(--v-elev)",
        cursor: "pointer", textAlign: "left",
        transition: "background .15s, transform .15s",
        transform: hover ? "translateY(-2px)" : "none",
      }}
    >
      <span style={{
        width: 48, height: 36, borderRadius: 8, overflow: "hidden",
        flexShrink: 0, boxShadow: "var(--v-shadow-card)", display: "flex",
      }}>
        <FlagIcon
          code={country.iso_3166_1}
          className="h-full w-full object-cover"
        />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 15, fontWeight: 700, color: "var(--v-fg)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {country.name}
        </div>
        <div style={{ fontSize: 12.5, color: "var(--v-fg-3)", marginTop: 2 }}>
          {country.stationcount.toLocaleString()} stations
        </div>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2.4" strokeLinecap="round" style={{ color: "var(--v-fg-4)", flexShrink: 0 }}>
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>
  );
}
