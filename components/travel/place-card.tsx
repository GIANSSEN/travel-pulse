"use client";

import { useTripStore } from "@/store/use-trip-store";
import { useWeather } from "@/hooks/use-weather";
import { useSearchStore } from "@/store/use-search-store";
import type { Place } from "@/types/places";
import { Star } from "lucide-react";
import { getWeatherEmoji } from "@/lib/utils";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const { city } = useSearchStore();
  const { addToTrip, removeFromTrip, isInTrip } = useTripStore();
  const { data: weatherData } = useWeather(city);
  const [imgError, setImgError] = useState(false);

  const inTrip = isInTrip(place.id);
  const currentWeather = weatherData?.current;

  const imageUrl = imgError
    ? `https://picsum.photos/seed/${place.id}/600/400`
    : place.photos[0]?.url;

  return (
    <article
      className="flex flex-col w-[260px] shrink-0 bg-[#0c1222]/90 backdrop-blur-lg rounded-[20px] border border-white/[0.04] p-0 shadow-xl transition-all hover:scale-[1.02] hover:border-violet-500/30 overflow-hidden relative group"
    >
      {/* Image Block */}
      <div className="relative w-full h-[180px] bg-[#0c1222]">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={place.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 300px"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className="p-4 flex flex-col h-full flex-1">
        {/* Info Header */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[13px] font-bold text-white uppercase tracking-wide truncate pr-2">
            {place.name}
          </h3>
          <div className="flex items-center gap-1 bg-amber-500/10 px-1.5 py-0.5 rounded-md border border-amber-500/20 shrink-0">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-bold text-white/90">{place.rating}</span>
          </div>
        </div>

        {/* Description Text */}
        <div className="mb-4">
          <p className="text-[10px] leading-[1.6] text-white/40 line-clamp-3">
            {place.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."}
          </p>
        </div>

        {/* Weather Badge Container */}
        <div className="mt-auto mb-4">
          <div className="w-full bg-white/[0.03] rounded-[12px] p-2 flex flex-col border border-white/5 relative">
            <div className="flex items-center justify-between w-full">
               <span className="text-[9px] text-white/30 uppercase font-semibold tracking-wider">Weather Badge</span>
               <div className="text-[9px] text-white/50">{currentWeather?.condition.text || "broken clouds"}</div>
            </div>
            
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-amber-400 text-lg">
                {currentWeather ? getWeatherEmoji(currentWeather.condition.code) : "⛅"}
              </span>
              <span className="text-base font-bold text-white">
                {currentWeather ? Math.round(currentWeather.temp_c) : 20}°C
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => (inTrip ? removeFromTrip(place.id) : addToTrip(place))}
            className={cn(
              "flex-1 h-9 rounded-[10px] text-[11px] font-bold tracking-wide transition-all",
              inTrip 
                ? "bg-[#252b43] text-white/60 border border-white/5 hover:bg-[#2d3450]" 
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10 shadow-md"
            )}
          >
            {inTrip ? "REMOVE" : "Add to Trip"}
          </button>
          <button className="flex-1 h-9 rounded-[10px] bg-transparent text-white/70 hover:text-white border border-white/10 text-[11px] font-bold tracking-wide transition-all hover:bg-white/5">
            Details
          </button>
        </div>
      </div>
    </article>
  );
}
