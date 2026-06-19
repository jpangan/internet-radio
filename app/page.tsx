"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AudioEngine from "@/components/Player";
import Sidebar, { type View } from "@/components/v2/Sidebar";
import MobileNav from "@/components/v2/MobileNav";
import Logo from "@/components/v2/Logo";
import ThemeToggle from "@/components/v2/ThemeToggle";
import MiniPlayer from "@/components/v2/MiniPlayer";
import NowPlaying from "@/components/v2/NowPlaying";
import ShareSheet from "@/components/v2/ShareSheet";
import HomeView from "@/components/v2/HomeView";
import SearchView from "@/components/v2/SearchView";
import BrowseView from "@/components/v2/BrowseView";
import LibraryView from "@/components/v2/LibraryView";
import { useQueryClient, queryKeys, fetchCountriesApi } from "@/lib/queries";
import {
  trackStationSelected,
  trackStationNavigated,
  trackFavoriteAdded,
  trackFavoriteRemoved,
  trackStationShared,
} from "@/lib/analytics";
import type { Country, Station } from "@/lib/types";

const COUNTRY_KEY = "ir-country";
const STATION_KEY = "ir-station";
const FAVORITES_KEY = "ir-favorites";

function readFavorites(): Station[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]");
    if (!Array.isArray(raw)) return [];
    // Migrate from old Favorite[] format ({ station, country }) to Station[]
    return raw.map((item: Station | { station: Station }) =>
      "station" in item && item.station ? item.station : item as Station
    );
  } catch { return []; }
}

