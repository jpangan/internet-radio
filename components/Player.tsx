"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Station } from "@/lib/types";
import { AudioStateContext, AudioControlsContext } from "@/lib/audio-context";
import { trackStationPlayed, trackStationPaused, trackStreamError, trackError } from "@/lib/analytics";

interface AudioEngineProps {
  station: Station | null;
  stationList: Station[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onPlayingChange: (playing: boolean) => void;
  children?: React.ReactNode;
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

export default function AudioEngine({
  station,
  stationList,
  currentIndex,
  onPrevious,
  onNext,
  onPlayingChange,
  children,
}: AudioEngineProps) {
  const canTune = stationList.length > 1 && currentIndex >= 0;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(readStoredVolume);
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
    } catch (err) {
      setIsPlaying(false);
      setError("Playback failed. Try another station or retry.");
      const message = err instanceof Error ? err.message : "Playback failed";
      if (station) trackError(message, { type: "playback_error", station_name: station.name, station_uuid: station.stationuuid });
    }
  }, [station]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
      if (station) trackStationPaused(station);
    } else {
      play();
      if (station) trackStationPlayed(station);
    }
  }, [isPlaying, play, pause, station]);

  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (v > 0) setIsMuted(false);
  }, []);

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
          const autoplayBlocked = err instanceof DOMException && err.name === "NotAllowedError";
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
      if (station) trackStreamError(station);
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
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
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
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [station, canTune, togglePlay, toggleMute, onPrevious, onNext]);

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
    navigator.mediaSession.setActionHandler("previoustrack", canTune ? onPrevious : null);
    navigator.mediaSession.setActionHandler("nexttrack", canTune ? onNext : null);
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

  const audioState = useMemo(
    () => ({ isPlaying, isLoading, volume, isMuted, error }),
    [isPlaying, isLoading, volume, isMuted, error]
  );

  const audioControls = useMemo(
    () => ({ togglePlay, toggleMute, setVolume, retry }),
    [togglePlay, toggleMute, setVolume, retry]
  );

  return (
    <AudioStateContext.Provider value={audioState}>
      <AudioControlsContext.Provider value={audioControls}>
        <audio ref={audioRef} preload="none" playsInline />
        {children}
      </AudioControlsContext.Provider>
    </AudioStateContext.Provider>
  );
}
