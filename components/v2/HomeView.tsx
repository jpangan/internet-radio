"use client";

import { useMemo } from "react";
import TopBar from "./TopBar";
import Shelf from "./Shelf";
import StationCard from "./StationCard";
import Cover from "./Cover";
import PlayFab from "./PlayFab";
import { useTopStations, useStationsByTag } from "@/lib/queries";
import { gradientFor, initials } from "@/lib/cover";
import { parseTags } from "@/lib/utils";
import FlagIcon from "@/components/FlagIcon";
import type { Station } from "@/lib/types";

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function Hero({ station, playing, onPlay, onOpen }: {
  station: Station; playing: boolean;
  onPlay: (s: Station) => void; onOpen: (s: Station) => void;
}) {
  const g = gradientFor(station.name);
  const tags = parseTags(station.tags, 3);
  const isPlaying = playing;

  return (
    <div
      onClick={() => onOpen(station)}
      style={{
        position: "relative", borderRadius: "var(--v-r-xl)", overflow: "hidden", cursor: "pointer",
        padding: "clamp(20px, 4vw, 36px)", marginBottom: 26, minHeight: 220,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        background: g.css, boxShadow: "var(--v-shadow-card)",
        animation: "v-pop-in .5s var(--v-ease)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.45))" }} />
      <div style={{ position: "relative" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", borderRadius: 99,
          background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
          color: "#fff", fontSize: 11.5, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: 99, background: "#fff", boxShadow: "0 0 8px #fff" }} />
          Top Station Today
        </div>
        <h2 style={{
          margin: 0, fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 820,
          letterSpacing: "-0.035em", color: "#fff", lineHeight: 1.02,
          textShadow: "0 2px 24px rgba(0,0,0,0.3)",
        }}>
          {station.name}
        </h2>
        <p style={{
          margin: "10px 0 18px", color: "rgba(255,255,255,0.82)", fontSize: 15,
          fontWeight: 500, display: "flex", alignItems: "center", gap: 8,
        }}>
          {station.countrycode && (
            <FlagIcon code={station.countrycode} className="inline-block h-4 w-5 rounded-sm object-cover" />
          )}
          {station.country}
          {tags.length > 0 && ` · ${tags.join(" · ")}`}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onPlay(station); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 9, padding: "12px 24px",
              borderRadius: 99, border: "none", cursor: "pointer",
              background: "#fff", color: "#111", fontSize: 15, fontWeight: 750,
              boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
            }}
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1.5"/><rect x="14" y="4" width="4" height="16" rx="1.5"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            )}
            {isPlaying ? "Pause" : "Listen Now"}
          </button>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600 }}>
            {station.votes.toLocaleString()} votes
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickTile({ station, playing, onPlay, onOpen }: {
  station: Station; playing: boolean;
  onPlay: (s: Station) => void; onOpen: (s: Station) => void;
}) {
  return (
    <div
      onClick={() => onOpen(station)}
      style={{
        display: "flex", alignItems: "center", gap: 12, borderRadius: "var(--v-r-md)",
        overflow: "hidden", cursor: "pointer", height: 56,
        background: "var(--v-elev-2)", transition: "background .18s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--v-elev-3)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--v-elev-2)")}
    >
      <Cover station={station} size={56} radius="0" showInitials playing={playing} />
      <div style={{
        flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: 700, color: "var(--v-fg)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>
        {station.name}
      </div>
      <div style={{ marginRight: 12 }}>
        <PlayFab
          playing={playing}
          size={36}
          onClick={(e) => { e.stopPropagation(); onPlay(station); }}
        />
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{
      width: 148, height: 190, borderRadius: "var(--v-r-lg)",
      background: "var(--v-elev-2)", flexShrink: 0,
    }} />
  );
}

const SKELETON_CARDS = [1, 2, 3, 4, 5];

interface HomeViewProps {
  current: Station | null;
  playing: boolean;
  onPlay: (s: Station, list: Station[]) => void;
  onOpen: (s: Station, list: Station[]) => void;
}

export default function HomeView({ current, playing, onPlay, onOpen }: HomeViewProps) {
  const { data: topVotes } = useTopStations("votes");
  const { data: trending } = useTopStations("clicktrend");
  const { data: popular } = useTopStations("clickcount");
  const { data: jazzSoul } = useStationsByTag("jazz");

  const heroStation = topVotes?.[0] ?? null;

  const trendingList = useMemo(() => trending ?? [], [trending]);
  const popularList = useMemo(() => popular ?? [], [popular]);
  const mostVotedList = useMemo(() => topVotes ?? [], [topVotes]);
  const jazzList = useMemo(() => jazzSoul ?? [], [jazzSoul]);

  const isActive = (s: Station) => current?.stationuuid === s.stationuuid && playing;

  return (
    <div style={{ animation: "v-fade .35s ease" }}>
      <TopBar title={greeting()} />

      {heroStation ? (
        <Hero
          station={heroStation}
          playing={isActive(heroStation)}
          onPlay={(s) => onPlay(s, mostVotedList)}
          onOpen={(s) => onOpen(s, mostVotedList)}
        />
      ) : (
        <div style={{
          borderRadius: "var(--v-r-xl)", height: 220, background: "var(--v-elev-2)",
          marginBottom: 26, animation: "v-pop-in .5s var(--v-ease)",
        }} />
      )}

      {/* Quick-tile grid */}
      {trendingList.length > 0 && (
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 10, marginBottom: 30,
        }}>
          {trendingList.slice(0, 6).map((s) => (
            <QuickTile
              key={s.stationuuid}
              station={s}
              playing={isActive(s)}
              onPlay={(st) => onPlay(st, trendingList)}
              onOpen={(st) => onOpen(st, trendingList)}
            />
          ))}
        </div>
      )}

      <Shelf title="Trending now">
        {trendingList.length > 0
          ? trendingList.map((s) => (
              <StationCard key={s.stationuuid} station={s} playing={isActive(s)}
                onPlay={(st) => onPlay(st, trendingList)} onOpen={(st) => onOpen(st, trendingList)} />
            ))
          : SKELETON_CARDS.map((i) => <SkeletonCard key={i} />)}
      </Shelf>

      <Shelf title="Most popular">
        {popularList.length > 0
          ? popularList.map((s) => (
              <StationCard key={s.stationuuid} station={s} playing={isActive(s)}
                onPlay={(st) => onPlay(st, popularList)} onOpen={(st) => onOpen(st, popularList)} />
            ))
          : SKELETON_CARDS.map((i) => <SkeletonCard key={i} />)}
      </Shelf>

      {jazzList.length > 0 && (
        <Shelf title="Jazz &amp; Soul">
          {jazzList.map((s) => (
            <StationCard key={s.stationuuid} station={s} playing={isActive(s)}
              onPlay={(st) => onPlay(st, jazzList)} onOpen={(st) => onOpen(st, jazzList)} />
          ))}
        </Shelf>
      )}

      <Shelf title="Most voted">
        {mostVotedList.length > 0
          ? mostVotedList.map((s) => (
              <StationCard key={s.stationuuid} station={s} playing={isActive(s)}
                onPlay={(st) => onPlay(st, mostVotedList)} onOpen={(st) => onOpen(st, mostVotedList)} />
            ))
          : SKELETON_CARDS.map((i) => <SkeletonCard key={i} />)}
      </Shelf>
    </div>
  );
}
