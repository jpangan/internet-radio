import React from "react";
import { StationArtwork } from "./StationArtwork.jsx";
import { Tag } from "../core/Tag.jsx";

/**
 * StationRow — a tappable list row: circular favicon, name, genre tags +
 * bitrate, and an active pulse dot. Active rows get a violet inset ring.
 */
export function StationRow({
  name, favicon, tags = [], bitrate, active = false, onClick, style = {},
}) {
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
        borderRadius: "var(--radius-lg)",
        fontFamily: "var(--font-sans)",
        background: active ? "var(--accent-soft)" : hover ? "var(--glass-hover)" : "transparent",
        boxShadow: active ? "inset 0 0 0 1px var(--accent-ring)" : "none",
        transition: "background .15s ease",
        ...style,
      }}
    >
      <StationArtwork src={favicon} alt={name} size="sm" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: "var(--text-sm)", fontWeight: active ? 600 : 500,
          color: active ? "var(--fg)" : "rgba(255,255,255,0.85)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{name}</div>
        {(tags.length > 0 || bitrate) && (
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4, marginTop: 3 }}>
            {tags.slice(0, 2).map((t) => (
              <Tag key={t} style={{ fontSize: 10, padding: "1px 6px", borderRadius: "var(--radius-sm)" }}>{t}</Tag>
            ))}
            {bitrate ? (
              <span style={{ fontSize: 10, color: "var(--fg-3)" }}>{bitrate} kbps</span>
            ) : null}
          </div>
        )}
      </div>
      {active && (
        <span style={{
          width: 8, height: 8, borderRadius: "var(--radius-full)",
          background: "var(--accent)", flexShrink: 0,
          animation: "artwork-pulse 2s ease-in-out infinite",
        }} />
      )}
    </button>
  );
}
