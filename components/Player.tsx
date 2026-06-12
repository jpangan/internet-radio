"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Station } from "@/lib/types";
import { formatBitrate, parseTags } from "@/lib/utils";
import StationFavicon from "./StationFavicon";

interface PlayerProps {
  station: Station | null;
  stationList: Station[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelectStationAt: (index: number) => void;
  onClear: () => void;
  onBrowse: () => void;
  onPlayingChange: (playing: boolean) => void;
  className?: string;
}

function getAdjacentStation(
  list: Station[],
  index: number,
  direction: 1 | -1
): Station | null {
  if (list.length === 0 || index < 0) return null;
  return list[(index + direction + list.length) % list.length];
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

function IconButton({
  onClick,
  disabled,
  label,
  children,
  size = "md",
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  const dim = size === "lg" ? "h-14 w-14" : "h-10 w-10";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`${dim} flex shrink-0 items-center justify-center rounded-full text-[var(--foreground)] transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 hover:bg-[var(--surface-hover)]`}
    >
      {children}
    </button>
  );
}

export default function Player({
  station,
  stationList,
  currentIndex,
  onPrevious,
  onNext,
  onSelectStationAt,
  onClear,
  onBrowse,
  onPlayingChange,
  className = "",
}: PlayerProps) {
  const canTune = stationList.length > 1 && currentIndex >= 0;
  const prevStation = canTune
    ? getAdjacentStation(stationList, currentIndex, -1)
    : null;
  const nextStation = canTune
    ? getAdjacentStation(stationList, currentIndex, 1)
    : null;

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

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setIsLoading(false);
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
      } catch {
        if (!cancelled) {
          setIsPlaying(false);
          setError("Playback failed. Try another station or retry.");
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

    const onPlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setError(null);
    };
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
        case "KeyS":
          e.preventDefault();
          stop();
          break;
        case "Escape":
          e.preventDefault();
          onClear();
          break;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    station,
    canTune,
    togglePlay,
    toggleMute,
    stop,
    onPrevious,
    onNext,
    onClear,
  ]);

  if (!station) {
    return (
      <main
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-[var(--background)] px-6 ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, color-mix(in srgb, var(--accent) 12%, transparent), transparent)",
          }}
        />
        <div className="relative flex flex-col items-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-[var(--surface)] text-[var(--muted)]">
            <svg
              className="h-12 w-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
              <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
              <circle cx="12" cy="12" r="2" />
              <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
              <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Nothing playing</h2>
          <p className="mt-2 max-w-xs text-center text-sm text-[var(--muted)]">
            Pick a country and station from the explorer to start listening.
          </p>
          <button
            type="button"
            onClick={onBrowse}
            className="mt-8 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-medium text-white active:scale-95 md:hidden"
          >
            Browse stations
          </button>
        </div>
      </main>
    );
  }

  const tags = parseTags(station.tags, 6);
  const volumePercent = Math.round((isMuted ? 0 : volume) * 100);

  return (
    <main className={`relative flex min-h-0 flex-col bg-[var(--background)] ${className}`}>
      <audio ref={audioRef} preload="none" playsInline />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />

      <header
        className="relative flex shrink-0 items-center border-b border-[var(--border-subtle)] px-4 py-3 md:px-6"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <button
          type="button"
          onClick={onBrowse}
          className="mr-2 flex h-9 items-center gap-1.5 rounded-full px-2.5 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)] md:hidden"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Browse
        </button>
        <span className="text-xs font-medium tracking-widest text-[var(--muted)] uppercase md:text-sm">
          Now Playing
        </span>
        {isPlaying && !error && (
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--live)_12%,transparent)] px-2.5 py-1 text-xs font-medium text-[var(--live)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--live)]" />
            Live
          </span>
        )}
        {isLoading && (
          <span className="ml-auto text-xs text-[var(--muted)]">Connecting…</span>
        )}
      </header>

      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-6 md:py-8">
        <div className="artwork-glow mb-5 rounded-3xl sm:mb-6">
          <StationFavicon
            src={station.favicon}
            alt={station.name}
            size="lg"
          />
        </div>

        <h1 className="max-w-xl text-center text-xl leading-snug font-bold tracking-tight sm:text-2xl md:text-[1.65rem]">
          {station.name}
        </h1>

        <p className="mt-2 text-center text-sm text-[var(--muted)]">
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

        {tags.length > 0 && (
          <div className="mt-4 flex max-w-md flex-wrap justify-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--surface)] px-2.5 py-0.5 text-xs text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5">
            <p className="text-sm text-red-300">{error}</p>
            <button
              type="button"
              onClick={retry}
              className="shrink-0 rounded-lg bg-[var(--surface)] px-3 py-1.5 text-xs font-medium"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      <div className="glass-panel relative shrink-0 border-t border-[var(--border-subtle)]">
        {canTune && (
          <div className="border-b border-[var(--border-subtle)] px-4 py-3 md:px-6">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--muted)]">
                More from {station.country}
              </span>
              <span className="text-xs tabular-nums text-[var(--muted)]">
                {currentIndex + 1} / {stationList.length}
              </span>
            </div>

            {(prevStation || nextStation) && (
              <div className="mb-2.5 hidden items-center justify-between gap-3 sm:flex">
                <button
                  type="button"
                  onClick={onPrevious}
                  className="min-w-0 flex-1 truncate text-left text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  ‹ {prevStation?.name}
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="min-w-0 flex-1 truncate text-right text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {nextStation?.name} ›
                </button>
              </div>
            )}

            <div className="flex gap-2 overflow-x-auto overscroll-x-contain px-0.5 py-2 [-webkit-overflow-scrolling:touch]">
              {stationList.map((s, i) => {
                const active = i === currentIndex;
                return (
                  <button
                    key={s.stationuuid}
                    type="button"
                    onClick={() => onSelectStationAt(i)}
                    aria-current={active ? "true" : undefined}
                    className={`flex w-[4.75rem] shrink-0 flex-col items-center gap-1.5 rounded-xl border p-1.5 transition-all ${
                      active
                        ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_18%,var(--surface))]"
                        : "border-transparent hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    <StationFavicon src={s.favicon} alt={s.name} size="sm" />
                    <span
                      className={`line-clamp-2 w-full text-center text-[9px] leading-tight ${
                        active ? "font-medium text-[var(--foreground)]" : "text-[var(--muted)]"
                      }`}
                    >
                      {s.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="px-4 py-4 md:px-6 md:py-5">
          <div className="mx-auto flex max-w-md items-center justify-center gap-1 sm:gap-2">
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
              className="mx-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)] transition-all active:scale-95 disabled:opacity-50 hover:bg-[var(--accent-hover)]"
            >
              {isLoading ? (
                <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : isPlaying ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="h-6 w-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <IconButton onClick={onNext} disabled={!canTune} label="Next">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6h2v12h-2V6zM6 18l8.5-6L6 6v12z" />
              </svg>
            </IconButton>

            <IconButton onClick={stop} label="Stop">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="1" />
              </svg>
            </IconButton>
          </div>

          <div className="mx-auto mt-3 flex max-w-sm items-center gap-2 md:mt-4">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
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
              className="h-1.5 flex-1 cursor-pointer accent-[var(--accent)]"
              aria-label="Volume"
            />
            <span className="w-8 shrink-0 text-right text-xs tabular-nums text-[var(--muted)]">
              {volumePercent}
            </span>
          </div>

          <p className="mt-3 hidden text-center text-[10px] text-[var(--muted)] md:block">
            Space · play/pause  ← → · skip  M · mute  S · stop
          </p>
        </div>
      </div>
    </main>
  );
}
