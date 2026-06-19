"use client";

import { useState } from "react";
import Cover from "./Cover";
import PlayFab from "./PlayFab";
import { parseTags } from "@/lib/utils";
import type { Station } from "@/lib/types";

interface StationCardProps {
  station: Station;
  playing: boolean;
  onPlay: (s: Station) => void;
  onOpen: (s: Station) => void;
  width?: number;
}

export default function StationCard({ station, playing, onPlay, onOpen, width = 168 }: StationCardProps) {
  const [hover, setHover] = useState(false);
  const tags = parseTags(station.tags, 2);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(station)}
      style={{
        width, flexShrink: 0, padding: 10, borderRadius: "var(--v-r-lg)", cursor: "pointer",
        background: hover ? "var(--v-elev-2)" : "transparent",
        transition: "background .2s var(--v-ease-soft)",
        scrollSnapAlign: "start",
      }}
    >
      <div style={{ position: "relative" }}>
        <Cover station={station} size={width - 20} radius="var(--v-r-md)" playing={playing} />
        <div style={{
          position: "absolute", right: 8, bottom: 8,
          opacity: hover || playing ? 1 : 0,
          transform: hover || playing ? "translateY(0)" : "translateY(8px)",
          transition: "opacity .22s var(--v-ease-soft), transform .22s var(--v-ease-soft)",
        }}>
          <PlayFab
            playing={playing}
            size={44}
            onClick={(e) => { e.stopPropagation(); onPlay(station); }}
          />
        </div>
      </div>
      <div style={{ marginTop: 10, padding: "0 2px" }}>
        <div style={{
          fontSize: 14, fontWeight: 650, color: "var(--v-fg)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {station.name}
        </div>
        <div style={{
          marginTop: 3, fontSize: 12.5, color: "var(--v-fg-3)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {tags.join(" · ") || station.country}
        </div>
      </div>
    </div>
  );
}
