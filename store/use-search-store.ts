import { create } from "zustand";

interface SearchStore {
  city: string;
  query: string;
  activeCategory: string;

  setCity: (city: string) => void;
  setQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  city: "Tokyo",
  query: "",
  activeCategory: "all",

  setCity: (city) => set({ city, query: "" }),
  setQuery: (query) => set({ query }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
}));
