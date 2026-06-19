"use client";

import TopBar from "./TopBar";
import ListRow from "./ListRow";
import type { Station } from "@/lib/types";

interface LibraryViewProps {
  favorites: Station[];
  current: Station | null;
  playing: boolean;
  onPlay: (s: Station, list: Station[]) => void;
  onOpen: (s: Station, list: Station[]) => void;
  onRemove: (s: Station) => void;
}

function HeartFilled({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

export default function LibraryView({ favorites, current, playing, onPlay, onOpen, onRemove }: LibraryViewProps) {
  return (
    <div style={{ animation: "v-fade .35s ease" }}>
      <TopBar title="Your Library" />

      {favorites.length === 0 ? (
        <div style={{ padding: "70px 0", textAlign: "center" }}>
          <div style={{
            width: 88, height: 88, margin: "0 auto 18px", borderRadius: "var(--v-r-lg)",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "var(--v-elev-2)", color: "var(--v-fg-3)",
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 4v17M10 4v17"/><rect x="14" y="4" width="6" height="17" rx="1.5"/>
            </svg>
          </div>
          <div style={{ fontSize: 18, fontWeight: 750, color: "var(--v-fg)" }}>Build your collection</div>
          <div style={{ fontSize: 14.5, color: "var(--v-fg-3)", marginTop: 8 }}>
            Tap the heart on any station to save it here.
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--v-fg-3)", margin: "0 4px 8px" }}>
            {favorites.length} saved station{favorites.length !== 1 ? "s" : ""}
          </div>
          {favorites.map((s, i) => (
            <ListRow
              key={s.stationuuid}
              station={s}
              index={i + 1}
              playing={playing}
              active={current?.stationuuid === s.stationuuid}
              onPlay={(st) => onPlay(st, favorites)}
              onOpen={(st) => onOpen(st, favorites)}
              trailing={
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onRemove(s); }}
                  aria-label="Remove from library"
                  style={{
                    border: "none", background: "transparent",
                    color: "var(--v-accent)", cursor: "pointer",
                    display: "inline-flex", padding: 6,
                  }}
                >
                  <HeartFilled size={18} />
                </button>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
