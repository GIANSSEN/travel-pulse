export interface PlaceCategory {
  id: string;
  name: string;
  icon?: string;
}

export interface PlaceLocation {
  address: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  formatted_address: string;
}

export interface PlacePhoto {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  categories: PlaceCategory[];
  location: PlaceLocation;
  rating: number;
  price?: number;
  photos: PlacePhoto[];
  hours?: {
    open_now: boolean;
    display: string;
  };
  website?: string;
  tel?: string;
  popularity?: number;
  distance?: number;
  tags: string[];
}

export interface PlacesResponse {
  results: Place[];
  total: number;
  city: string;
}

export interface ItineraryItem {
  id: string;
  place: Place;
  date: string;
  time: string;
  notes?: string;
  order: number;
}
