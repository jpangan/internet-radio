"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import CountryCard from "./CountryCard";
import GenreTile, { GENRES } from "./GenreTile";
import ListRow from "./ListRow";
import { useCountries, useInfiniteStations } from "@/lib/queries";
import { trackCountryBrowsed, trackGenreSelected, trackLoadMore } from "@/lib/analytics";
import type { Country, Station } from "@/lib/types";
import FlagIcon from "@/components/FlagIcon";

interface BrowseViewProps {
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

function GenreDrill({ tag, name, current, playing, onPlay, onOpen, onBack }: {
  tag: string;
  name: string;
  current: Station | null;
  playing: boolean;
  onPlay: (s: Station, list: Station[]) => void;
  onOpen: (s: Station, list: Station[]) => void;
  onBack: () => void;
}) {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteStations("_", tag);
  const list = Array.from(
    new Map((data?.pages.flat() ?? []).map((s) => [s.stationuuid, s])).values()
  );

  return (
    <div style={{ animation: "v-fade .3s ease" }}>
      <TopBar title={name} onBack={onBack} />
      <div style={{ margin: "0 4px 18px", color: "var(--v-fg-3)", fontSize: 14 }}>
        {status === "success" && list.length > 0 ? `${list.length} stations` : "Loading stations…"}
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
          onClick={() => { fetchNextPage(); trackLoadMore({ kind: "search", label: tag, page: (data?.pages.length ?? 0) + 1 }); }}
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

export default function BrowseView({ current, playing, onPlay, onOpen }: BrowseViewProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<{ tag: string; name: string } | null>(null);
  const { data: countries, status } = useCountries();

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

  if (selectedGenre) {
    return (
      <GenreDrill
        tag={selectedGenre.tag}
        name={selectedGenre.name}
        current={current}
        playing={playing}
        onPlay={onPlay}
        onOpen={onOpen}
        onBack={() => setSelectedGenre(null)}
      />
    );
  }

  return (
    <div style={{ animation: "v-fade .35s ease" }}>
      <TopBar title="Browse" />

      <h2 style={{ margin: "0 4px 14px", fontSize: 21, fontWeight: 750, letterSpacing: "-0.02em", color: "var(--v-fg)" }}>
        Browse all genres
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 30 }}>
        {GENRES.map((genre) => (
          <GenreTile
            key={genre.tag}
            genre={genre}
            onClick={() => { trackGenreSelected(genre.tag); setSelectedGenre({ tag: genre.tag, name: genre.name }); }}
          />
        ))}
      </div>

      <h2 style={{ margin: "0 4px 14px", fontSize: 21, fontWeight: 750, letterSpacing: "-0.02em", color: "var(--v-fg)" }}>
        Browse by country
      </h2>
      {status === "pending" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {[1,2,3,4,5,6,7,8].map((i) => (
            <div key={i} style={{ height: 72, borderRadius: "var(--v-r-md)", background: "var(--v-elev-2)" }} />
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {(countries ?? []).map((c) => (
            <CountryCard key={c.iso_3166_1} country={c} onClick={() => { setSelectedCountry(c); trackCountryBrowsed(c, "browse"); }} />
          ))}
        </div>
      )}
    </div>
  );
}
