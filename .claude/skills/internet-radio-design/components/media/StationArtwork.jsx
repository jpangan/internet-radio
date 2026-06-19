import React from "react";

/** Fallback radio-tower icon shown when a station has no favicon. */
function RadioIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="var(--fg-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  );
}

/**
 * StationArtwork — square station favicon with rounded corners and a
 * graceful radio-icon fallback. "lg" carries the now-playing glow halo
 * (and pulses when `playing`).
 */
export function StationArtwork({ src, alt = "", size = "md", playing = false, style = {} }) {
  const [error, setError] = React.useState(false);
  const dims = { sm: 36, md: 44, lg: 144 }[size] || 44;
  const radius = size === "sm" ? "var(--radius-full)"
    : size === "lg" ? "var(--radius-3xl)" : "var(--radius-2xl)";
  const showFallback = !src || error;

  return (
    <div
      className={size === "lg" ? (playing ? "artwork-pulse" : "artwork-glow") : undefined}
      style={{
        width: dims, height: dims, flexShrink: 0,
        borderRadius: radius, overflow: "hidden",
        background: "var(--surface)",
        display: "flex", alignItems: "center", justifyContent: "center",
        ...style,
      }}
    >
      {showFallback ? (
        <RadioIcon size={size === "lg" ? 48 : 18} />
      ) : (
        <img src={src} alt={alt} onError={() => setError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      )}
    </div>
  );
}
