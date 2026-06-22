"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import TopBar from "./TopBar";
import CountryCard from "./CountryCard";
import ListRow from "./ListRow";
import { useCountries, useInfiniteStations } from "@/lib/queries";
import {
  trackStationSearched,
  trackCountryBrowsed,
  trackLoadMore,
} from "@/lib/analytics";
import type { Country, Station } from "@/lib/types";
import FlagIcon from "@/components/FlagIcon";

const MAX_RECENT_SEARCHES = 5;
const RECENT_SEARCHES_KEY = "internet-radio:recent-searches";

function getRecentSearches(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveRecentSearch(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return;
  const recent = getRecentSearches().filter((q) => q !== trimmed);
  recent.unshift(trimmed);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent.slice(0, MAX_RECENT_SEARCHES)));
}

function removeRecentSearch(query: string) {
  const recent = getRecentSearches().filter((q) => q !== query);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent));
}

interface SearchViewProps {
  current: Station | null;
  playing: boolean;
  onPlay: (s: Station, list: Station[]) => void;
  onOpen: (s: Station, list: Station[]) => void;
}

function CountryDrill({ country, current, playing, onPlay, onOpen, onBack }: {
  country: Country;
  current: Station | null;
  playing: boolean;
  onPlay: (s: Station, list: Station[]) => void;
  onOpen: (s: Station, list: Station[]) => void;
  onBack: () => void;
}) {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteStations(country.iso_3166_1 || country.name, "");
  const list = Array.from(
    new Map((data?.pages.flat() ?? []).map((s) => [s.stationuuid, s])).values()
  );

  return (
    <div style={{ animation: "v-fade .3s ease" }}>
      <TopBar title={country.name} onBack={onBack} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 4px 18px", color: "var(--v-fg-3)", fontSize: 14 }}>
        <FlagIcon code={country.iso_3166_1} className="inline-block h-4 w-5 rounded-sm object-cover" />
        {country.stationcount.toLocaleString()} stations
        {status === "success" && list.length > 0 && ` · showing ${list.length}`}
      </div>
      {status === "pending" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[1,2,3,4,5].map((i) => (
            <div key={i} style={{ height: 60, borderRadius: "var(--v-r-md)", background: "var(--v-elev-2)" }} />
          ))}
        </div>
      )}
      {list.map((s, i) => (
        <ListRow key={s.stationuuid} station={s} index={i + 1} playing={playing}
          active={current?.stationuuid === s.stationuuid}
          onPlay={(st) => onPlay(st, list)} onOpen={(st) => onOpen(st, list)} />
      ))}
      {hasNextPage && (
        <button
          type="button"
          onClick={() => { fetchNextPage(); trackLoadMore({ kind: "country", label: country.name, page: (data?.pages.length ?? 0) + 1 }); }}
          disabled={isFetchingNextPage}
          style={{
            display: "block", width: "100%", margin: "16px 0 8px",
            padding: "13px 0", borderRadius: "var(--v-r-md)", border: "1px solid var(--v-hairline)",
            background: "var(--v-elev-2)", color: "var(--v-fg-2)", fontSize: 14, fontWeight: 650,
            cursor: isFetchingNextPage ? "default" : "pointer", opacity: isFetchingNextPage ? 0.6 : 1,
            fontFamily: "var(--v-font)",
          }}
        >
          {isFetchingNextPage ? "Loading…" : "Load more"}
        </button>
      )}
    </div>
  );
}

