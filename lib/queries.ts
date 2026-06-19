import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Country, Station } from "@/lib/types";
import { dedupeStations } from "@/lib/utils";

const STATIONS_LIMIT = 300;

export const queryKeys = {
  countries: ["countries"] as const,
  stations: (identifier: string, search: string) =>
    ["stations", identifier, search] as const,
  topStations: (order: string) => ["top-stations", order] as const,
  stationsByTag: (tag: string) => ["stations-by-tag", tag] as const,
};

async function fetchCountriesApi(): Promise<Country[]> {
  const res = await fetch("/api/countries");
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
}

async function fetchStationsPage(
  identifier: string,
  offset: number,
  search: string
): Promise<Station[]> {
  const params = new URLSearchParams({ offset: String(offset) });
  if (search) params.set("name", search);
  const res = await fetch(
    `/api/stations/${encodeURIComponent(identifier)}?${params}`
  );
  if (!res.ok) throw new Error("Failed to fetch stations");
  const data: Station[] = await res.json();
  return dedupeStations(data);
}

async function fetchTopStationsApi(order: string): Promise<Station[]> {
  const res = await fetch(`/api/top-stations?order=${order}&limit=12`);
  if (!res.ok) throw new Error("Failed to fetch top stations");
  const data: Station[] = await res.json();
  return dedupeStations(data);
}

async function fetchStationsByTagApi(tag: string): Promise<Station[]> {
  const res = await fetch(`/api/stations-by-tag/${encodeURIComponent(tag)}?limit=12`);
  if (!res.ok) throw new Error("Failed to fetch stations by tag");
  const data: Station[] = await res.json();
  return dedupeStations(data);
}

export function useTopStations(order: "votes" | "clicktrend" | "clickcount") {
  return useQuery({
    queryKey: queryKeys.topStations(order),
    queryFn: () => fetchTopStationsApi(order),
    staleTime: 5 * 60 * 1000,
  });
}

export function useStationsByTag(tag: string) {
  return useQuery({
    queryKey: queryKeys.stationsByTag(tag),
    queryFn: () => fetchStationsByTagApi(tag),
    staleTime: 5 * 60 * 1000,
    enabled: !!tag,
  });
}

export function useCountries() {
  return useQuery({
    queryKey: queryKeys.countries,
    queryFn: fetchCountriesApi,
    staleTime: Infinity,
  });
}

export function useInfiniteStations(identifier: string | null, search: string) {
  return useInfiniteQuery({
    queryKey: queryKeys.stations(identifier ?? "", search),
    queryFn: ({ pageParam }) =>
      fetchStationsPage(identifier!, pageParam, search),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < STATIONS_LIMIT) return undefined;
      return allPages.length * STATIONS_LIMIT;
    },
    enabled: !!identifier,
    staleTime: 5 * 60 * 1000,
  });
}

export { fetchCountriesApi };
export { useQueryClient };
