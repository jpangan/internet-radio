"use client";

import { useState } from "react";
import { gradientFor, initials } from "@/lib/cover";
import type { Station } from "@/lib/types";

const BAR_COUNT = 4;

function Equalizer({ size = 18 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: size * 0.16, height: size }} aria-hidden>
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <span
          key={i}
          style={{
            width: size * 0.16, height: size, borderRadius: 99, background: "#fff",
            transformOrigin: "bottom",
            animationName: "v-eq",
            animationDuration: `${0.7 + i * 0.18}s`,
            animationDelay: `${i * 0.12}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}

interface CoverProps {
  station: Station;
  size?: number | string;
  radius?: string;
  showInitials?: boolean;
  playing?: boolean;
  style?: React.CSSProperties;
}

export default function Cover({
  station,
  size = 160,
  radius = "var(--v-r-md)",
  showInitials = true,
  playing = false,
  style = {},
}: CoverProps) {
  const [faviconError, setFaviconError] = useState(false);
  const g = gradientFor(station.name);
  const ini = initials(station.name);
  const numSize = typeof size === "number" ? size : undefined;
  const hasFavicon = !!station.favicon && !faviconError;

  // For string sizes (e.g. CSS clamp), use a generous fallback font size
  const fontSize = hasFavicon ? 0 : numSize
    ? (numSize < 64 ? numSize * 0.4 : numSize * 0.34)
    : "clamp(24px, 10vw, 48px)";

  return (
    <div
      style={{
        position: "relative", width: size, height: size, flexShrink: 0,
        borderRadius: radius, overflow: "hidden", background: g.css,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), var(--v-shadow-card)",
        display: "flex", alignItems: "center", justifyContent: "center",
        ...style,
      }}
    >
      {/* Favicon overlay */}
      {hasFavicon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={station.favicon}
          alt=""
          onError={() => setFaviconError(true)}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* Initials fallback */}
      {showInitials && !hasFavicon && (numSize === undefined || numSize >= 40) && (
        <span style={{
          fontWeight: 800, color: "rgba(255,255,255,0.92)",
          letterSpacing: "-0.03em", fontSize,
          textShadow: "0 2px 14px rgba(0,0,0,0.3)", userSelect: "none",
          position: "relative",
        }}>
          {numSize !== undefined && numSize < 64 ? ini[0] : ini}
        </span>
      )}

      {/* Playing equalizer overlay */}
      {playing && (
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.28)", backdropFilter: "blur(1px)",
        }}>
          <Equalizer size={numSize && numSize > 120 ? 22 : 14} />
        </div>
      )}
    </div>
  );
}
