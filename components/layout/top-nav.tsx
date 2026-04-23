"use client";

import { Search } from "lucide-react";
import { useSearchStore } from "@/store/use-search-store";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

export function TopNav() {
  const { city, setCity } = useSearchStore();
  const [inputValue, setInputValue] = useState(city);
  const debouncedInput = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedInput && debouncedInput !== city) {
      setCity(debouncedInput);
    }
  }, [debouncedInput, city, setCity]);

  // Handle enter key manually for instant feedback without debounce wait
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCity(inputValue);
    }
  };

  return (
    <header className="flex items-center justify-between gap-6 shrink-0 z-10 w-full pt-4 pr-1">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-[600px] h-[52px] bg-[#0c1222] rounded-[20px] border border-white/5 flex items-center shadow-lg shadow-black/20">
        {/* Animated gradient left border simulator */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-violet-500 rounded-l-[10px] shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
        
        <Search className="ml-6 w-4 h-4 text-white/50" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Find your next destination..."
          className="flex-1 bg-transparent px-4 py-2 text-white placeholder:text-white/40 focus:outline-none text-[13px] font-medium tracking-wide w-full"
        />
        <button 
          onClick={() => setCity(inputValue)}
          className="mr-1.5 h-10 px-5 rounded-[14px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/80 text-xs font-bold uppercase tracking-wider transition-all"
        >
          Search
        </button>
      </div>

      {/* Live Trip Status box */}
      <div className="glass-card h-14 rounded-2xl px-6 flex flex-col justify-center border-white/10 shadow-lg">
        <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-0.5">
          LIVE TRIP STATUS:
        </span>
        <div className="text-[13px] font-semibold text-white tracking-wide">
          {city}, <span className="text-white/60">Japan (In 5 days)</span>
        </div>
      </div>
    </header>
  );
}
