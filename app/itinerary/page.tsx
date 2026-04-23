"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { useTripStore } from "@/store/use-trip-store";
import { useSearchStore } from "@/store/use-search-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { formatDate, getWeatherEmoji } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Clock,
  Trash2,
  Star,
  ChevronRight,
  Download,
  Share2,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function EmptyItinerary() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 py-24">
      <div className="relative">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-600/20 to-purple-500/10 border border-violet-500/20 flex items-center justify-center">
          <Calendar className="w-10 h-10 text-violet-400/60" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/20 flex items-center justify-center">
          <span className="text-sm">✨</span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white/80 mb-2">Your itinerary is empty</h3>
        <p className="text-sm text-white/40 max-w-xs">
          Start exploring destinations and click &quot;Add to Trip&quot; to build your perfect itinerary.
        </p>
      </div>
      <Link href="/explore">
        <Button variant="primary" size="lg">
          <MapPin className="w-4 h-4" />
          Explore Destinations
        </Button>
      </Link>
    </div>
  );
}

export default function ItineraryPage() {
  const { itinerary, removeFromItinerary, clearItinerary } = useTripStore();
  const { city } = useSearchStore();

  const grouped = itinerary.reduce<Record<string, typeof itinerary>>(
    (acc, item) => {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
      return acc;
    },
    {}
  );

  const sortedDates = Object.keys(grouped).sort();
  const totalSpots = itinerary.length;
  const totalDays = sortedDates.length;

  return (
    <div className="app-shell">
      <div className="app-background" />
      <Sidebar />

      <div className="main-area">
        <TopNav />

        <ScrollArea className="flex-1" orientation="vertical">
          <div className="max-w-5xl mx-auto px-6 py-6">

            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center shadow-lg shadow-violet-500/30">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">My Itinerary</h1>
                </div>
                <p className="text-sm text-white/40 ml-10">
                  {totalSpots > 0
                    ? `${totalSpots} spot${totalSpots > 1 ? "s" : ""} across ${totalDays} day${totalDays > 1 ? "s" : ""} · ${city}`
                    : "Plan your perfect trip"}
                </p>
              </div>

              {itinerary.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" id="share-itinerary">
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </Button>
                  <Button variant="secondary" size="sm" id="export-itinerary">
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    id="clear-itinerary"
                    onClick={() => {
                      if (confirm("Clear your entire itinerary?")) clearItinerary();
                    }}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Clear All
                  </Button>
                </div>
              )}
            </div>

            {itinerary.length === 0 ? (
              <EmptyItinerary />
            ) : (
              <div className="space-y-8">
                {/* Summary cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Total Spots", value: totalSpots, icon: "📍" },
                    { label: "Days", value: totalDays, icon: "📅" },
                    { label: "City", value: city, icon: "🌆" },
                    {
                      label: "Categories",
                      value: new Set(itinerary.map((i) => i.place.categories[0]?.name)).size,
                      icon: "🎯",
                    },
                  ].map(({ label, value, icon }) => (
                    <div
                      key={label}
                      className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3"
                    >
                      <span className="text-2xl">{icon}</span>
                      <div>
                        <p className="text-xs text-white/40">{label}</p>
                        <p className="text-lg font-bold text-white">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                {sortedDates.map((date, dayIndex) => (
                  <div key={date}>
                    {/* Day header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600/30 to-purple-500/20 border border-violet-500/20 flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] text-violet-400 font-semibold uppercase">
                          Day
                        </span>
                        <span className="text-base font-bold text-white leading-none">
                          {dayIndex + 1}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-white">{formatDate(date)}</h2>
                        <p className="text-xs text-white/40">
                          {grouped[date].length} stop{grouped[date].length > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-violet-500/30 to-transparent ml-2" />
                    </div>

                    {/* Stops */}
                    <div className="space-y-3 pl-5 border-l border-violet-500/15 ml-5">
                      {grouped[date]
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((item, idx) => (
                          <div
                            key={item.id}
                            id={`itinerary-item-${item.id}`}
                            className="relative glass-card rounded-2xl p-4 flex gap-4 hover:border-violet-500/20 transition-all duration-300 group"
                          >
                            {/* Timeline dot */}
                            <div className="absolute -left-[21px] top-5 w-3.5 h-3.5 rounded-full bg-violet-600 border-2 border-[#080c18] shadow-lg shadow-violet-500/40" />

                            {/* Place image */}
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white/5">
                              {item.place.photos[0]?.url && (
                                <Image
                                  src={item.place.photos[0].url}
                                  alt={item.place.name}
                                  fill
                                  className="object-cover"
                                  sizes="80px"
                                />
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="text-sm font-semibold text-white/95 leading-tight">
                                    {item.place.name}
                                  </p>
                                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1">
                                    <span className="flex items-center gap-1 text-[10px] text-violet-400">
                                      <Clock className="w-2.5 h-2.5" />
                                      {item.time}
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] text-white/40">
                                      <MapPin className="w-2.5 h-2.5" />
                                      {item.place.location.formatted_address}
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] text-amber-400">
                                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                                      {item.place.rating}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  id={`remove-item-${item.id}`}
                                  onClick={() => removeFromItinerary(item.id)}
                                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-xl hover:bg-red-500/20 text-white/25 hover:text-red-400 transition-all shrink-0"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <p className="text-[11px] text-white/40 mt-1.5 leading-relaxed line-clamp-2">
                                {item.place.description}
                              </p>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {item.place.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[9px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/15 text-violet-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Arrow */}
                            {idx < grouped[date].length - 1 && (
                              <ChevronRight className="hidden sm:block w-4 h-4 text-white/15 self-center shrink-0" />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
