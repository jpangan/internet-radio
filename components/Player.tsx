"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Station } from "@/lib/types";
import { formatBitrate, parseTags } from "@/lib/utils";
import StationFavicon from "./StationFavicon";

interface PlayerProps {
  station: Station | null;
}

function RadioIconLarge() {
  return (
    <svg
      className="h-16 w-16 text-[var(--muted)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  );
}

export default function Player({ station }: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [error, setError] = useState<string | null>(null);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
      setError(null);
    } catch {
      setIsPlaying(false);
      setError("Playback failed. Try another station.");
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !station) return;

    setIsPlaying(false);
    setIsLoading(true);
    setError(null);
    audio.src = station.url_resolved;
    audio.load();
    play().finally(() => setIsLoading(false));
  }, [station, play]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

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
      setError("Stream unavailable. Try another station.");
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

  if (!station) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center bg-[var(--background)]">
        <RadioIconLarge />
        <p className="mt-4 text-lg text-[var(--muted)]">
          Select a station to start listening
        </p>
      </main>
    );
  }

  const tags = parseTags(station.tags, 10);

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-[var(--background)] px-8">
      <audio ref={audioRef} preload="none" />

      <StationFavicon
        src={station.favicon}
        alt={station.name}
        size="lg"
        className="mb-6 shadow-lg"
      />

      <h1 className="mb-2 max-w-lg text-center text-3xl font-bold">
        {station.name}
      </h1>

      <p className="mb-1 text-sm text-[var(--muted)]">
        {[station.country, station.language].filter(Boolean).join(" · ")}
      </p>

      {(station.codec || station.bitrate) && (
        <p className="mb-4 text-xs text-[var(--muted)]">
          {[station.codec?.toUpperCase(), formatBitrate(station.bitrate)]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}

      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {error && (
        <p className="mb-4 text-sm text-red-400">{error}</p>
      )}

      <div className="flex items-center gap-6">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-50"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isLoading ? (
            <svg
              className="h-6 w-6 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
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

        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-[var(--muted)]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="h-1 w-28 cursor-pointer accent-[var(--accent)]"
            aria-label="Volume"
          />
        </div>
      </div>

      {isPlaying && (
        <div className="mt-6 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs text-[var(--muted)]">Live</span>
        </div>
      )}
    </main>
  );
}
