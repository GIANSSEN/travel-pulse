"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { useTripStore } from "@/store/use-trip-store";
import { useSearchStore } from "@/store/use-search-store";
import { usePlaces } from "@/hooks/use-places";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function FavoritesPage() {
  const { favorites, savedPlaces, toggleFavorite, addToTrip, isInTrip } = useTripStore();
  const { city } = useSearchStore();
  const { data } = usePlaces(city);

  // Merge favorite places from places data + saved places
  const allKnownPlaces = useMemo(() => {
    const fromData = data?.results || [];
    const combined = [...fromData, ...savedPlaces];
    const seen = new Set<string>();
    return combined.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }, [data, savedPlaces]);

  const favoritePlaces = allKnownPlaces.filter((p) => favorites.includes(p.id));

  return (
    <div className="app-shell">
      <div className="app-background" />
      <Sidebar />

      <div className="main-area">
        <TopNav />

        <ScrollArea className="flex-1" orientation="vertical">
          <div className="max-w-5xl mx-auto px-6 py-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-600 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Favorites</h1>
                <p className="text-sm text-white/40">
                  {favoritePlaces.length} saved place{favoritePlaces.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {favoritePlaces.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-6">
                <div className="w-24 h-24 rounded-3xl bg-pink-500/10 border border-pink-500/15 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-pink-400/40" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white/70 mb-2">No favorites yet</h3>
                  <p className="text-sm text-white/35 max-w-xs">
                    Tap the heart icon on any place card to save it here.
                  </p>
                </div>
                <Link href="/explore">
                  <Button variant="primary">
                    <MapPin className="w-4 h-4" />
                    Discover Places
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoritePlaces.map((place) => (
                  <div
                    key={place.id}
                    id={`fav-card-${place.id}`}
                    className="glass-card rounded-2xl overflow-hidden group hover:border-pink-500/20 hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden bg-white/5">
                      {place.photos[0]?.url && (
                        <Image
                          src={place.photos[0].url}
                          alt={place.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="400px"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080c18] via-transparent to-transparent opacity-70" />

                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-medium px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-white/80">
                          {place.categories[0]?.icon} {place.categories[0]?.name}
                        </span>
                      </div>

                      {/* Remove from favorites */}
                      <button
                        id={`unfav-${place.id}`}
                        onClick={() => toggleFavorite(place.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-pink-500/30 border border-pink-500/40 text-pink-400 hover:bg-red-500/40 transition-all"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <div className="absolute bottom-3 left-3 flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-white">{place.rating}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3 space-y-2">
                      <div>
                        <h3 className="text-sm font-semibold text-white/95">{place.name}</h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="w-2.5 h-2.5 text-violet-400" />
                          <span className="text-[10px] text-white/40 truncate">{place.location.formatted_address}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-white/45 leading-relaxed line-clamp-2">
                        {place.description}
                      </p>
                      <Button
                        id={`add-fav-to-trip-${place.id}`}
                        size="sm"
                        variant={isInTrip(place.id) ? "secondary" : "primary"}
                        className="w-full"
                        onClick={() => addToTrip(place)}
                      >
                        <Plus className="w-3 h-3" />
                        {isInTrip(place.id) ? "Already in Trip" : "Add to Trip"}
                      </Button>
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
