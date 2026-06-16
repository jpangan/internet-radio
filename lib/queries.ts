import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Country, Station } from "@/lib/types";
import { dedupeStations } from "@/lib/utils";

const STATIONS_LIMIT = 300;

export const queryKeys = {
  countries: ["countries"] as const,
  stations: (identifier: string, search: string) =>
    ["stations", identifier, search] as const,
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
