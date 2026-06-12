"use client";

import { useEffect, useMemo, useState } from "react";
import type { Country, Station } from "@/lib/types";
import {
  countryCodeToFlag,
  formatBitrate,
  parseTags,
} from "@/lib/utils";
import StationFavicon from "./StationFavicon";

interface ExplorerProps {
  onSelectStation: (station: Station) => void;
}

export default function Explorer({ onSelectStation }: ExplorerProps) {
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
        setStations(data);
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

  const handleBack = () => {
    setSelectedCountry(null);
    setStations([]);
    setError(null);
  };

  return (
    <aside className="flex h-full w-[280px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--sidebar)]">
      <div className="border-b border-[var(--border)] px-4 py-3">
        <h2 className="text-sm font-semibold tracking-wide text-[var(--muted)] uppercase">
          Explorer
        </h2>
      </div>

      <div className="border-b border-[var(--border)] p-3">
        <input
          type="text"
          placeholder={
            selectedCountry ? "Filter stations..." : "Filter countries..."
          }
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)]"
        />
      </div>

      {selectedCountry && (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5 text-sm text-[var(--accent)] hover:bg-[var(--surface)]"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          {countryCodeToFlag(selectedCountry.iso_3166_1)} {selectedCountry.name}
        </button>
      )}

      <div className="flex-1 overflow-y-auto">
        {error && (
          <p className="px-4 py-3 text-sm text-red-400">{error}</p>
        )}

        {!selectedCountry ? (
          <>
            {loadingCountries ? (
              <p className="px-4 py-3 text-sm text-[var(--muted)]">
                Loading countries...
              </p>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.name}
                  onClick={() => {
                    setFilter("");
                    setSelectedCountry(country);
                    setError(null);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-[var(--surface)]"
                >
                  <span className="text-lg">
                    {countryCodeToFlag(country.iso_3166_1)}
                  </span>
                  <span className="flex-1 truncate text-sm">{country.name}</span>
                  <span className="text-xs text-[var(--muted)]">
                    {country.stationcount}
                  </span>
                </button>
              ))
            )}
          </>
        ) : (
          <>
            {loadingStations ? (
              <p className="px-4 py-3 text-sm text-[var(--muted)]">
                Loading stations...
              </p>
            ) : (
              stations
                .filter((s) => {
                  const q = filter.trim().toLowerCase();
                  if (!q) return true;
                  return (
                    s.name.toLowerCase().includes(q) ||
                    s.tags.toLowerCase().includes(q)
                  );
                })
                .map((station) => (
                  <button
                    key={`${station.name}-${station.url_resolved}`}
                    onClick={() => onSelectStation(station)}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-[var(--surface)]"
                  >
                    <StationFavicon
                      src={station.favicon}
                      alt={station.name}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {station.name}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-1">
                        {parseTags(station.tags).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[var(--surface)] px-2 py-0.5 text-[10px] text-[var(--muted)]"
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
                  </button>
                ))
            )}
          </>
        )}
      </div>
    </aside>
  );
}
