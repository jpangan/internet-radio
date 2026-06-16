import posthog from "posthog-js";
import type { Country, Station } from "./types";

export function trackStationSelected(station: Station, country?: Country) {
  posthog.capture("station_selected", {
    station_name: station.name,
    station_uuid: station.stationuuid,
    country: country?.name,
    country_code: country?.iso_3166_1,
  });
}

export function trackStationPlayed(station: Station) {
  posthog.capture("station_played", {
    station_name: station.name,
    station_uuid: station.stationuuid,
  });
}

export function trackStationPaused(station: Station) {
  posthog.capture("station_paused", {
    station_name: station.name,
    station_uuid: station.stationuuid,
  });
}

export function trackStationNavigated(station: Station, direction: "prev" | "next") {
  posthog.capture("station_navigated", {
    station_name: station.name,
    station_uuid: station.stationuuid,
    direction,
  });
}

export function trackCountryBrowsed(country: Country) {
  posthog.capture("country_browsed", {
    country_name: country.name,
    country_code: country.iso_3166_1,
    station_count: country.stationcount,
  });
}

export function trackStationSearched(query: string) {
  posthog.capture("station_searched", { query });
}

export function trackFavoriteAdded(station: Station, country: Country) {
  posthog.capture("favorite_added", {
    station_name: station.name,
    station_uuid: station.stationuuid,
    country: country.name,
  });
}

export function trackFavoriteRemoved(station: Station, country: Country) {
  posthog.capture("favorite_removed", {
    station_name: station.name,
    station_uuid: station.stationuuid,
    country: country.name,
  });
}

export function trackStationShared(station: Station, country: Country) {
  posthog.capture("station_shared", {
    station_name: station.name,
    station_uuid: station.stationuuid,
    country: country.name,
  });
}

export function trackLoadMore(country: Country, page: number) {
  posthog.capture("load_more_clicked", {
    country: country.name,
    country_code: country.iso_3166_1,
    page,
  });
}

export function trackStreamError(station: Station) {
  posthog.capture("stream_error", {
    station_name: station.name,
    station_uuid: station.stationuuid,
  });
}

export function trackError(message: string, properties?: Record<string, unknown>) {
  posthog.capture("$exception", {
    $exception_message: message,
    ...properties,
  });
}
