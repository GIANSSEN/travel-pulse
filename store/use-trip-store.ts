import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Place, ItineraryItem } from "@/types/places";

interface TripStore {
  savedPlaces: Place[];
  favorites: string[];
  itinerary: ItineraryItem[];

  addToTrip: (place: Place) => void;
  removeFromTrip: (placeId: string) => void;
  isInTrip: (placeId: string) => boolean;

  toggleFavorite: (placeId: string) => void;
  isFavorite: (placeId: string) => boolean;

  addToItinerary: (place: Place, date: string, time: string) => void;
  removeFromItinerary: (itemId: string) => void;
  updateItineraryItem: (itemId: string, updates: Partial<ItineraryItem>) => void;
  clearItinerary: () => void;
}

export const useTripStore = create<TripStore>()(
  persist(
    (set, get) => ({
      savedPlaces: [],
      favorites: [],
      itinerary: [],

      addToTrip: (place) => {
        const exists = get().savedPlaces.find((p) => p.id === place.id);
        if (exists) return;
        // Auto-add to itinerary with default date
        const today = new Date();
        const nextDate = new Date(today.getTime() + get().itinerary.length * 86400000);
        const dateStr = nextDate.toISOString().split("T")[0];
        const times = ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "7:00 PM"];
        const timeStr = times[get().itinerary.length % times.length];
        const item: ItineraryItem = {
          id: `itinerary-${place.id}-${Date.now()}`,
          place,
          date: dateStr,
          time: timeStr,
          order: get().itinerary.length,
        };
        set((state) => ({
          savedPlaces: [...state.savedPlaces, place],
          itinerary: [...state.itinerary, item],
        }));
      },

      removeFromTrip: (placeId) => {
        set((state) => ({
          savedPlaces: state.savedPlaces.filter((p) => p.id !== placeId),
          itinerary: state.itinerary.filter((i) => i.place.id !== placeId),
        }));
      },

      isInTrip: (placeId) => get().savedPlaces.some((p) => p.id === placeId),

      toggleFavorite: (placeId) => {
        const isFav = get().favorites.includes(placeId);
        set((state) => ({
          favorites: isFav
            ? state.favorites.filter((id) => id !== placeId)
            : [...state.favorites, placeId],
        }));
      },

      isFavorite: (placeId) => get().favorites.includes(placeId),

      addToItinerary: (place, date, time) => {
        const item: ItineraryItem = {
          id: `itinerary-${place.id}-${Date.now()}`,
          place,
          date,
          time,
          order: get().itinerary.length,
        };
        set((state) => ({ itinerary: [...state.itinerary, item] }));
      },

      removeFromItinerary: (itemId) => {
        set((state) => ({
          itinerary: state.itinerary.filter((i) => i.id !== itemId),
        }));
      },

      updateItineraryItem: (itemId, updates) => {
        set((state) => ({
          itinerary: state.itinerary.map((i) =>
            i.id === itemId ? { ...i, ...updates } : i
          ),
        }));
      },

      clearItinerary: () => set({ itinerary: [], savedPlaces: [] }),
    }),
    { name: "travel-pulse-trip" }
  )
);
