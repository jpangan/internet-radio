"use client";

import { useCallback, useState } from "react";
import Explorer from "@/components/Explorer";
import Player from "@/components/Player";
import type { Station } from "@/lib/types";

type MobilePanel = "explorer" | "player";

export default function Home() {
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [stationList, setStationList] = useState<Station[]>([]);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("explorer");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectStation = useCallback(
    (station: Station, list: Station[]) => {
      setStationList(list);
      setCurrentStation(station);
      setMobilePanel("player");
    },
    []
  );

  const handleClearStation = useCallback(() => {
    setCurrentStation(null);
    setMobilePanel("explorer");
  }, []);

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
        stationList[(index + direction + stationList.length) % stationList.length]
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
    <div className="flex h-dvh flex-col overflow-hidden bg-[var(--background)] md:flex-row">
      <Explorer
        currentStation={currentStation}
        onSelectStation={handleSelectStation}
        className={
          mobilePanel === "explorer"
            ? "flex min-h-0 flex-1 md:flex-none"
            : "hidden md:flex"
        }
      />

      <Player
        station={currentStation}
        stationList={stationList}
        currentIndex={currentIndex}
        onPrevious={() => handleAdjacentStation(-1)}
        onNext={() => handleAdjacentStation(1)}
        onSelectStationAt={handleSelectStationAt}
        onClear={handleClearStation}
        onBrowse={() => setMobilePanel("explorer")}
        onPlayingChange={setIsPlaying}
        className={
          mobilePanel === "player"
            ? "flex min-h-0 flex-1"
            : "hidden md:flex"
        }
      />

      <nav
        className="glass-panel shrink-0 border-t border-[var(--border-subtle)] md:hidden"
        style={{ paddingBottom: "var(--safe-bottom)" }}
        aria-label="Main navigation"
      >
        <div className="flex h-14 px-2">
          <TabButton
            active={mobilePanel === "explorer"}
            onClick={() => setMobilePanel("explorer")}
            label="Browse"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </TabButton>
          <TabButton
            active={mobilePanel === "player"}
            onClick={() => setMobilePanel("player")}
            label="Player"
            badge={Boolean(currentStation && isPlaying)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
            </svg>
          </TabButton>
        </div>
      </nav>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  badge,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  badge?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg text-[11px] font-medium transition-colors ${
        active ? "text-[var(--accent)]" : "text-[var(--muted)]"
      }`}
    >
      {children}
      {label}
      {badge && (
        <span className="absolute top-2 right-[calc(50%-1.1rem)] h-1.5 w-1.5 rounded-full bg-[var(--live)]" />
      )}
    </button>
  );
}
