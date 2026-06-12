"use client";

import { useEffect, useState } from "react";
import type { Favorite } from "@/lib/types";
import { formatBitrate } from "@/lib/utils";
import StationFavicon from "./StationFavicon";
import FlagIcon from "./FlagIcon";

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Favorite[];
  onSelectFavorite: (favorite: Favorite) => void;
  onRemoveFavorite: (stationuuid: string) => void;
  currentStationuuid?: string;
}

export default function FavoritesModal({
  isOpen,
  onClose,
  favorites,
  onSelectFavorite,
  onRemoveFavorite,
  currentStationuuid,
}: FavoritesModalProps) {
  const [vvHeight, setVvHeight] = useState<number | null>(null);
  const [vvOffsetTop, setVvOffsetTop] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => { setVvHeight(vv.height); setVvOffsetTop(vv.offsetTop); };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = vvHeight
    ? { position: "fixed", top: vvOffsetTop, left: 0, right: 0, height: vvHeight, zIndex: 50, display: "flex", alignItems: "flex-end", justifyContent: "center", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }
    : {};

  return (
    <div
      className={vvHeight ? "" : "modal-overlay fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center sm:p-4"}
      style={vvHeight ? overlayStyle : { background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="modal-sheet w-full sm:max-w-md relative flex flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl"
        style={{
          background: "rgba(10, 10, 20, 0.97)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          border: "1px solid rgba(255,255,255,0.1)",
          maxHeight: vvHeight ? vvHeight * 0.94 : "92dvh",
          boxShadow: "0 -8px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-0 sm:hidden shrink-0">
          <div className="h-1 w-9 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
        </div>

        {/* Header */}
        <div className="shrink-0 flex items-center gap-3 px-4 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(251,113,133,0.15)" }}>
            <HeartIcon filled className="h-4 w-4" style={{ color: "#fb7185" }} />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-white leading-tight">Favorites</h2>
            <p className="text-[11px] mt-px" style={{ color: "rgba(255,255,255,0.3)" }}>
              {favorites.length === 0
                ? "No saved stations"
                : `${favorites.length} saved station${favorites.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* List */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain px-2 [-webkit-overflow-scrolling:touch]"
          style={{ paddingBottom: "max(1.25rem, var(--safe-bottom))" }}
        >
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <HeartIcon filled={false} className="h-8 w-8" style={{ color: "rgba(255,255,255,0.25)" }} />
              </div>
              <p className="text-sm font-medium text-white">No favorites yet</p>
              <p className="mt-1.5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                Tap the heart while listening to save a station here.
              </p>
            </div>
          ) : (
            <ul className="space-y-0.5 py-2">
              {favorites.map((fav) => {
                const isActive = currentStationuuid === fav.station.stationuuid;
                return (
                  <li key={fav.station.stationuuid}>
                    <div
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all"
                      style={isActive ? { background: "rgba(251,113,133,0.1)", boxShadow: "inset 0 0 0 1px rgba(251,113,133,0.25)" } : {}}
                    >
                      {/* Tap area — plays the station */}
                      <button
                        type="button"
                        onClick={() => onSelectFavorite(fav)}
                        className="flex flex-1 min-w-0 items-center gap-3 text-left"
                      >
                        <div className="relative shrink-0">
                          <StationFavicon src={fav.station.favicon} alt={fav.station.name} size="sm" />
                          <span
                            className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full"
                            style={{ background: "rgba(10,10,20,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}
                          >
                            <FlagIcon code={fav.country.iso_3166_1} className="h-2.5 w-3.5 rounded-[2px] object-cover" />
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className="truncate text-sm font-medium"
                            style={{ color: isActive ? "white" : "rgba(255,255,255,0.85)" }}
                          >
                            {fav.station.name}
                          </p>
                          <p className="mt-0.5 truncate text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {fav.country.name}
                            {fav.station.bitrate > 0 && ` · ${formatBitrate(fav.station.bitrate)}`}
                          </p>
                        </div>

                        {isActive && (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: "#fb7185" }} />
                          </span>
                        )}
                      </button>

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => onRemoveFavorite(fav.station.stationuuid)}
                        aria-label="Remove from favorites"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(251,113,133,0.12)"; e.currentTarget.style.color = "#fb7185"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "rgba(255,255,255,0.2)"; }}
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export function HeartIcon({
  filled,
  className,
  style,
}: {
  filled: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return filled ? (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ) : (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
