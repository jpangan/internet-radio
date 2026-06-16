"use client";

import { useCallback, useEffect, useState } from "react";
import Player from "@/components/Player";
import CountryModal from "@/components/CountryModal";
import FavoritesModal, { HeartIcon } from "@/components/FavoritesModal";
import type { Country, Favorite, Station } from "@/lib/types";
import { dedupeStations } from "@/lib/utils";
import FlagIcon from "@/components/FlagIcon";

const COUNTRY_KEY = "ir-country";
const STATION_KEY = "ir-station";
const FAVORITES_KEY = "ir-favorites";

function readStoredFavorites(): Favorite[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Home() {
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [stationList, setStationList] = useState<Station[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Load favorites after mount to avoid SSR/client hydration mismatch
  useEffect(() => {
    setFavorites(readStoredFavorites());
  }, []);

  // Resolve shared URL params on mount — takes priority over localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const countryParam = params.get("country");
    const stationParam = params.get("station");
    if (!countryParam || !stationParam) return;

    // Clear params from URL immediately so back/forward history is clean
    history.replaceState(null, "", window.location.pathname);

    fetch(`/api/stations/${encodeURIComponent(countryParam)}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(async (data: Station[]) => {
        const stations = dedupeStations(data);
        const station = stations.find((s) => s.stationuuid === stationParam);
        if (!station) return; // Not found — stay on empty state

        // Try to enrich with proper Country object (for flag icon)
        let country: Country = { name: countryParam, stationcount: stations.length, iso_3166_1: "" };
        try {
          const cr = await fetch("/api/countries");
          const countries: Country[] = await cr.json();
          const found = countries.find(
            (c) => c.name.toLowerCase() === countryParam.toLowerCase()
          );
          if (found) country = found;
        } catch {}

        setSelectedCountry(country);
        setCurrentStation(station);
        setStationList(stations);
        localStorage.setItem(COUNTRY_KEY, JSON.stringify(country));
        localStorage.setItem(STATION_KEY, JSON.stringify(station));
      })
      .catch(() => {}); // Failed fetch — stay on empty state
  }, []);

  // Restore last session from localStorage
  useEffect(() => {
    // Skip if a shared URL is being handled (that effect takes priority)
    const params = new URLSearchParams(window.location.search);
    if (params.get("country") && params.get("station")) return;

    const savedCountryStr = localStorage.getItem(COUNTRY_KEY);
    const savedStationStr = localStorage.getItem(STATION_KEY);
    if (!savedCountryStr) return;

    try {
      const savedCountry: Country = JSON.parse(savedCountryStr);
      setSelectedCountry(savedCountry);

      if (savedStationStr) {
        const savedStation: Station = JSON.parse(savedStationStr);
        // Set station immediately so the player can start loading
        setCurrentStation(savedStation);
      }

      // Fetch the station list in the background for navigation
      fetch(`/api/stations/${encodeURIComponent(savedCountry.name)}`)
        .then((res) => res.json())
        .then((data: Station[]) => {
          const stations = dedupeStations(data);
          setStationList(stations);
          if (savedStationStr) {
            const savedStation: Station = JSON.parse(savedStationStr);
            const found = stations.find(
              (s) => s.stationuuid === savedStation.stationuuid
            );
            if (found) setCurrentStation(found);
          }
        })
        .catch(() => {});
    } catch {
      // Ignore malformed saved data
    }
  }, []);

  // Persist station changes (e.g. next/prev navigation)
  useEffect(() => {
    if (currentStation) {
      localStorage.setItem(STATION_KEY, JSON.stringify(currentStation));
    }
  }, [currentStation]);

  const handleSelectStation = useCallback(
    (station: Station, list: Station[], country: Country) => {
      setCurrentStation(station);
      setStationList(list);
      setSelectedCountry(country);
      localStorage.setItem(COUNTRY_KEY, JSON.stringify(country));
      localStorage.setItem(STATION_KEY, JSON.stringify(station));
      setIsModalOpen(false);
    },
    []
  );

  const handleClearStation = useCallback(() => {
    setCurrentStation(null);
  }, []);

  const isFavorited = favorites.some(
    (f) => f.station.stationuuid === currentStation?.stationuuid
  );

  const handleToggleFavorite = useCallback(() => {
    if (!currentStation || !selectedCountry) return;
    const already = favorites.some(
      (f) => f.station.stationuuid === currentStation.stationuuid
    );
    const next = already
      ? favorites.filter((f) => f.station.stationuuid !== currentStation.stationuuid)
      : [...favorites, { station: currentStation, country: selectedCountry }];
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  }, [currentStation, selectedCountry, favorites]);

  const handleRemoveFavorite = useCallback((stationuuid: string) => {
    const next = favorites.filter((f) => f.station.stationuuid !== stationuuid);
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  }, [favorites]);

  const handleSelectFavorite = useCallback(async (fav: Favorite) => {
    setSelectedCountry(fav.country);
    setCurrentStation(fav.station);
    localStorage.setItem(COUNTRY_KEY, JSON.stringify(fav.country));
    localStorage.setItem(STATION_KEY, JSON.stringify(fav.station));
    setIsFavoritesOpen(false);

    try {
      const res = await fetch(
        `/api/stations/${encodeURIComponent(fav.country.name)}`
      );
      const data: Station[] = await res.json();
      const stations = dedupeStations(data);
      setStationList(stations);
      const found = stations.find(
        (s) => s.stationuuid === fav.station.stationuuid
      );
      if (found) setCurrentStation(found);
    } catch {}
  }, []);

  const handleShare = useCallback(() => {
    if (!currentStation || !selectedCountry) return;
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("country", selectedCountry.name);
    url.searchParams.set("station", currentStation.stationuuid);
    const shareUrl = url.toString();

    const copyFallback = () => {
      navigator.clipboard?.writeText(shareUrl).then(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      }).catch(() => {});
    };

    if (typeof navigator.share === "function") {
      navigator.share({
        title: `${currentStation.name} — Internet Radio`,
        text: `Listen to ${currentStation.name} from ${selectedCountry.name}`,
        url: shareUrl,
      }).catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        copyFallback();
      });
      return;
    }

    copyFallback();
  }, [currentStation, selectedCountry]);

  const currentIndex =
    currentStation && stationList.length > 0
      ? stationList.findIndex(
          (s) =>
            s.url_resolved === currentStation.url_resolved &&
            s.name === currentStation.name
        )
      : -1;

  const handleAdjacentStation = useCallback(
    (direction: 1 | -1) => {
      if (!currentStation || stationList.length === 0) return;
      const index = stationList.findIndex(
        (s) =>
          s.url_resolved === currentStation.url_resolved &&
          s.name === currentStation.name
      );
      if (index === -1) return;
      setCurrentStation(
        stationList[
          (index + direction + stationList.length) % stationList.length
        ]
      );
    },
    [currentStation, stationList]
  );

  const handleSelectStationAt = useCallback(
    (index: number) => {
      if (index >= 0 && index < stationList.length) {
        setCurrentStation(stationList[index]);
      }
    },
    [stationList]
  );

  return (
    <div
      className="flex h-dvh flex-col overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Full-screen background gradient */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% -5%, rgba(124,108,240,0.13), transparent 65%)",
        }}
      />

      {/* App header */}
      <header
        className="glass-panel relative z-10 shrink-0 border-b"
        style={{
          borderColor: "rgba(255,255,255,0.07)",
          paddingTop: "max(0.75rem, var(--safe-top))",
        }}
      >
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 pb-3">
          {/* Logo mark + wordmark */}
          <div className="flex flex-1 min-w-0 items-center gap-2.5">
            <RadioMark />
            <div>
              <p className="text-sm font-bold tracking-tight leading-none text-white">
                Internet Radio
              </p>
              <p
                className="mt-0.5 text-[10px] leading-none"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Stream the world
              </p>
            </div>
          </div>

          {/* Active country pill */}
          {selectedCountry && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
                maxWidth: "160px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <FlagIcon
                code={selectedCountry.iso_3166_1}
                className="h-3 w-4 shrink-0 rounded-[2px] object-cover"
              />
              <span className="truncate">{selectedCountry.name}</span>
            </button>
          )}

          {/* Globe button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="Select country"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.55)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(124,108,240,0.2)";
              e.currentTarget.style.borderColor = "rgba(124,108,240,0.4)";
              e.currentTarget.style.color = "#9488f5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(255,255,255,0.55)";
            }}
          >
            <svg
              className="h-4.5 w-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
            </svg>
          </button>

          {/* Favorites button */}
          <button
            type="button"
            onClick={() => setIsFavoritesOpen(true)}
            aria-label="Favorites"
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all"
            style={{
              background: favorites.length > 0 ? "rgba(251,113,133,0.12)" : "rgba(255,255,255,0.06)",
              border: favorites.length > 0 ? "1px solid rgba(251,113,133,0.3)" : "1px solid rgba(255,255,255,0.1)",
              color: favorites.length > 0 ? "#fb7185" : "rgba(255,255,255,0.55)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(251,113,133,0.18)";
              e.currentTarget.style.borderColor = "rgba(251,113,133,0.4)";
              e.currentTarget.style.color = "#fb7185";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = favorites.length > 0 ? "rgba(251,113,133,0.12)" : "rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor = favorites.length > 0 ? "rgba(251,113,133,0.3)" : "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = favorites.length > 0 ? "#fb7185" : "rgba(255,255,255,0.55)";
            }}
          >
            <HeartIcon filled={favorites.length > 0} className="h-4 w-4" />
            {favorites.length > 0 && (
              <span
                className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ background: "#fb7185" }}
              >
                {favorites.length > 9 ? "9+" : favorites.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Player */}
      <Player
        station={currentStation}
        stationList={stationList}
        currentIndex={currentIndex}
        onPrevious={() => handleAdjacentStation(-1)}
        onNext={() => handleAdjacentStation(1)}
        onSelectStationAt={handleSelectStationAt}
        onClear={handleClearStation}
        onOpenCountrySelector={() => setIsModalOpen(true)}
        onPlayingChange={setIsPlaying}
        isFavorited={isFavorited}
        onToggleFavorite={handleToggleFavorite}
        onShare={currentStation ? handleShare : undefined}
        shareCopied={shareCopied}
        className="flex min-h-0 flex-1"
      />

      {/* Country / station selector modal */}
      <CountryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectStation={handleSelectStation}
        currentStation={currentStation}
        initialCountry={selectedCountry}
      />

      {/* Favorites modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onSelectFavorite={handleSelectFavorite}
        onRemoveFavorite={handleRemoveFavorite}
        currentStationuuid={currentStation?.stationuuid}
      />

      <span className="sr-only">{isPlaying ? "Playing" : "Paused"}</span>
    </div>
  );
}

function RadioMark() {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
      style={{
        background: "linear-gradient(135deg, rgba(148,136,245,0.25), rgba(124,108,240,0.15))",
        border: "1px solid rgba(124,108,240,0.35)",
      }}
    >
      <svg
        className="h-5 w-5"
        style={{ color: "#9488f5" }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      >
        <circle cx="12" cy="14" r="2" fill="currentColor" stroke="none" />
        <path d="M8.5 10.5C9.7 9.3 10.8 8.8 12 8.8s2.3.5 3.5 1.7" />
        <path d="M5.5 7.5C7.4 5.6 9.6 4.6 12 4.6s4.6 1 6.5 2.9" />
      </svg>
    </div>
  );
}
