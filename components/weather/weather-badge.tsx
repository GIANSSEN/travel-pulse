"use client";

import { getWeatherEmoji } from "@/lib/utils";

interface WeatherBadgeProps {
  tempC: number;
  conditionCode: number;
  conditionText: string;
}

export function WeatherBadge({ tempC, conditionCode, conditionText }: WeatherBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10">
      <span className="text-sm">{getWeatherEmoji(conditionCode)}</span>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-white leading-none">{Math.round(tempC)}°C</span>
        <span className="text-[9px] text-white/60 leading-none">{conditionText}</span>
      </div>
    </div>
  );
}
