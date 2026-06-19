import React from "react";

/**
 * Tag — tiny genre / metadata chip. Low-contrast glass fill, no border.
 * Used in clusters under a station name.
 */
export function Tag({ children, accent = false, style = {} }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 10px",
        fontSize: "var(--text-2xs)",
        fontWeight: "var(--weight-medium)",
        borderRadius: "var(--radius-full)",
        background: accent ? "var(--accent-soft)" : "var(--glass-hover)",
        color: accent ? "rgba(196,190,255,0.85)" : "var(--fg-3)",
        border: accent ? "1px solid var(--accent-ring)" : "none",
        fontFamily: "var(--font-sans)",
        textTransform: "capitalize",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