export default function App() {
  const queryClient = useQueryClient();
  const hostRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1200);

  const [view, setView] = useState<View>("home");
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [playContext, setPlayContext] = useState<Station[]>([]);
  const [npOpen, setNpOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [favorites, setFavorites] = useState<Station[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pendingUuid, setPendingUuid] = useState<string | null>(null);

  // Responsive: observe host width
  useEffect(() => {
    const el = hostRef.current;
    if (!el || !window.ResizeObserver) return;
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const compact = width < 760;

  // Hydrate favorites
  useEffect(() => { setFavorites(readFavorites()); }, []);

  // Resolve shared URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const countryParam = params.get("country");
    const stationParam = params.get("station");
    if (!countryParam || !stationParam) return;
    history.replaceState(null, "", window.location.pathname);
    queryClient.fetchQuery({ queryKey: queryKeys.countries, queryFn: fetchCountriesApi }).then((countries: Country[]) => {
      const found = countries.find((c) => c.iso_3166_1 === countryParam || c.name.toLowerCase() === countryParam.toLowerCase());
      const country = found ?? { name: countryParam, stationcount: 0, iso_3166_1: countryParam };
      localStorage.setItem(COUNTRY_KEY, JSON.stringify(country));
      setPendingUuid(stationParam);
    }).catch(() => {});
  }, [queryClient]);

  // Restore session
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("country") && params.get("station")) return;
    try {
      const savedStation = localStorage.getItem(STATION_KEY);
      if (savedStation) {
        const s: Station = JSON.parse(savedStation);
        setCurrentStation(s);
      }
    } catch {}
  }, []);

  // Nav: play from a list
  const handlePlay = useCallback((s: Station, list: Station[]) => {
    setCurrentStation(s);
    setPlayContext(list);
    localStorage.setItem(STATION_KEY, JSON.stringify(s));
    trackStationSelected(s, { name: s.country, stationcount: 0, iso_3166_1: s.countrycode ?? "" });
  }, []);

  // Open now-playing and start playing
  const handleOpen = useCallback((s: Station, list: Station[]) => {
    setCurrentStation(s);
    setPlayContext(list);
    setNpOpen(true);
    localStorage.setItem(STATION_KEY, JSON.stringify(s));
    trackStationSelected(s, { name: s.country, stationcount: 0, iso_3166_1: s.countrycode ?? "" });
  }, []);

  const currentIndex = currentStation && playContext.length > 0
    ? playContext.findIndex((s) => s.stationuuid === currentStation.stationuuid)
    : -1;

  const handlePrev = useCallback(() => {
    if (!currentStation || playContext.length === 0) return;
    const idx = playContext.findIndex((s) => s.stationuuid === currentStation.stationuuid);
    if (idx === -1) return;
    const next = playContext[(idx - 1 + playContext.length) % playContext.length];
    setCurrentStation(next);
    localStorage.setItem(STATION_KEY, JSON.stringify(next));
    trackStationNavigated(next, "prev");
  }, [currentStation, playContext]);

  const handleNext = useCallback(() => {
    if (!currentStation || playContext.length === 0) return;
    const idx = playContext.findIndex((s) => s.stationuuid === currentStation.stationuuid);
    if (idx === -1) return;
    const next = playContext[(idx + 1) % playContext.length];
    setCurrentStation(next);
    localStorage.setItem(STATION_KEY, JSON.stringify(next));
    trackStationNavigated(next, "next");
  }, [currentStation, playContext]);

  const isFav = currentStation ? favorites.some((f) => f.stationuuid === currentStation.stationuuid) : false;

  const handleToggleFav = useCallback(() => {
    if (!currentStation) return;
    const already = favorites.some((f) => f.stationuuid === currentStation.stationuuid);
    const next = already
      ? favorites.filter((f) => f.stationuuid !== currentStation.stationuuid)
      : [currentStation, ...favorites];
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    const countryObj: Country = { name: currentStation.country, stationcount: 0, iso_3166_1: currentStation.countrycode ?? "" };
    if (already) trackFavoriteRemoved(currentStation, countryObj);
    else trackFavoriteAdded(currentStation, countryObj);
  }, [currentStation, favorites]);

  const handleRemoveFav = useCallback((s: Station) => {
    const next = favorites.filter((f) => f.stationuuid !== s.stationuuid);
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  }, [favorites]);

  const handleShare = useCallback(() => {
    if (!currentStation) return;
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("country", currentStation.countrycode ?? currentStation.country);
    url.searchParams.set("station", currentStation.stationuuid);
    setShareUrl(url.toString());
    setShareOpen(true);
    trackStationShared(currentStation, { name: currentStation.country, stationcount: 0, iso_3166_1: currentStation.countrycode ?? "" });
  }, [currentStation]);

  const viewProps = { current: currentStation, playing: isPlaying, onPlay: handlePlay, onOpen: handleOpen };

  return (
    <div
      ref={hostRef}
      style={{
        position: "relative", width: "100%", height: "100dvh", overflow: "hidden",
        display: "flex", background: "var(--v-bg)", color: "var(--v-fg)",
        fontFamily: "var(--v-font)",
      }}
    >
      <AudioEngine
        station={currentStation}
        stationList={playContext}
        currentIndex={currentIndex}
        onPrevious={handlePrev}
        onNext={handleNext}
        onPlayingChange={setIsPlaying}
      >
        {/* Desktop sidebar */}
        {!compact && (
          <Sidebar view={view} onNav={setView} favCount={favorites.length} />
        )}

        {/* Main column */}
        <div style={{
          flex: 1, minWidth: 0, display: "flex", flexDirection: "column",
          position: "relative", minHeight: 0,
        }}>
          {/* Mobile top row */}
          {compact && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "max(16px, env(safe-area-inset-top)) 18px 6px",
              background: "var(--v-bg)",
            }}>
              <Logo />
              <ThemeToggle />
            </div>
          )}

          {/* Scrollable content */}
          <main style={{
            flex: 1, minHeight: 0, overflowY: "auto",
            padding: compact ? "8px 18px 0" : "0 32px 0",
            paddingBottom: currentStation
              ? (compact ? 150 : 80)
              : (compact ? 80 : 28),
          }}>
            <div style={{ maxWidth: 1180, margin: "0 auto" }}>
              {view === "home" && <HomeView {...viewProps} />}
              {view === "search" && <SearchView {...viewProps} />}
              {view === "browse" && <BrowseView {...viewProps} />}
              {view === "library" && (
                <LibraryView
                  favorites={favorites}
                  current={currentStation}
                  playing={isPlaying}
                  onPlay={handlePlay}
                  onOpen={handleOpen}
                  onRemove={handleRemoveFav}
                />
              )}
            </div>
          </main>

          {/* Docked player + mobile nav */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 45 }}>
            {currentStation && (
              <MiniPlayer
                station={currentStation}
                onNext={handleNext}
                onExpand={() => setNpOpen(true)}
                isFav={isFav}
                onFav={handleToggleFav}
              />
            )}
            {compact && <MobileNav view={view} onNav={setView} favCount={favorites.length} />}
          </div>
        </div>

        {/* Full-screen Now Playing */}
        <NowPlaying
          station={currentStation}
          open={npOpen}
          onClose={() => setNpOpen(false)}
          onNext={handleNext}
          onPrev={handlePrev}
          isFav={isFav}
          onFav={handleToggleFav}
          onShare={handleShare}
        />

        {/* Share sheet */}
        <ShareSheet
          open={shareOpen}
          station={currentStation}
          onClose={() => setShareOpen(false)}
          url={shareUrl}
        />
      </AudioEngine>
    </div>
  );
}
