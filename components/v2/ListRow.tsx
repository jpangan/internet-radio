"use client";

import { useState } from "react";
import Cover from "./Cover";
import { parseTags } from "@/lib/utils";
import FlagIcon from "@/components/FlagIcon";
import type { Station } from "@/lib/types";

const EQ_BARS = 4;

function MiniEqualizer() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 13 }} aria-hidden>
      {Array.from({ length: EQ_BARS }, (_, i) => (
        <span key={i} style={{
          width: 2, height: 13, borderRadius: 99, background: "var(--v-accent)",
          transformOrigin: "bottom", animation: `v-eq ${0.7 + i * 0.18}s ease-in-out infinite`,
          animationDelay: `${i * 0.12}s`,
        }} />
      ))}
    </div>
  );
}

interface ListRowProps {
  station: Station;
  index?: number;
  playing: boolean;
  active: boolean;
  onPlay: (s: Station) => void;
  onOpen: (s: Station) => void;
  trailing?: React.ReactNode;
}

export default function ListRow({ station, index, playing, active, onPlay, onOpen, trailing }: ListRowProps) {
  const [hover, setHover] = useState(false);
  const tags = parseTags(station.tags, 1);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(station)}
      style={{
        display: "flex", alignItems: "center", gap: 14, padding: "8px 12px",
        borderRadius: "var(--v-r-md)", cursor: "pointer",
        background: active ? "var(--v-accent-soft)" : hover ? "var(--v-elev-2)" : "transparent",
        transition: "background .15s var(--v-ease-soft)",
      }}
    >
      {index != null && (
        <div style={{
          width: 22, textAlign: "center", flexShrink: 0,
          color: active ? "var(--v-accent)" : "var(--v-fg-3)",
          fontSize: 14, fontVariantNumeric: "tabular-nums",
        }}>
          {hover ? (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onPlay(station); }}
              aria-label="Play"
              style={{ border: "none", background: "transparent", color: "var(--v-fg)", cursor: "pointer", padding: 0, display: "inline-flex" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          ) : active && playing ? (
            <MiniEqualizer />
          ) : (
            index
          )}
        </div>
      )}

      <Cover station={station} size={44} radius="10px" showInitials playing={false} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14.5, fontWeight: 600,
          color: active ? "var(--v-accent)" : "var(--v-fg)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {station.name}
        </div>
        <div style={{
          marginTop: 2, fontSize: 12.5, color: "var(--v-fg-3)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          {station.countrycode && (
            <FlagIcon code={station.countrycode} className="inline-block h-3 w-4 rounded-[2px] object-cover" />
          )}
          {[station.country, tags[0]].filter(Boolean).join(" · ")}
        </div>
      </div>

      {trailing}

      {station.bitrate > 0 && (
        <div style={{
          flexShrink: 0, fontSize: 12.5, color: "var(--v-fg-4)",
          fontVariantNumeric: "tabular-nums",
        }}>
          {station.bitrate}k
        </div>
      )}
    </div>
  );
}
