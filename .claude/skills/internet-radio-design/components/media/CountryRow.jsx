import React from "react";
import { Flag } from "./Flag.jsx";

/**
 * CountryRow — browse-list row: flag tile, country name, station-count
 * pill, chevron. Hover fills faintly.
 */
export function CountryRow({ name, code, stationCount, onClick, style = {} }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12, width: "100%",
        padding: "10px 12px", textAlign: "left", border: "none", cursor: "pointer",
        borderRadius: "var(--radius-lg)", fontFamily: "var(--font-sans)",
        background: hover ? "var(--glass-hover)" : "transparent",
        transition: "background .15s ease", ...style,
      }}
    >
      <span style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 36, height: 36, flexShrink: 0, overflow: "hidden",
        borderRadius: "var(--radius-md)", background: "var(--surface)",
      }}>
        <Flag code={code} width={36} radius={0} style={{ height: 36 }} />
      </span>
      <span style={{
        flex: 1, minWidth: 0, fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--fg)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{name}</span>
      {stationCount != null && (
        <span style={{
          flexShrink: 0, padding: "2px 8px", borderRadius: "var(--radius-md)",
          fontSize: "var(--text-2xs)", fontVariantNumeric: "tabular-nums",
          background: "var(--surface)", color: "var(--fg-3)",
        }}>{stationCount}</span>
      )}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="var(--fg-4)" strokeWidth="2.5" style={{ flexShrink: 0 }}>
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
}
