"use client";

import { useEffect, useRef, useState } from "react";
import Cover from "./Cover";
import PlayFab from "./PlayFab";
import { useAudioState, useAudioControls } from "@/lib/audio-context";
import { gradientFor, coverHash } from "@/lib/cover";
import { parseTags } from "@/lib/utils";
import FlagIcon from "@/components/FlagIcon";
import type { Station } from "@/lib/types";

const WAVEFORM_BARS = 64;

interface NowPlayingProps {
  station: Station | null;
  open: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFav: boolean;
  onFav: () => void;
  onShare: () => void;
}

export default function NowPlaying({ station, open, onClose, onNext, onPrev, isFav, onFav, onShare }: NowPlayingProps) {
  const { isPlaying, isLoading, volume, isMuted, error } = useAudioState();
  const { togglePlay, toggleMute, setVolume, retry } = useAudioControls();
  const ref = useRef<HTMLDivElement>(null);
  const [px, setPx] = useState({ x: 0, y: 0 });
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!open || !isPlaying) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [open, isPlaying]);

  useEffect(() => { setElapsed(0); }, [station]);

  if (!station) return null;

  const g = gradientFor(station.name);
  const tags = parseTags(station.tags, 3);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  const effectiveVolume = isMuted ? 0 : volume;

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPx({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPx({ x: 0, y: 0 })}
      aria-hidden={!open}
      style={{
        position: "absolute", inset: 0, zIndex: 60, overflow: "hidden",
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "transform .5s var(--v-ease)",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      {/* Ambient background */}
      <div style={{
        position: "absolute", inset: "-20%", background: g.css,
        filter: "blur(80px) saturate(150%)",
        transform: `scale(1.2) translate(${px.x * -24}px, ${px.y * -24}px)`,
        transition: "transform .3s var(--v-ease-soft)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.62))" }} />

      {/* Content */}
      <div style={{
        position: "relative", height: "100%", display: "flex", flexDirection: "column",
        alignItems: "center", padding: "clamp(18px, 3vw, 34px)", overflowY: "auto",
      }}>
        {/* Top bar */}
        <div style={{ width: "100%", maxWidth: 520, display: "flex", alignItems: "center", justifyContent: "space-between", color: "#fff" }}>
          <button type="button" onClick={onClose} aria-label="Collapse"
            style={{ width: 40, height: 40, borderRadius: 99, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.16)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.8 }}>
            Now Playing
          </div>
          <button type="button" onClick={onShare} aria-label="Share"
            style={{ width: 40, height: 40, borderRadius: 99, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.16)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
          </button>
        </div>

        {/* Cover + meta */}
        <div style={{ flex: "0 0 auto", margin: "auto 0", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 520 }}>
          {/* Cover with parallax */}
          <div style={{
            transform: `translate(${px.x * 16}px, ${px.y * 16}px) rotateX(${px.y * -5}deg) rotateY(${px.x * 5}deg)`,
            transition: "transform .25s var(--v-ease-soft)",
            transformStyle: "preserve-3d", perspective: 800,
          }}>
            <Cover
              station={station}
              size="min(64vw, 340px)"
              radius="var(--v-r-xl)"
              showInitials
              playing={isPlaying}
              style={{ boxShadow: "0 40px 90px rgba(0,0,0,0.5)" }}
            />
          </div>

          {/* Meta */}
          <div style={{ width: "100%", marginTop: 30, color: "#fff" }}>
            {/* Error state */}
            {error && (
              <div style={{
                marginBottom: 16, padding: "10px 14px", borderRadius: "var(--v-r-md)",
                background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ fontSize: 13, color: "#fca5a5", flex: 1 }}>{error}</span>
                <button type="button" onClick={retry} style={{
                  padding: "4px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 12, fontWeight: 600,
                }}>Retry</button>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{
                  margin: 0, fontSize: "clamp(24px, 5vw, 34px)", fontWeight: 820,
                  letterSpacing: "-0.03em", lineHeight: 1.08,
                }}>
                  {station.name}
                </h1>
                <p style={{ margin: "8px 0 0", fontSize: 15, opacity: 0.82, display: "flex", alignItems: "center", gap: 8, fontWeight: 500, flexWrap: "wrap" }}>
                  {station.countrycode && (
                    <FlagIcon code={station.countrycode} className="inline-block h-4 w-5 rounded-sm object-cover" />
                  )}
                  {station.country}
                  {tags.length > 0 && ` · ${tags.join(" · ")}`}
                </p>
              </div>
              <button type="button" onClick={onFav} aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "#fff", display: "inline-flex", padding: 4 }}>
                <svg width="28" height="28" viewBox="0 0 24 24"
                  fill={isFav ? "#fff" : "none"} stroke="#fff" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Live waveform */}
            <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 12, fontVariantNumeric: "tabular-nums", opacity: 0.75 }}>{mm}:{ss}</span>
              <div style={{ flex: 1, height: 26, display: "flex", alignItems: "center", gap: 2, overflow: "hidden" }}>
                {Array.from({ length: WAVEFORM_BARS }, (_, i) => {
                  const h = 6 + (coverHash(station.name + i) % 20);
                  return (
                    <span key={i} style={{
                      flex: 1, height: isPlaying ? h + "px" : "4px", minWidth: 2, borderRadius: 2,
                      background: "rgba(255,255,255,0.55)", transformOrigin: "center",
                      animationName: "v-eq",
                      animationDuration: `${0.6 + (i % 5) * 0.12}s`,
                      animationDelay: `${(i % 7) * 0.07}s`,
                      animationTimingFunction: "ease-in-out",
                      animationIterationCount: "infinite",
                      animationPlayState: isPlaying ? "running" : "paused",
                      transition: "height 0.4s ease",
                    }} />
                  );
                })}
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 800, letterSpacing: "0.08em" }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: "#fff", boxShadow: "0 0 8px #fff" }} />
                LIVE
              </span>
            </div>

            {/* Transport */}
            <div style={{ marginTop: 26, display: "flex", alignItems: "center", justifyContent: "center", gap: 22 }}>
              <button type="button" onClick={onPrev} aria-label="Previous"
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "#fff", display: "inline-flex", padding: 4 }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z"/>
                </svg>
              </button>
              <PlayFab playing={isPlaying} loading={isLoading} size={76} light onClick={togglePlay} />
              <button type="button" onClick={onNext} aria-label="Next"
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "#fff", display: "inline-flex", padding: 4 }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 6h2v12h-2V6zM6 18l8.5-6L6 6v12z"/>
                </svg>
              </button>
            </div>

            {/* Volume */}
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12, maxWidth: 360, margin: "24px auto 8px", color: "#fff" }}>
              <button type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "#fff", opacity: 0.8, display: "inline-flex" }}>
                {isMuted || effectiveVolume === 0 ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                  </svg>
                )}
              </button>
              <input
                type="range" min={0} max={1} step={0.01}
                value={effectiveVolume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Volume"
                className="v-range-light"
                style={{ flex: 1, height: 4 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
