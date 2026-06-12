"use client";

import { useEffect, useMemo, useState } from "react";
import type { Country, Station } from "@/lib/types";
import {
  countryCodeToFlag,
  dedupeStations,
  formatBitrate,
  parseTags,
} from "@/lib/utils";
import StationFavicon from "./StationFavicon";

interface ExplorerProps {
  currentStation: Station | null;
  onSelectStation: (station: Station, list: Station[]) => void;
  className?: string;
}

export default function Explorer({
  currentStation,
  onSelectStation,
  className = "",
}: ExplorerProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [filter, setFilter] = useState("");
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStations, setLoadingStations] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/countries")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load countries");
        return res.json();
      })
      .then((data: Country[]) => {
        setCountries(data);
        setLoadingCountries(false);
      })
      .catch(() => {
        setError("Could not load countries");
        setLoadingCountries(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    setLoadingStations(true);
    setStations([]);
    fetch(`/api/stations/${encodeURIComponent(selectedCountry.name)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load stations");
        return res.json();
      })
      .then((data: Station[]) => {
        setStations(dedupeStations(data));
        setLoadingStations(false);
      })
      .catch(() => {
        setError("Could not load stations");
        setLoadingStations(false);
      });
  }, [selectedCountry]);

  const filteredCountries = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => c.name.toLowerCase().includes(q));
  }, [countries, filter]);

  const filteredStations = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return stations;
    return stations.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.tags.toLowerCase().includes(q)
    );
  }, [stations, filter]);

  const handleBack = () => {
    setSelectedCountry(null);
    setStations([]);
    setError(null);
  };

  const isCurrentStation = (station: Station) =>
    currentStation?.url_resolved === station.url_resolved &&
    currentStation?.name === station.name;

  return (
    <aside
      className={`h-full w-full shrink-0 flex-col border-r border-[var(--border-subtle)] bg-[var(--sidebar)] md:w-[300px] lg:w-[320px] ${className}`}
    >
      <div
        className="shrink-0 border-b border-[var(--border-subtle)] px-4 pb-3"
        style={{ paddingTop: "max(0.875rem, env(safe-area-inset-top))" }}
      >
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--accent)_20%,var(--surface))] text-[var(--accent)]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
              <circle cx="12" cy="12" r="2" />
              <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-tight">Internet Radio</h1>
            <p className="text-[11px] text-[var(--muted)]">Browse worldwide stations</p>
          </div>
        </div>

        <div className="relative">
          <svg
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            autoCorrect="off"
            placeholder={
              selectedCountry ? "Search stations…" : "Search countries…"
            }
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2.5 pr-3 pl-9 text-base text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] md:text-sm"
          />
        </div>
      </div>

      {selectedCountry && (
        <button
          type="button"
          onClick={handleBack}
          className="flex shrink-0 min-h-10 w-full items-center gap-2 border-b border-[var(--border-subtle)] px-4 py-2.5 text-sm text-[var(--accent)] transition-colors hover:bg-[var(--surface-hover)]"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="truncate font-medium">
            {countryCodeToFlag(selectedCountry.iso_3166_1)} {selectedCountry.name}
          </span>
        </button>
      )}

      <div className="flex-1 overflow-y-auto overscroll-contain px-2 py-2 [-webkit-overflow-scrolling:touch]">
        {error && (
          <p className="mx-2 mb-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        {!selectedCountry ? (
          loadingCountries ? (
            <LoadingRows label="Loading countries…" />
          ) : (
            <ul className="space-y-0.5">
              {filteredCountries.map((country) => (
                <li key={country.name}>
                  <button
                    type="button"
                    onClick={() => {
                      setFilter("");
                      setSelectedCountry(country);
                      setError(null);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-[var(--surface-hover)] active:bg-[var(--surface)]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--surface)] text-lg">
                      {countryCodeToFlag(country.iso_3166_1)}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">
                      {country.name}
                    </span>
                    <span className="shrink-0 rounded-md bg-[var(--surface)] px-2 py-0.5 text-[11px] tabular-nums text-[var(--muted)]">
                      {country.stationcount}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )
        ) : loadingStations ? (
          <LoadingRows label="Loading stations…" />
        ) : (
          <ul className="space-y-1">
            {filteredStations.map((station) => {
              const active = isCurrentStation(station);
              return (
                <li key={station.stationuuid}>
                  <button
                    type="button"
                    onClick={() => onSelectStation(station, stations)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                      active
                        ? "bg-[color-mix(in_srgb,var(--accent)_14%,var(--surface))] ring-1 ring-[color-mix(in_srgb,var(--accent)_40%,transparent)]"
                        : "hover:bg-[var(--surface-hover)] active:bg-[var(--surface)]"
                    }`}
                  >
                    <StationFavicon
                      src={station.favicon}
                      alt={station.name}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-sm ${active ? "font-semibold" : "font-medium"}`}>
                        {station.name}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-1">
                        {parseTags(station.tags).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-[var(--background)] px-1.5 py-px text-[10px] text-[var(--muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                        {station.bitrate > 0 && (
                          <span className="text-[10px] text-[var(--muted)]">
                            {formatBitrate(station.bitrate)}
                          </span>
                        )}
                      </div>
                    </div>
                    {active && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}

function LoadingRows({ label }: { label: string }) {
  return (
    <div className="space-y-2 px-2 py-1">
      <p className="px-2 text-xs text-[var(--muted)]">{label}</p>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-12 animate-pulse rounded-xl bg-[var(--surface)]"
          style={{ opacity: 1 - i * 0.12 }}
        />
      ))}
    </div>
  );
}
