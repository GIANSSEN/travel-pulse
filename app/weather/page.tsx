"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { useWeather } from "@/hooks/use-weather";
import { useSearchStore } from "@/store/use-search-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WeatherWidget } from "@/components/weather/weather-widget";
import { getWeatherEmoji, formatDate } from "@/lib/utils";
import { Wind, Droplets, Thermometer, Eye, CloudRain, Sun, Cloud } from "lucide-react";

const POPULAR_CITIES = [
  { name: "Tokyo", country: "JP", emoji: "🇯🇵" },
  { name: "Paris", country: "FR", emoji: "🇫🇷" },
  { name: "Bali", country: "ID", emoji: "🇮🇩" },
  { name: "New York", country: "US", emoji: "🇺🇸" },
  { name: "Seoul", country: "KR", emoji: "🇰🇷" },
  { name: "Rome", country: "IT", emoji: "🇮🇹" },
];

function CityWeatherCard({ cityName, emoji }: { cityName: string; emoji: string }) {
  const { data, isLoading } = useWeather(cityName);

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-4 animate-pulse">
        <div className="h-4 bg-white/8 rounded w-1/2 mb-3" />
        <div className="h-8 bg-white/8 rounded w-1/3 mb-2" />
        <div className="h-3 bg-white/5 rounded w-2/3" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="glass-card rounded-2xl p-4 hover:border-violet-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{emoji}</span>
          <div>
            <p className="text-sm font-semibold text-white/90">{data.location.name}</p>
            <p className="text-[10px] text-white/40">{data.location.country}</p>
          </div>
        </div>
        <span className="text-2xl">{getWeatherEmoji(data.current.condition.code)}</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-white">{Math.round(data.current.temp_c)}°</span>
        <span className="text-sm text-white/50 mb-1">{data.current.condition.text}</span>
      </div>
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
        <span className="flex items-center gap-1 text-[10px] text-white/40">
          <Wind className="w-2.5 h-2.5 text-blue-400" />
          {Math.round(data.current.wind_kph)} km/h
        </span>
        <span className="flex items-center gap-1 text-[10px] text-white/40">
          <Droplets className="w-2.5 h-2.5 text-cyan-400" />
          {data.current.humidity}%
        </span>
        <span className="flex items-center gap-1 text-[10px] text-white/40">
          <Thermometer className="w-2.5 h-2.5 text-orange-400" />
          {Math.round(data.current.feelslike_c)}° feels
        </span>
      </div>
    </div>
  );
}

export default function WeatherPage() {
  const { city } = useSearchStore();
  const { data: mainWeather, isLoading } = useWeather(city);

  return (
    <div className="app-shell">
      <div className="app-background" />
      <Sidebar />

      <div className="main-area">
        <TopNav />

        <ScrollArea className="flex-1" orientation="vertical">
          <div className="max-w-5xl mx-auto px-6 py-6 space-y-8">

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Cloud className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Weather Center</h1>
                <p className="text-sm text-white/40">Real-time conditions & 7-day forecasts</p>
              </div>
            </div>

            {/* Current city hero */}
            {mainWeather && (
              <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
                {/* Background emoji */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] opacity-10 select-none pointer-events-none animate-float">
                  {getWeatherEmoji(mainWeather.current.condition.code)}
                </div>

                <div className="relative">
                  <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1">
                    Current Destination
                  </p>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {mainWeather.location.name}, {mainWeather.location.country}
                  </h2>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-7xl font-black text-white">
                      {Math.round(mainWeather.current.temp_c)}°
                    </span>
                    <div>
                      <p className="text-xl text-white/70">{mainWeather.current.condition.text}</p>
                      <p className="text-sm text-white/40 mt-1">
                        Feels like {Math.round(mainWeather.current.feelslike_c)}°C
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: Wind, label: "Wind", value: `${Math.round(mainWeather.current.wind_kph)} km/h`, color: "text-blue-400" },
                      { icon: Droplets, label: "Humidity", value: `${mainWeather.current.humidity}%`, color: "text-cyan-400" },
                      { icon: Thermometer, label: "Feels Like", value: `${Math.round(mainWeather.current.feelslike_c)}°C`, color: "text-orange-400" },
                      { icon: Eye, label: "UV Index", value: String(mainWeather.current.uv || "—"), color: "text-yellow-400" },
                    ].map(({ icon: Icon, label, value, color }) => (
                      <div key={label} className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3">
                        <Icon className={`w-4 h-4 ${color} shrink-0`} />
                        <div>
                          <p className="text-[10px] text-white/40">{label}</p>
                          <p className="text-sm font-bold text-white">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="glass-card rounded-3xl p-6 animate-pulse h-52" />
            )}

            {/* 7-day forecast */}
            {mainWeather && (
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/5">
                  <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                    7-Day Forecast
                  </h3>
                </div>
                <div className="divide-y divide-white/5">
                  {mainWeather.forecast.forecastday.map((day, i) => (
                    <div key={day.date} className="flex items-center gap-4 px-5 py-3 hover:bg-white/3 transition-colors">
                      <span className="w-20 text-xs font-medium text-white/60">
                        {i === 0 ? "Today" : formatDate(day.date)}
                      </span>
                      <span className="text-xl w-7">{getWeatherEmoji(day.day.condition.code)}</span>
                      <span className="flex-1 text-xs text-white/50 capitalize">{day.day.condition.text}</span>
                      <div className="flex items-center gap-1 text-[10px] text-blue-400">
                        <CloudRain className="w-2.5 h-2.5" />
                        {day.day.daily_chance_of_rain}%
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className="text-white/80">{Math.round(day.day.maxtemp_c)}°</span>
                        <span className="text-white/30">/</span>
                        <span className="text-white/40">{Math.round(day.day.mintemp_c)}°</span>
                      </div>
                      <div className="w-20">
                        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                            style={{
                              width: `${Math.min(100, (day.day.maxtemp_c / 40) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* World weather */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                  Around the World
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {POPULAR_CITIES.map(({ name, emoji }) => (
                  <CityWeatherCard key={name} cityName={name} emoji={emoji} />
                ))}
              </div>
            </div>

          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
