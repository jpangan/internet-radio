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
import Toast, { type ToastMessage } from "@/components/v2/Toast";
import HomeView from "@/components/v2/HomeView";
import SearchView from "@/components/v2/SearchView";
import BrowseView from "@/components/v2/BrowseView";
import LibraryView from "@/components/v2/LibraryView";
import SplashScreen from "@/components/v2/SplashScreen";
import { useQueryClient, queryKeys, fetchCountriesApi } from "@/lib/queries";
import {
  trackStationSelected,
  trackStationNavigated,
  trackFavoriteAdded,
  trackFavoriteRemoved,
  trackStationShared,
  trackNowPlayingOpened,
  trackViewChanged,
  trackSharedLinkOpened,
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

  const [splash, setSplash] = useState(false);
  const [view, setView] = useState<View>("home");
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [playContext, setPlayContext] = useState<Station[]>([]);
  const [npOpen, setNpOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [favorites, setFavorites] = useState<Station[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pendingUuid, setPendingUuid] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastId = useRef(0);

  // Responsive: observe host width
  useEffect(() => {
    const el = hostRef.current;
    if (!el || !window.ResizeObserver) return;
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const compact = width < 760;

  // Hydrate favorites + trigger splash after hydration
  useEffect(() => {
    setFavorites(readFavorites());
    setSplash(true);
  }, []);

  // Resolve shared URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const countryParam = params.get("country");
    const stationParam = params.get("station");
    if (!countryParam || !stationParam) return;
    trackSharedLinkOpened({ country: countryParam, station_uuid: stationParam });
    history.replaceState(null, "", window.location.pathname);
    queryClient.fetchQuery({ queryKey: queryKeys.countries, queryFn: fetchCountriesApi }).then((countries: Country[]) => {
      const found = countries.find((c) => c.iso_3166_1 === countryParam || c.name.toLowerCase() === countryParam.toLowerCase());
      const country = found ?? { name: countryParam, stationcount: 0, iso_3166_1: countryParam };
      localStorage.setItem(COUNTRY_KEY, JSON.stringify(country));
      setPendingUuid(stationParam);
    }).catch(() => {});
  }, [queryClient]);

  // Resolve shared station UUID → fetch full station and open NowPlaying
  useEffect(() => {
    if (!pendingUuid) return;
    setPendingUuid(null);
    fetch(`/api/station/${encodeURIComponent(pendingUuid)}`)
      .then((r) => r.ok ? r.json() : null)
      .then((station) => {
        if (!station) return;
        setCurrentStation(station);
        setPlayContext([station]);
        setNpOpen(true);
        localStorage.setItem(STATION_KEY, JSON.stringify(station));
        trackNowPlayingOpened(station, "shared_link");
      })
      .catch(() => {});
  }, [pendingUuid]);

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
    trackStationSelected(s, view);
  }, [view]);

  // Open now-playing and start playing
  const handleOpen = useCallback((s: Station, list: Station[]) => {
    setCurrentStation(s);
    setPlayContext(list);
    setNpOpen(true);
    localStorage.setItem(STATION_KEY, JSON.stringify(s));
    trackStationSelected(s, view);
    trackNowPlayingOpened(s, view);
  }, [view]);

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

  const showToast = useCallback((text: string, type: ToastMessage["type"]) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, text, type }]);
  }, []);

  const handleToggleFav = useCallback(() => {
    if (!currentStation) return;
    const already = favorites.some((f) => f.stationuuid === currentStation.stationuuid);
    const next = already
      ? favorites.filter((f) => f.stationuuid !== currentStation.stationuuid)
      : [currentStation, ...favorites];
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    if (already) {
      trackFavoriteRemoved(currentStation, "player");
      showToast(`${currentStation.name} removed from your library`, "removed");
    } else {
      trackFavoriteAdded(currentStation, "player");
      showToast(`${currentStation.name} added to your library`, "added");
    }
  }, [currentStation, favorites, showToast]);

  const handleRemoveFav = useCallback((s: Station) => {
    const next = favorites.filter((f) => f.stationuuid !== s.stationuuid);
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    trackFavoriteRemoved(s, "library");
  }, [favorites]);

  // Nav: switch primary view (sidebar / mobile tab bar)
  const handleNav = useCallback((next: View) => {
    setView((prev) => {
      if (next !== prev) trackViewChanged(next, prev);
      return next;
    });
  }, []);

  const handleShare = useCallback(() => {
    if (!currentStation) return;
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("country", currentStation.countrycode ?? currentStation.country);
    url.searchParams.set("station", currentStation.stationuuid);
    setShareUrl(url.toString());
    setShareOpen(true);
    trackStationShared(currentStation, "now_playing");
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
      {splash && <SplashScreen onDone={() => setSplash(false)} />}
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
          <Sidebar view={view} onNav={handleNav} favCount={favorites.length} />
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
              padding: "var(--app-header-pad-top) 18px 10px",
              background: "var(--v-bg)",
              borderBottom: "1px solid var(--v-hairline)",
              flexShrink: 0, zIndex: 30, position: "relative",
            }}>
              <Logo />
              <ThemeToggle />
            </div>
          )}

          {/* Scrollable content */}
          <main style={{
            flex: 1, minHeight: 0, overflowY: "auto",
            padding: compact ? "8px 18px 0" : "0 32px 0",
            paddingTop: compact ? undefined : "max(var(--app-header-pad-top), 24px)",
            paddingBottom: currentStation
              ? (compact ? 150 : 80)
              : (compact ? 80 : 28),
          }}>
            <div style={{ maxWidth: 1180, margin: "0 auto" }}>
              {view === "home" && <HomeView {...viewProps} compact={compact} />}
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
                onExpand={() => { setNpOpen(true); trackNowPlayingOpened(currentStation, "mini_player"); }}
                isFav={isFav}
                onFav={handleToggleFav}
              />
            )}
            {compact && <MobileNav view={view} onNav={handleNav} favCount={favorites.length} />}
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

        {/* Toast notifications */}
        <Toast messages={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

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
