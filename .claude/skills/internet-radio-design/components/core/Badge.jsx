import React from "react";

/**
 * Badge — small status pill. "live" shows a pulsing dot; "connecting"
 * shows three bouncing dots. Soft tinted background + matching border.
 */
export function Badge({ children, tone = "live", showDot = true, style = {} }) {
  const tones = {
    live: { bg: "var(--live-soft)", color: "var(--live)", border: "var(--live-border)" },
    accent: { bg: "var(--accent-soft)", color: "var(--accent-hover)", border: "var(--accent-ring)" },
    fav: { bg: "var(--fav-soft)", color: "var(--fav)", border: "var(--fav-border)" },
    neutral: { bg: "var(--surface)", color: "var(--fg-2)", border: "var(--border)" },
  };
  const t = tones[tone] || tones.live;
  const isConnecting = tone === "accent" && showDot && children &&
    String(children).toLowerCase().includes("connect");

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        fontSize: "var(--text-2xs)",
        fontWeight: "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        borderRadius: "var(--radius-full)",
        background: t.bg,
        color: t.color,
        border: `1px solid ${t.border}`,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      {showDot && !isConnecting && (
        <span style={{
          width: 6, height: 6, borderRadius: "var(--radius-full)",
          background: t.color, animation: "artwork-pulse 2s ease-in-out infinite",
        }} />
      )}
      {isConnecting && (
        <span style={{ display: "inline-flex", gap: 3 }}>
          {[0, 0.15, 0.3].map((d, i) => (
            <span key={i} className="connecting-dot" style={{
              width: 6, height: 6, borderRadius: "var(--radius-full)",
              background: t.color, animationDelay: `${d}s`,
            }} />
          ))}
        </span>
      )}
      {children}
    </span>
  );
}
