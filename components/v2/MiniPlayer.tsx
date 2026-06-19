"use client";

import Cover from "./Cover";
import PlayFab from "./PlayFab";
import { useAudioState, useAudioControls } from "@/lib/audio-context";
import type { Station } from "@/lib/types";

interface MiniPlayerProps {
  station: Station;
  onNext: () => void;
  onExpand: () => void;
  isFav: boolean;
  onFav: () => void;
}

export default function MiniPlayer({ station, onNext, onExpand, isFav, onFav }: MiniPlayerProps) {
  const { isPlaying, isLoading } = useAudioState();
  const { togglePlay } = useAudioControls();

  return (
    <div
      onClick={onExpand}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", cursor: "pointer",
        borderTop: "1px solid var(--v-hairline)",
        background: "var(--v-mat-chrome)", backdropFilter: "var(--v-mat-blur)",
        WebkitBackdropFilter: "var(--v-mat-blur)",
      }}
    >
      <Cover station={station} size={48} radius="10px" showInitials playing={isPlaying} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 700, color: "var(--v-fg)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {station.name}
        </div>
        <div style={{
          fontSize: 12, color: "var(--v-fg-3)", marginTop: 1,
          display: "flex", alignItems: "center", gap: 6,
          whiteSpace: "nowrap", overflow: "hidden",
        }}>
          {isPlaying ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--v-accent)", fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--v-accent)" }} />
              LIVE
            </span>
          ) : isLoading ? "Connecting…" : "Paused"}
          {station.country && ` · ${station.country}`}
        </div>
      </div>

      {/* Favorite */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onFav(); }}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        style={{
          border: "none", background: "transparent", cursor: "pointer",
          color: isFav ? "var(--v-accent)" : "var(--v-fg-3)", display: "inline-flex", padding: 6,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24"
          fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      {/* Play FAB */}
      <PlayFab
        playing={isPlaying}
        loading={isLoading}
        size={42}
        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
      />

      {/* Next (visible on wider layouts) */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
        className="hidden sm:inline-flex"
        style={{
          border: "none", background: "transparent", cursor: "pointer",
          color: "var(--v-fg-2)", display: "inline-flex", padding: 6,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 6h2v12h-2V6zM6 18l8.5-6L6 6v12z"/>
        </svg>
      </button>
    </div>
  );
}
