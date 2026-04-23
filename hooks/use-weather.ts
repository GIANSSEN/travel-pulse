import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/api-config";
import type { WeatherResponse } from "@/types/weather";

export function useWeather(city: string) {
  return useQuery<WeatherResponse>({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
    staleTime: 1000 * 60 * 15, // 15 minutes
    retry: 1,
  });
}