export default function SearchView({ current, playing, onPlay, onOpen }: SearchViewProps) {
  const [q, setQ] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    setRecentSearches(getRecentSearches());
  }, []);

  const { data: countries } = useCountries();
  const {
    data: searchData, status: searchStatus,
    fetchNextPage: searchFetchNextPage,
    hasNextPage: searchHasNextPage,
    isFetchingNextPage: searchIsFetchingNextPage,
  } = useInfiniteStations(q.trim() ? "_" : null, q.trim());
  const searchResults = Array.from(
    new Map((searchData?.pages.flat() ?? []).map((s) => [s.stationuuid, s])).values()
  );

  const countryMatches = q.trim() && countries
    ? countries.filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()))
    : [];

  // Track searches once they settle (debounced), save to recent searches
  const resultCountRef = useRef(0);
  resultCountRef.current = searchResults.length;
  useEffect(() => {
    const query = q.trim();
    if (!query) return;
    const t = setTimeout(() => {
      trackStationSearched(query, resultCountRef.current);
      saveRecentSearch(query);
      setRecentSearches(getRecentSearches());
    }, 800);
    return () => clearTimeout(t);
  }, [q]);

  const handleSelectCountry = useCallback((c: Country) => {
    setSelectedCountry(c);
    trackCountryBrowsed(c, "search");
  }, []);

  const handleRecentSearch = useCallback((term: string) => {
    setQ(term);
    setInputFocused(false);
    inputRef.current?.blur();
  }, []);

  const handleRemoveRecentSearch = useCallback((term: string) => {
    removeRecentSearch(term);
    setRecentSearches(getRecentSearches());
  }, []);

  const showRecentSearches = inputFocused && !q.trim() && recentSearches.length > 0;

  if (selectedCountry) {
    return (
      <CountryDrill
        country={selectedCountry}
        current={current}
        playing={playing}
        onPlay={onPlay}
        onOpen={onOpen}
        onBack={() => setSelectedCountry(null)}
      />
    );
  }

  return (
    <div style={{ animation: "v-fade .35s ease" }}>
      <TopBar title="Search" />

      {/* Search input */}
      <div style={{ position: "relative", marginBottom: 24, maxWidth: 560 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--v-fg-3)", pointerEvents: "none", zIndex: 1 }}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => setInputFocused(false), 150)}
          placeholder="Stations, genres, countries…"
          style={{
            width: "100%", padding: "14px 16px 14px 46px", fontSize: 16,
            fontFamily: "var(--v-font)", fontWeight: 500,
            color: "var(--v-fg)", background: "var(--v-elev-2)",
            border: "1px solid var(--v-hairline)",
            borderRadius: "var(--v-r-md)",
            outline: "none",
          }}
        />
        {showRecentSearches && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
            background: "var(--v-mat-chrome)",
            backdropFilter: "var(--v-mat-blur)",
            WebkitBackdropFilter: "var(--v-mat-blur)",
            border: "1px solid var(--v-hairline)",
            borderRadius: "var(--v-r-md)",
            overflow: "hidden", zIndex: 10,
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            animation: "recent-in 0.18s cubic-bezier(0.32,0.72,0,1) both",
          }}>
            {recentSearches.map((term, i) => (
              <div
                key={term}
                style={{
                  display: "flex", alignItems: "center",
                  borderTop: i > 0 ? "1px solid var(--v-hairline)" : "none",
                }}
              >
                <button
                  type="button"
                  onMouseDown={() => handleRecentSearch(term)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, flex: 1,
                    padding: "9px 8px 9px 14px", textAlign: "left",
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--v-fg-2)", fontSize: 13.5, fontFamily: "var(--v-font)",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: "var(--v-fg-4)", flexShrink: 0 }}>
                    <path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>
                  </svg>
                  {term}
                </button>
                <button
                  type="button"
                  onMouseDown={() => handleRemoveRecentSearch(term)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "9px 13px", background: "none", border: "none",
                    cursor: "pointer", color: "var(--v-fg-4)", flexShrink: 0,
                  }}
                  aria-label={`Remove "${term}" from recent searches`}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {q.trim() ? (
        (searchResults.length > 0 || countryMatches.length > 0) ? (
          <div>
            {countryMatches.length > 0 && (
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--v-fg-3)", margin: "0 4px 8px" }}>Countries</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                  {countryMatches.slice(0, 6).map((c) => (
                    <CountryCard key={c.iso_3166_1} country={c} onClick={() => handleSelectCountry(c)} />
                  ))}
                </div>
              </div>
            )}
            {searchStatus === "pending" && (
              <div style={{ fontSize: 13, color: "var(--v-fg-3)", padding: "12px 4px" }}>Searching…</div>
            )}
            {searchResults.length > 0 && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--v-fg-3)", margin: "0 4px 8px" }}>
                  {searchResults.length} station{searchResults.length !== 1 ? "s" : ""}
                </div>
                {searchResults.map((s, i) => (
                  <ListRow key={s.stationuuid} station={s} index={i + 1} playing={playing}
                    active={current?.stationuuid === s.stationuuid}
                    onPlay={(st) => onPlay(st, searchResults)} onOpen={(st) => onOpen(st, searchResults)} />
                ))}
                {searchHasNextPage && (
                  <button
                    type="button"
                    onClick={() => { searchFetchNextPage(); trackLoadMore({ kind: "search", label: q.trim(), page: (searchData?.pages.length ?? 0) + 1 }); }}
                    disabled={searchIsFetchingNextPage}
                    style={{
                      display: "block", width: "100%", margin: "16px 0 8px",
                      padding: "13px 0", borderRadius: "var(--v-r-md)", border: "1px solid var(--v-hairline)",
                      background: "var(--v-elev-2)", color: "var(--v-fg-2)", fontSize: 14, fontWeight: 650,
                      cursor: searchIsFetchingNextPage ? "default" : "pointer",
                      opacity: searchIsFetchingNextPage ? 0.6 : 1,
                      fontFamily: "var(--v-font)",
                    }}
                  >
                    {searchIsFetchingNextPage ? "Loading…" : "Load more"}
                  </button>
                )}
              </div>
            )}
          </div>
        ) : searchStatus !== "pending" ? (
          <div style={{ padding: "60px 0", textAlign: "center", color: "var(--v-fg-3)" }}>
            <div style={{ fontSize: 16, fontWeight: 650, color: "var(--v-fg-2)" }}>No matches for &ldquo;{q}&rdquo;</div>
            <div style={{ fontSize: 14, marginTop: 6 }}>Try a genre like &ldquo;jazz&rdquo; or a country like &ldquo;Japan&rdquo;.</div>
          </div>
        ) : (
          <div style={{ fontSize: 13, color: "var(--v-fg-3)", padding: "12px 4px" }}>Searching…</div>
        )
      ) : null}
    </div>
  );
}
