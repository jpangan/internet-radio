"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Country, Station } from "@/lib/types";
import { dedupeStations, formatBitrate, parseTags } from "@/lib/utils";
import StationFavicon from "./StationFavicon";
import FlagIcon from "./FlagIcon";

interface CountryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStation: (station: Station, list: Station[], country: Country) => void;
  currentStation: Station | null;
  initialCountry?: Country | null;
}

type ModalView = "countries" | "stations";

export default function CountryModal({
  isOpen,
  onClose,
  onSelectStation,
  currentStation,
  initialCountry,
}: CountryModalProps) {
  const [view, setView] = useState<ModalView>("countries");
  const [browsingCountry, setBrowsingCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [filter, setFilter] = useState("");
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStations, setLoadingStations] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (countries.length > 0) return;
    setLoadingCountries(true);
    fetch("/api/countries")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: Country[]) => setCountries(data))
      .catch(() => setError("Could not load countries"))
      .finally(() => setLoadingCountries(false));
  }, [countries.length]);

  useEffect(() => {
    if (!isOpen) return;
    setFilter("");
    setError(null);
    if (initialCountry) {
      setBrowsingCountry(initialCountry);
      setView("stations");
    } else {
      setView("countries");
      setBrowsingCountry(null);
    }
    setTimeout(() => inputRef.current?.focus(), 80);
  }, [isOpen, initialCountry]);

  useEffect(() => {
    if (!browsingCountry) return;
    setLoadingStations(true);
    setStations([]);
    setError(null);
    fetch(`/api/stations/${encodeURIComponent(browsingCountry.name)}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: Station[]) => setStations(dedupeStations(data)))
      .catch(() => setError("Could not load stations"))
      .finally(() => setLoadingStations(false));
  }, [browsingCountry]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
        s.name.toLowerCase().includes(q) || s.tags.toLowerCase().includes(q)
    );
  }, [stations, filter]);

  const handleSelectCountry = (country: Country) => {
    setBrowsingCountry(country);
    setView("stations");
    setFilter("");
  };

  const handleBack = () => {
    setView("countries");
    setBrowsingCountry(null);
    setFilter("");
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center sm:p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-sheet w-full sm:max-w-md relative flex flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl"
        style={{
          background: "rgba(10, 10, 20, 0.97)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          border: "1px solid rgba(255,255,255,0.1)",
          maxHeight: "92dvh",
          boxShadow: "0 -8px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Drag handle — mobile */}
        <div className="flex justify-center pt-3 pb-0 sm:hidden shrink-0">
          <div
            className="h-1 w-9 rounded-full"
            style={{ background: "rgba(255,255,255,0.18)" }}
          />
        </div>

        {/* Modal header */}
        <div
          className="shrink-0 flex items-center gap-3 px-4 py-3.5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          {view === "stations" && browsingCountry ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
              style={{ color: "rgba(255,255,255,0.55)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ background: "rgba(124,108,240,0.15)" }}
            >
              <GlobeIcon className="h-4 w-4" style={{ color: "#9488f5" }} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-white leading-tight flex items-center gap-1.5">
              {view === "stations" && browsingCountry ? (
                <>
                  <FlagIcon
                    code={browsingCountry.iso_3166_1}
                    className="h-3.5 w-5 rounded-sm shrink-0 object-cover"
                  />
                  {browsingCountry.name}
                </>
              ) : (
                "Select Country"
              )}
            </h2>
            <p className="text-[11px] mt-px" style={{ color: "rgba(255,255,255,0.3)" }}>
              {view === "countries" && countries.length > 0
                ? `${countries.length} countries available`
                : view === "stations" && stations.length > 0
                  ? `${stations.length} stations`
                  : " "}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "";
              e.currentTarget.style.color = "rgba(255,255,255,0.35)";
            }}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search bar */}
        <div className="shrink-0 px-4 py-3">
          <div className="relative">
            <svg
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
              style={{ color: "rgba(255,255,255,0.3)" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              autoCorrect="off"
              placeholder={
                view === "countries" ? "Search countries…" : "Search stations…"
              }
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded-xl py-2.5 pr-4 pl-9 text-sm text-white outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(124,108,240,0.6)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,108,240,0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.boxShadow = "";
              }}
            />
          </div>
        </div>

        {/* List */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain px-2 [-webkit-overflow-scrolling:touch]"
          style={{ paddingBottom: "max(1.25rem, var(--safe-bottom))" }}
        >
          {error && (
            <div
              className="mx-2 mb-3 rounded-xl px-3 py-2.5 text-sm"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#fca5a5",
              }}
            >
              {error}
            </div>
          )}

          {view === "countries" ? (
            loadingCountries ? (
              <SkeletonRows count={8} />
            ) : (
              <ul className="space-y-0.5">
                {filteredCountries.map((country) => (
                  <li key={country.name}>
                    <button
                      type="button"
                      onClick={() => handleSelectCountry(country)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "")
                      }
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        <FlagIcon
                          code={country.iso_3166_1}
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="flex-1 min-w-0 truncate text-sm font-medium text-white">
                        {country.name}
                      </span>
                      <span
                        className="shrink-0 rounded-lg px-2 py-0.5 text-[11px] tabular-nums"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {country.stationcount}
                      </span>
                      <svg
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: "rgba(255,255,255,0.25)" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )
          ) : loadingStations ? (
            <SkeletonRows count={6} />
          ) : (
            <ul className="space-y-0.5">
              {filteredStations.map((station) => {
                const isActive =
                  currentStation?.stationuuid === station.stationuuid;
                return (
                  <li key={station.stationuuid}>
                    <button
                      type="button"
                      onClick={() =>
                        browsingCountry &&
                        onSelectStation(station, stations, browsingCountry)
                      }
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all"
                      style={
                        isActive
                          ? {
                              background: "rgba(124,108,240,0.14)",
                              boxShadow: "inset 0 0 0 1px rgba(124,108,240,0.3)",
                            }
                          : {}
                      }
                      onMouseEnter={(e) => {
                        if (!isActive)
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = "";
                      }}
                    >
                      <StationFavicon
                        src={station.favicon}
                        alt={station.name}
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className={`truncate text-sm ${isActive ? "font-semibold text-white" : "font-medium"}`}
                          style={
                            isActive
                              ? { color: "white" }
                              : { color: "rgba(255,255,255,0.85)" }
                          }
                        >
                          {station.name}
                        </p>
                        <div className="mt-0.5 flex flex-wrap items-center gap-1">
                          {parseTags(station.tags).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md px-1.5 py-px text-[10px]"
                              style={{
                                background: "rgba(255,255,255,0.06)",
                                color: "rgba(255,255,255,0.35)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                          {station.bitrate > 0 && (
                            <span
                              className="text-[10px]"
                              style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                              {formatBitrate(station.bitrate)}
                            </span>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                          <span
                            className="h-2 w-2 animate-pulse rounded-full"
                            style={{ background: "#7c6cf0" }}
                          />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonRows({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-1.5 px-2 py-1">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-[3.25rem] animate-pulse rounded-xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            opacity: 1 - i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

function GlobeIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
    </svg>
  );
}
