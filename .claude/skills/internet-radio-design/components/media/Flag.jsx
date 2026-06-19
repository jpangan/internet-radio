import React from "react";

/**
 * Flag — a country flag from an ISO 3166-1 alpha-2 code. Renders a 3x2
 * raster from flagcdn.com (the app uses the country-flag-icons package;
 * this is the CDN-backed equivalent). Falls back to a globe glyph.
 */
export function Flag({ code, width = 20, radius = 3, style = {} }) {
  const [error, setError] = React.useState(false);
  const cc = (code || "").toLowerCase();
  const height = Math.round((width * 2) / 3);

  if (!cc || cc.length !== 2 || error) {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width, height, fontSize: width * 0.7, color: "var(--fg-3)", ...style,
      }}>🌐</span>
    );
  }
  return (
    <img
      src={`https://flagcdn.com/w40/${cc}.png`}
      srcSet={`https://flagcdn.com/w80/${cc}.png 2x`}
      alt={code}
      onError={() => setError(true)}
      style={{ width, height, objectFit: "cover", borderRadius: radius, display: "block", ...style }}
    />
  );
}
