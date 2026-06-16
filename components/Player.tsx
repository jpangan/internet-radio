"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Station } from "@/lib/types";
import { formatBitrate, parseTags } from "@/lib/utils";
import StationFavicon from "./StationFavicon";
import { HeartIcon } from "./FavoritesModal";

interface PlayerProps {
  station: Station | null;
  stationList: Station[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelectStationAt: (index: number) => void;
  onClear: () => void;
  onOpenCountrySelector: () => void;
  onPlayingChange: (playing: boolean) => void;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onShare?: () => void;
  className?: string;
}


const VOLUME_KEY = "internet-radio-volume";
const MUTED_KEY = "internet-radio-muted";

function readStoredVolume(): number {
  if (typeof window === "undefined") return 0.8;
  const saved = localStorage.getItem(VOLUME_KEY);
  const parsed = saved ? parseFloat(saved) : 0.8;
  return Number.isFinite(parsed) ? parsed : 0.8;
}

function readStoredMuted(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(MUTED_KEY) === "true";
}

export default function Player({
  station,
  stationList,
  currentIndex,
  onPrevious,
  onNext,
  onSelectStationAt,
  onClear,
  onOpenCountrySelector,
  onPlayingChange,
  isFavorited,
  onToggleFavorite,
  onShare,
  className = "",
}: PlayerProps) {
  const canTune = stationList.length > 1 && currentIndex >= 0;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(readStoredVolume);
  const [isMuted, setIsMuted] = useState(readStoredMuted);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    try {
      await audio.play();
      setIsPlaying(true);
      setError(null);
    } catch {
      setIsPlaying(false);
      setError("Playback failed. Try another station or retry.");
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  const retry = useCallback(() => {
    setError(null);
    setReloadToken((t) => t + 1);
  }, []);

  useEffect(() => {
    onPlayingChange(isPlaying);
  }, [isPlaying, onPlayingChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !station) return;
    let cancelled = false;

    const switchStation = async () => {
      setIsPlaying(false);
      setIsLoading(true);
      setError(null);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      if (cancelled) return;
      audio.src = station.url_resolved;
      audio.load();
      try {
        await audio.play();
        if (!cancelled) {
          setIsPlaying(true);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setIsPlaying(false);
          // Browser blocked autoplay (no user interaction yet) — sit in paused-ready state silently
          const autoplayBlocked =
            err instanceof DOMException && err.name === "NotAllowedError";
          if (!autoplayBlocked) {
            setError("Playback failed. Try another station or retry.");
          }
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    switchStation();
    return () => {
      cancelled = true;
      audio.pause();
    };
  }, [station, reloadToken]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = isMuted;
    localStorage.setItem(VOLUME_KEY, String(volume));
    localStorage.setItem(MUTED_KEY, String(isMuted));
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlaying = () => { setIsPlaying(true); setIsLoading(false); setError(null); };
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onError = () => {
      setIsPlaying(false);
      setIsLoading(false);
      setError("Stream unavailable. Try another station or retry.");
    };

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
    };
  }, [station]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!station) return;
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (canTune) onPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          if (canTune) onNext();
          break;
        case "KeyM":
          e.preventDefault();
          toggleMute();
          break;
        case "Escape":
          e.preventDefault();
          onClear();
          break;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [station, canTune, togglePlay, toggleMute, onPrevious, onNext, onClear]);

  /* ── Media Session API (lock screen / notification controls) ── */
  useEffect(() => {
    if (!("mediaSession" in navigator) || !station) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: station.name,
      artist: [station.country, station.language].filter(Boolean).join(" · "),
      album: "Internet Radio",
      artwork: station.favicon
        ? [{ src: station.favicon, sizes: "96x96", type: "image/png" }]
        : [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
    });

    navigator.mediaSession.setActionHandler("play", play);
    navigator.mediaSession.setActionHandler("pause", pause);
    navigator.mediaSession.setActionHandler(
      "previoustrack",
      canTune ? onPrevious : null
    );
    navigator.mediaSession.setActionHandler(
      "nexttrack",
      canTune ? onNext : null
    );

    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
    };
  }, [station, isPlaying, canTune, play, pause, onPrevious, onNext]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
  }, [isPlaying]);

  /* ── Empty state ─────────────────────────────────────────── */
  if (!station) {
    return (
      <main
        className={`relative flex flex-col items-center justify-center overflow-hidden px-6 ${className}`}
        style={{ background: "var(--bg)" }}
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(124,108,240,0.1), transparent 70%)",
          }}
        />

        <div className="relative flex flex-col items-center text-center max-w-xs">
          {/* Globe icon */}
          <div
            className="mb-7 flex h-24 w-24 items-center justify-center rounded-[28px]"
            style={{
              background: "rgba(124,108,240,0.1)",
              border: "1px solid rgba(124,108,240,0.2)",
              boxShadow: "0 8px 40px rgba(124,108,240,0.15)",
            }}
          >
            <svg
              className="h-12 w-12"
              style={{ color: "#9488f5" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white">
            Nothing playing
          </h2>
          <p
            className="mt-2.5 text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Choose a country and station to start streaming radio from around
            the world.
          </p>

          <button
            type="button"
            onClick={onOpenCountrySelector}
            className="mt-8 flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #9488f5, #7c6cf0)",
              boxShadow: "0 4px 24px rgba(124,108,240,0.45)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 6px 32px rgba(124,108,240,0.6)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 4px 24px rgba(124,108,240,0.45)")
            }
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
            </svg>
            Select Country
          </button>
        </div>
      </main>
    );
  }

  /* ── Active player ──────────────────────────────────────── */
  const tags = parseTags(station.tags, 6);
  const volumePercent = Math.round((isMuted ? 0 : volume) * 100);

  return (
    <main
      className={`relative flex min-h-0 flex-col ${className}`}
      style={{ background: "var(--bg)" }}
    >
      <audio ref={audioRef} preload="none" playsInline />

      {/* Background radial gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,108,240,0.12), transparent 65%)",
        }}
      />

      {/* Station info */}
      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-8 md:py-10">
        {/* Artwork */}
        <div className={`mb-6 rounded-3xl sm:mb-7 ${isPlaying ? "artwork-pulse" : "artwork-glow"}`}>
          <StationFavicon
            src={station.favicon}
            alt={station.name}
            size="lg"
          />
        </div>

        {/* Live / Loading badge */}
        <div className="mb-3 flex h-6 items-center justify-center">
          {isPlaying && !error && (
            <span
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{
                background: "rgba(52,211,153,0.12)",
                color: "#34d399",
                border: "1px solid rgba(52,211,153,0.2)",
              }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#34d399]" />
              Live
            </span>
          )}
          {isLoading && !error && (
            <span
              className="text-xs font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Connecting…
            </span>
          )}
        </div>

        {/* Station name */}
        <h1 className="max-w-xl text-center text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
          {station.name}
        </h1>

        {/* Metadata */}
        <p
          className="mt-2 text-center text-sm"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {[station.country, station.language].filter(Boolean).join(" · ")}
          {(station.codec || station.bitrate) && (
            <>
              {" · "}
              {[station.codec?.toUpperCase(), formatBitrate(station.bitrate)]
                .filter(Boolean)
                .join(" · ")}
            </>
          )}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-4 flex max-w-sm flex-wrap justify-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="mt-5 flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            <p className="text-sm" style={{ color: "#fca5a5" }}>
              {error}
            </p>
            <button
              type="button"
              onClick={retry}
              className="shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Controls panel */}
      <div
        className="glass-panel player-controls relative shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Playback controls */}
        <div className="px-4 pt-5 pb-4 md:px-6">
          <div className="mx-auto flex max-w-md items-center">
            {/* Share — left anchor, mirrors heart width so controls stay centered */}
            <div className="w-11 flex items-center">
              {onShare && (
                <button
                  type="button"
                  onClick={onShare}
                  aria-label="Share station"
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "";
                    e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                  }}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </button>
              )}
            </div>

            {/* Play controls — always centered */}
            <div className="flex flex-1 items-center justify-center gap-1 sm:gap-2">
            <IconButton onClick={onPrevious} disabled={!canTune} label="Previous">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z" />
              </svg>
            </IconButton>

            <button
              type="button"
              onClick={togglePlay}
              disabled={isLoading && !error}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="mx-2 flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white transition-all active:scale-95 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #9488f5, #7c6cf0)",
                boxShadow: "0 4px 28px rgba(124,108,240,0.5)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 6px 36px rgba(124,108,240,0.65)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 28px rgba(124,108,240,0.5)")
              }
            >
              {isLoading ? (
                <svg className="h-7 w-7 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : isPlaying ? (
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1.5" />
                  <rect x="14" y="4" width="4" height="16" rx="1.5" />
                </svg>
              ) : (
                <svg className="h-7 w-7 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <IconButton onClick={onNext} disabled={!canTune} label="Next">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6h2v12h-2V6zM6 18l8.5-6L6 6v12z" />
              </svg>
            </IconButton>
            </div>{/* end centered controls */}

            {/* Heart — right anchor */}
            <div className="w-11 flex items-center justify-end">
              <button
                type="button"
                onClick={onToggleFavorite}
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95"
                style={{ color: isFavorited ? "#fb7185" : "rgba(255,255,255,0.35)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isFavorited ? "rgba(251,113,133,0.12)" : "rgba(255,255,255,0.07)";
                  e.currentTarget.style.color = "#fb7185";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "";
                  e.currentTarget.style.color = isFavorited ? "#fb7185" : "rgba(255,255,255,0.35)";
                }}
              >
                <HeartIcon
                  filled={isFavorited}
                  className={`h-5 w-5 transition-transform ${isFavorited ? "scale-110" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Volume */}
          <div className="mx-auto mt-4 flex max-w-xs items-center gap-3">
            <button
              type="button"
              onClick={onOpenCountrySelector}
              aria-label="Browse stations"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.color = "rgba(255,255,255,0.4)";
              }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.color = "rgba(255,255,255,0.4)";
              }}
            >
              {isMuted || volume === 0 ? (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
              )}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const next = parseFloat(e.target.value);
                setVolume(next);
                if (next > 0) setIsMuted(false);
              }}
              className="h-1 flex-1 cursor-pointer accent-[#7c6cf0]"
              aria-label="Volume"
            />

            <span
              className="w-7 shrink-0 text-right text-[11px] tabular-nums"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {volumePercent}
            </span>
          </div>

          <p
            className="mt-3 hidden text-center text-[10px] md:block"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Space · play/pause &nbsp;← → · skip &nbsp;M · mute
          </p>
        </div>

      </div>
    </main>
  );
}

// Deterministic per-bar params so SSR and client match
const BAR_COUNT = 30;
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => ({
  duration: 0.4 + ((i * 7 + 3) % 9) * 0.09,
  delay: -(((i * 11 + 1) % 13) * 0.08),
  height: 12 + ((i * 13 + 5) % 22),
}));

function Visualizer({ active }: { active: boolean }) {
  return (
    <div
      className="flex items-end justify-center"
      style={{ gap: 3, height: 40 }}
      aria-hidden
    >
      {BARS.map((b, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: b.height,
            borderRadius: 3,
            background: "linear-gradient(to top, #7c6cf0, rgba(148,136,245,0.5))",
            transformOrigin: "bottom",
            transform: active ? undefined : "scaleY(0.1)",
            transition: active ? undefined : "transform 0.5s ease",
            animation: active
              ? `viz-bar ${b.duration.toFixed(2)}s ${b.delay.toFixed(2)}s ease-in-out infinite alternate`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

function IconButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
      style={{ color: "rgba(255,255,255,0.7)" }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          e.currentTarget.style.color = "white";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "";
        e.currentTarget.style.color = "rgba(255,255,255,0.7)";
      }}
    >
      {children}
    </button>
  );
}
