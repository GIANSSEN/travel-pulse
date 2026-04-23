"use client";

import { useSearchStore } from "@/store/use-search-store";
import { useTripStore } from "@/store/use-trip-store";
import { useWeather } from "@/hooks/use-weather";
import { usePlaces } from "@/hooks/use-places";
import { InteractiveMap } from "@/components/travel/interactive-map";
import { MoreHorizontal, ChevronDown, Sun } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getWeatherEmoji, formatShortDay } from "@/lib/utils";

export function RightPanel() {
  const { city } = useSearchStore();
  const { data: weatherData } = useWeather(city);
  const { data: placesData } = usePlaces(city);
  const { itinerary } = useTripStore();

  const spots = placesData?.results || [];
  
  // Custom grouping for precise timeline replication as seen in UI image
  const groupedItinerary = itinerary.reduce<Record<string, typeof itinerary>>(
    (acc, item) => {
      // In the mockup dates look like: "Apr\n10"
      const dateObj = new Date(item.date);
      const month = dateObj.toLocaleDateString("en-US", { month: "short" });
      const day = dateObj.toLocaleDateString("en-US", { day: "2-digit" });
      const key = `${month}|${day}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {}
  );
  
  // Fallbacks for the quick itinerary if none exist to simulate the UI image mockup 
  const displayItinerary = Object.keys(groupedItinerary).length > 0
    ? groupedItinerary
    : {
        "Apr|10": [
          { id: "mock1", time: "9:00 AM", place: { name: "Senso-ji Temple", categories: [{name: "Temple"}] } },
          { id: "mock2", time: "8:00 AM", place: { name: "Temple", categories: [{name: "Temple"}] } }
        ],
        "Apr|11": [
          { id: "mock3", time: "9:00 AM", place: { name: "Senso-ji Temple", categories: [{name: "Temple"}] } },
          { id: "mock4", time: "3:30 AM", place: { name: "Temple", categories: [{name: "Temple"}] } }
        ]
      };

  return (
    <aside className="w-full flex-1 flex flex-col gap-4 max-h-full">
      {/* Interactive Map Block */}
      <div className="glass-card flex flex-col rounded-[20px] bg-[#161d31]/80 backdrop-blur-lg border border-white/5 shadow-xl shrink-0 p-3 pt-4">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[11px] font-bold text-white uppercase tracking-widest">
            INTERACTIVE MAP
          </span>
          <MoreHorizontal className="w-4 h-4 text-white/40" />
        </div>
        
        {/* Map Container */}
        <div className="relative w-full h-[140px] rounded-2xl overflow-hidden border border-white/5 bg-[#0c1222] mb-3">
          <InteractiveMap spots={spots} city={city} />
        </div>
        
        {/* Dropdown UI representation */}
        <div className="flex-1 flex max-h-none">
          <button className="flex items-center w-full justify-between bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-[12px] px-4 py-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/50 tracking-wider">ZOOM:</span>
              <span className="text-[11px] font-medium text-white">{city} City Center</span>
            </div>
            <ChevronDown className="w-4 h-4 text-white/50" />
          </button>
        </div>
      </div>

      {/* Weather Forecast Block */}
      {weatherData && (
        <div className="glass-card rounded-[20px] bg-[#161d31]/80 backdrop-blur-lg border border-white/5 shadow-xl shrink-0 p-3 pt-4">
          <div className="flex items-center justify-between px-2 mb-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-widest">
              WEATHER FORECAST (7-Day)
            </span>
            <MoreHorizontal className="w-4 h-4 text-white/40" />
          </div>
          
          <div className="px-2 mb-4">
            <div className="flex items-center gap-2">
              <Sun className="w-8 h-8 text-amber-400 fill-amber-400" />
              <span className="text-3xl font-bold text-white tracking-tight leading-none ml-1">
                {Math.round(weatherData.current.temp_c)}°C
              </span>
              <span className="text-sm text-white/60 ml-1 self-end mb-1">
                {weatherData.current.condition.text}
              </span>
            </div>
          </div>
          
          {/* Weather 5-day columns replication */}
          <div className="grid grid-cols-5 gap-1.5 px-0.5">
            {weatherData.forecast.forecastday.slice(0, 5).map((f) => (
              <div key={f.date} className="flex flex-col items-center bg-[#0e1425] rounded-[14px] p-2 border border-white/[0.02]">
                <span className="text-[10px] text-white/60 mb-1">{formatShortDay(f.date)}</span>
                <span className="text-sm mb-2">{getWeatherEmoji(f.day.condition.code)}</span>
                <div className="flex flex-col items-center gap-0.5 text-[8px] font-medium text-white/40">
                   <span>{Math.round(f.day.maxtemp_c)}°C</span>
                   <div className="w-4 border-t border-dashed border-white/20 my-0.5" />
                   <span>{Math.round(f.day.mintemp_c)}°C</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Itinerary */}
      <div className="glass-card flex-1 min-h-0 flex flex-col rounded-[20px] bg-[#161d31]/80 backdrop-blur-lg border border-white/5 shadow-xl p-3 pt-4">
        <div className="flex items-center justify-between px-2 mb-3 shrink-0">
          <span className="text-[11px] font-bold text-white uppercase tracking-widest">
            QUICK ITINERARY
          </span>
          <MoreHorizontal className="w-4 h-4 text-white/40" />
        </div>
        
        <ScrollArea className="flex-1 pr-2 mt-1" orientation="vertical">
          <div className="flex flex-col gap-0">
            {Object.entries(displayItinerary).map(([dateKey, items], groupIdx) => {
              const [month, day] = dateKey.split("|");
              return (
                <div key={dateKey} className="flex relative pb-6 border-l border-transparent">
                  {/* Timeline Divider */}
                  <div className="absolute left-[20px] top-8 bottom-0 w-[1px] bg-white/[0.08]" />
                  
                  {/* Date Column */}
                  <div className="flex flex-col items-center shrink-0 w-10 relative z-10 pt-0.5">
                     <span className="text-[10px] text-white/50 uppercase font-medium leading-none mb-1">{month}</span>
                     <span className="text-[15px] font-bold text-white leading-none">{day}</span>
                  </div>
                  
                  {/* Items Column */}
                  <div className="flex flex-col flex-1 pl-4 gap-4 pt-1.5">
                    {items.map((item: any, idx) => (
                      <div key={item.id} className="relative flex items-center pr-2">
                        {/* Dot indicator aligned structurally over the divider line using negative margin */}
                        <div className={`absolute -left-[21px] w-[9px] h-[9px] rounded-full z-20 border-[2px] border-[#161d31] ${idx === 0 ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "bg-violet-500"}`} />
                        <div className="flex gap-2 text-[11px] w-full truncate">
                          <span className={`w-14 shrink-0 ${idx === 0 ? "text-white font-medium" : "text-white/40"}`}>
                            {item.time}
                          </span>
                          <span className={`${idx === 0 ? "text-white/70" : "text-white/30"}`}>-</span>
                          <span className={`font-semibold truncate ${idx === 0 ? "text-white/95" : "text-white/40"}`}>
                            {item.place.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
