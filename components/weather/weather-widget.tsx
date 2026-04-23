"use client";

import { getWeatherEmoji, formatShortDay } from "@/lib/utils";
import type { WeatherResponse } from "@/types/weather";
import { Wind, Droplets, Eye, Thermometer } from "lucide-react";

interface WeatherWidgetProps {
  weather: WeatherResponse;
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  const { current, forecast, location } = weather;

  return (
    <div className="p-4 space-y-4">
      {/* Current */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-white">
            {Math.round(current.temp_c)}°
            <span className="text-lg font-normal text-white/50">C</span>
          </span>
          <span className="text-sm text-white/60 mt-0.5">{current.condition.text}</span>
          <span className="text-xs text-violet-400 mt-0.5">{location.name}, {location.country}</span>
        </div>
        <div className="ml-auto text-4xl animate-float">
          {getWeatherEmoji(current.condition.code)}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: Wind, label: "Wind", value: `${Math.round(current.wind_kph)} km/h` },
          { icon: Droplets, label: "Humidity", value: `${current.humidity}%` },
          { icon: Thermometer, label: "Feels Like", value: `${Math.round(current.feelslike_c)}°C` },
          { icon: Eye, label: "UV Index", value: `${current.uv}` },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
            <Icon className="w-3 h-3 text-violet-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-white/40">{label}</p>
              <p className="text-xs font-semibold text-white/80">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 7-day forecast */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {forecast.forecastday.map((day, i) => (
          <div
            key={day.date}
            className={`flex flex-col items-center gap-1.5 px-2.5 py-2 rounded-xl shrink-0 min-w-0 transition-all ${
              i === 0
                ? "bg-violet-600/30 border border-violet-500/30"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <span className="text-[10px] font-medium text-white/60">
              {i === 0 ? "Today" : formatShortDay(day.date)}
            </span>
            <span className="text-base">{getWeatherEmoji(day.day.condition.code)}</span>
            <span className="text-[10px] font-semibold text-white/90">
              {Math.round(day.day.maxtemp_c)}°
            </span>
            <span className="text-[9px] text-white/40">
              {Math.round(day.day.mintemp_c)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
