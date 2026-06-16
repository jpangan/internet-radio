import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Country, Station } from "@/lib/types";
import { dedupeStations } from "@/lib/utils";

export const queryKeys = {
  countries: ["countries"] as const,
  stations: (identifier: string) => ["stations", identifier] as const,
};

async function fetchCountriesApi(): Promise<Country[]> {
  const res = await fetch("/api/countries");
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
}

async function fetchStationsApi(identifier: string): Promise<Station[]> {
  const res = await fetch(`/api/stations/${encodeURIComponent(identifier)}`);
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

export function useStations(identifier: string | null) {
  return useQuery({
    queryKey: queryKeys.stations(identifier ?? ""),
    queryFn: () => fetchStationsApi(identifier!),
    enabled: !!identifier,
    staleTime: 5 * 60 * 1000,
  });
}

export { fetchCountriesApi };
export { useQueryClient };
