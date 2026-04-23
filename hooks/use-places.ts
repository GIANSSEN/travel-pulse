import { useQuery } from "@tanstack/react-query";
import { fetchPlaces } from "@/lib/api-config";
import type { PlacesResponse } from "@/types/places";

export function usePlaces(city: string) {
  return useQuery<PlacesResponse>({
    queryKey: ["places", city],
    queryFn: () => fetchPlaces(city),
    enabled: !!city,
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 1,
  });
}
