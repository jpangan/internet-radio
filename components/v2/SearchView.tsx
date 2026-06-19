"use client";

import { useState, useCallback } from "react";
import TopBar from "./TopBar";
import CountryCard from "./CountryCard";
import GenreTile, { GENRES } from "./GenreTile";
import ListRow from "./ListRow";
import { useCountries, useInfiniteStations } from "@/lib/queries";
import type { Country, Station } from "@/lib/types";
import FlagIcon from "@/components/FlagIcon";

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
          onClick={() => fetchNextPage()}
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

  const handleGenre = useCallback((tag: string) => {
    setQ(tag);
  }, []);

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
          style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--v-fg-3)", pointerEvents: "none" }}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Stations, genres, countries…"
          style={{
            width: "100%", padding: "14px 16px 14px 46px", fontSize: 16,
            fontFamily: "var(--v-font)", fontWeight: 500,
            color: "var(--v-fg)", background: "var(--v-elev-2)",
            border: "1px solid var(--v-hairline)", borderRadius: "var(--v-r-md)",
            outline: "none",
          }}
        />
      </div>

      {q.trim() ? (
        (searchResults.length > 0 || countryMatches.length > 0) ? (
          <div>
            {countryMatches.length > 0 && (
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--v-fg-3)", margin: "0 4px 8px" }}>Countries</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                  {countryMatches.slice(0, 6).map((c) => (
                    <CountryCard key={c.iso_3166_1} country={c} onClick={() => setSelectedCountry(c)} />
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
                    onClick={() => searchFetchNextPage()}
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
      ) : (
        <div>
          <h2 style={{ margin: "0 4px 14px", fontSize: 21, fontWeight: 750, letterSpacing: "-0.02em", color: "var(--v-fg)" }}>
            Browse by country
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginBottom: 30 }}>
            {(countries ?? []).map((c) => (
              <CountryCard key={c.iso_3166_1} country={c} onClick={() => setSelectedCountry(c)} />
            ))}
          </div>

          <h2 style={{ margin: "0 4px 14px", fontSize: 21, fontWeight: 750, letterSpacing: "-0.02em", color: "var(--v-fg)" }}>
            Browse all genres
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            {GENRES.map((genre) => (
              <GenreTile key={genre.tag} genre={genre} onClick={() => handleGenre(genre.tag)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
