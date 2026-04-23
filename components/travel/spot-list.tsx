"use client";

import { useRef, useMemo } from "react";
import { usePlaces } from "@/hooks/use-places";
import { useSearchStore } from "@/store/use-search-store";
import { PlaceCard } from "./place-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SpotList() {
  const { city } = useSearchStore();
  const { data, isLoading } = usePlaces(city);
  const scrollRef = useRef<HTMLDivElement>(null);

  const spots = useMemo(() => data?.results || [], [data]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-6 pt-5">
      {/* Header Container */}
      <div className="flex items-center justify-between mb-6 px-1 shrink-0">
        <h2 className="text-[13px] font-bold tracking-widest text-white uppercase">
          RECOMMENDED SPOTS IN {city.toUpperCase()}
        </h2>
        <div className="flex items-center gap-3 text-white/50">
          <button 
            onClick={scrollLeft}
            className="hover:text-white transition-colors"
          >
            <ChevronLeft strokeWidth={2.5} className="w-5 h-5" />
          </button>
          <button 
            onClick={scrollRight}
            className="hover:text-white transition-colors"
          >
            <ChevronRight strokeWidth={2.5} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Container */}
      {isLoading ? (
        <div className="flex gap-4 animate-pulse px-1">
           {[1,2,3].map((i) => (
             <div key={i} className="w-[260px] h-[360px] bg-white/5 rounded-[20px]" />
           ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {/* Scrollable Carousel Area */}
          <div 
            ref={scrollRef}
            className="flex flex-1 gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory px-1 pb-4 items-start"
          >
            {spots.map((place) => (
              <div key={place.id} className="snap-start shrink-0 h-full">
                <PlaceCard place={place} />
              </div>
            ))}
          </div>

          {/* Dots Indicator at bottom */}
          <div className="shrink-0 flex items-center justify-center gap-1.5 mt-2 pb-2">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all ${
                  i === 1 ? "w-6 bg-cyan-400" : "w-1.5 bg-white/20"
                }`} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
