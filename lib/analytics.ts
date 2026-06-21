import posthog from "posthog-js";
import type { Country, Station } from "./types";

/**
 * Analytics event taxonomy for GhostRadio.
 *
 * Conventions:
 *  - Event names are snake_case `object_action` (e.g. `station_played`).
 *  - Every station-scoped event carries the same `stationProps` shape, so any
 *    station event can be sliced by country, codec, bitrate or tags.
 *  - `source` describes where an interaction originated (a view name such as
 *    "home" / "search" / "browse" / "library", or a surface like "mini_player").
 */

/** Standard property bag attached to every station-scoped event. */
function stationProps(station: Station) {
  return {
    station_name: station.name,
    station_uuid: station.stationuuid,
    country: station.country,
    country_code: station.countrycode,
    language: station.language,
    codec: station.codec,
    bitrate: station.bitrate,
    tags: station.tags,
  };
}

// ─── Playback & station lifecycle ────────────────────────────────────────────

export function trackStationSelected(station: Station, source?: string) {
  posthog.capture("station_selected", { ...stationProps(station), source });
}

export function trackStationPlayed(station: Station) {
  posthog.capture("station_played", stationProps(station));
}

export function trackStationPaused(station: Station) {
  posthog.capture("station_paused", stationProps(station));
}

export function trackStationNavigated(station: Station, direction: "prev" | "next") {
  posthog.capture("station_navigated", { ...stationProps(station), direction });
}

export function trackStreamError(station: Station) {
  posthog.capture("stream_error", stationProps(station));
}

export function trackStreamRetried(station: Station) {
  posthog.capture("stream_retried", stationProps(station));
}

export function trackMuteToggled(station: Station, muted: boolean) {
  posthog.capture("mute_toggled", { ...stationProps(station), muted });
}

export function trackVolumeChanged(station: Station, volume: number) {
  posthog.capture("volume_changed", { ...stationProps(station), volume: Math.round(volume * 100) });
}

// ─── Now Playing surface ─────────────────────────────────────────────────────

export function trackNowPlayingOpened(station: Station, source?: string) {
  posthog.capture("now_playing_opened", { ...stationProps(station), source });
}

export function trackNowPlayingClosed(station: Station, method: "button" | "swipe") {
  posthog.capture("now_playing_closed", { ...stationProps(station), method });
}

// ─── Discovery & navigation ──────────────────────────────────────────────────

export function trackViewChanged(view: string, from?: string) {
  posthog.capture("view_changed", { view, from });
}

export function trackCountryBrowsed(country: Country, source?: string) {
  posthog.capture("country_browsed", {
    country_name: country.name,
    country_code: country.iso_3166_1,
    station_count: country.stationcount,
    source,
  });
}

export function trackGenreSelected(genre: string) {
  posthog.capture("genre_selected", { genre });
}

export function trackStationSearched(query: string, resultCount?: number) {
  posthog.capture("station_searched", { query, result_count: resultCount });
}

export function trackLoadMore(params: { kind: "country" | "search"; label: string; page: number }) {
  posthog.capture("load_more", params);
}

// ─── Library & sharing ───────────────────────────────────────────────────────

export function trackFavoriteAdded(station: Station, source?: string) {
  posthog.capture("favorite_added", { ...stationProps(station), source });
}

export function trackFavoriteRemoved(station: Station, source?: string) {
  posthog.capture("favorite_removed", { ...stationProps(station), source });
}

export function trackStationShared(station: Station, source?: string) {
  posthog.capture("station_shared", { ...stationProps(station), source });
}

export function trackLinkCopied(station: Station) {
  posthog.capture("link_copied", stationProps(station));
}

/** Fired when the app is opened via a shared deep link (?country=&station=). */
export function trackSharedLinkOpened(params: { country: string; station_uuid: string }) {
  posthog.capture("shared_link_opened", params);
}

// ─── Appearance ──────────────────────────────────────────────────────────────

export function trackThemeToggled(theme: string) {
  posthog.capture("theme_toggled", { theme });
}

// ─── Errors ──────────────────────────────────────────────────────────────────

export function trackError(message: string, properties?: Record<string, unknown>) {
  posthog.capture("$exception", {
    $exception_message: message,
    ...properties,
  });
}
