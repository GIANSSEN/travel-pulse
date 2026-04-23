import type { WeatherResponse } from "@/types/weather";
import type { PlacesResponse } from "@/types/places";

// ==================================
// Mock Data
// ==================================

const TOKYO_SPOTS = [
  {
    id: "1",
    name: "Senso-ji Temple",
    description: "Tokyo's oldest temple, a symbol of the city with its iconic Kaminarimon gate and Nakamise shopping street.",
    categories: [{ id: "religion", name: "Temple", icon: "⛩️" }],
    location: { address: "2-3-1 Asakusa", city: "Tokyo", country: "Japan", lat: 35.7148, lng: 139.7967, formatted_address: "Asakusa, Taito, Tokyo" },
    rating: 4.8,
    price: 1,
    photos: [{ id: "p1", url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80", width: 600, height: 400 }],
    hours: { open_now: true, display: "Open 24 hours" },
    tags: ["Historic", "Cultural", "Photo Spot"],
    distance: 120,
  },
  {
    id: "2",
    name: "Shibuya Crossing",
    description: "The world's busiest pedestrian crossing — a sensory spectacle of neon lights and synchronized movement.",
    categories: [{ id: "landmark", name: "Landmark", icon: "🏙️" }],
    location: { address: "Shibuya", city: "Tokyo", country: "Japan", lat: 35.6595, lng: 139.7004, formatted_address: "Shibuya, Tokyo" },
    rating: 4.7,
    price: 1,
    photos: [{ id: "p2", url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", width: 600, height: 400 }],
    hours: { open_now: true, display: "Always accessible" },
    tags: ["Iconic", "Urban", "Night Life"],
    distance: 340,
  },
  {
    id: "3",
    name: "Arashiyama Bamboo Grove",
    description: "A mesmerizing pathway through towering bamboo stalks just outside Kyoto — a true natural wonder.",
    categories: [{ id: "nature", name: "Nature", icon: "🌿" }],
    location: { address: "Sagaogurayama Tabuchiyamacho", city: "Kyoto", country: "Japan", lat: 35.0094, lng: 135.6717, formatted_address: "Arashiyama, Kyoto" },
    rating: 4.9,
    price: 1,
    photos: [{ id: "p3", url: "https://images.unsplash.com/photo-1588123190131-1c3fac394f4b?w=600&q=80", width: 600, height: 400 }],
    hours: { open_now: true, display: "Open 24 hours" },
    tags: ["Nature", "Peaceful", "Photography"],
    distance: 500,
  },
  {
    id: "4",
    name: "teamLab Borderless",
    description: "An immersive digital art museum where you wander through a world of boundless light and sound.",
    categories: [{ id: "arts", name: "Art Museum", icon: "🎨" }],
    location: { address: "1 Palette Town", city: "Tokyo", country: "Japan", lat: 35.6243, lng: 139.7784, formatted_address: "Odaiba, Koto, Tokyo" },
    rating: 4.9,
    price: 3,
    photos: [{ id: "p4", url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80", width: 600, height: 400 }],
    hours: { open_now: false, display: "10:00 AM – 7:00 PM" },
    tags: ["Art", "Digital", "Unique"],
    distance: 780,
  },
  {
    id: "5",
    name: "Tsukiji Fish Market",
    description: "The world's largest seafood market — wake up early for the freshest sushi breakfast you'll ever have.",
    categories: [{ id: "food", name: "Market", icon: "🐟" }],
    location: { address: "5-2-1 Tsukiji", city: "Tokyo", country: "Japan", lat: 35.6654, lng: 139.7707, formatted_address: "Tsukiji, Chuo, Tokyo" },
    rating: 4.6,
    price: 2,
    photos: [{ id: "p5", url: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80", width: 600, height: 400 }],
    hours: { open_now: true, display: "5:00 AM – 2:00 PM" },
    tags: ["Food", "Fresh", "Local Experience"],
    distance: 260,
  },
  {
    id: "6",
    name: "Meiji Shrine",
    description: "A tranquil Shinto shrine dedicated to Emperor Meiji, nestled in a forested urban oasis in Harajuku.",
    categories: [{ id: "religion", name: "Shrine", icon: "⛩️" }],
    location: { address: "1-1 Yoyogikamizonocho", city: "Tokyo", country: "Japan", lat: 35.6763, lng: 139.6993, formatted_address: "Shibuya, Tokyo" },
    rating: 4.7,
    price: 1,
    photos: [{ id: "p6", url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80", width: 600, height: 400 }],
    hours: { open_now: true, display: "Sunrise – Sunset" },
    tags: ["Peaceful", "Forest", "Cultural"],
    distance: 420,
  },
];

const PARIS_SPOTS = [
  {
    id: "7",
    name: "Eiffel Tower",
    description: "The iconic iron lattice tower on the Champ de Mars, offering breathtaking panoramic views of Paris.",
    categories: [{ id: "landmark", name: "Landmark", icon: "🗼" }],
    location: { address: "Champ de Mars", city: "Paris", country: "France", lat: 48.8584, lng: 2.2945, formatted_address: "Champ de Mars, Paris" },
    rating: 4.9,
    price: 2,
    photos: [{ id: "p7", url: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80", width: 600, height: 400 }],
    hours: { open_now: true, display: "9:30 AM – 11:45 PM" },
    tags: ["Iconic", "Romantic", "Views"],
    distance: 100,
  },
  {
    id: "8",
    name: "Louvre Museum",
    description: "Home to over 35,000 works of art including the Mona Lisa. The world's most visited art museum.",
    categories: [{ id: "arts", name: "Museum", icon: "🏛️" }],
    location: { address: "Rue de Rivoli", city: "Paris", country: "France", lat: 48.8606, lng: 2.3376, formatted_address: "1er Arr., Paris" },
    rating: 4.8,
    price: 2,
    photos: [{ id: "p8", url: "https://images.unsplash.com/photo-1565117531952-425e8c65b87c?w=600&q=80", width: 600, height: 400 }],
    hours: { open_now: false, display: "9:00 AM – 6:00 PM" },
    tags: ["Art", "History", "World-Class"],
    distance: 350,
  },
];

const BALI_SPOTS = [
  {
    id: "9",
    name: "Uluwatu Temple",
    description: "A stunning clifftop sea temple with dramatic views of the Indian Ocean and traditional Kecak dance performances.",
    categories: [{ id: "religion", name: "Temple", icon: "⛩️" }],
    location: { address: "Pecatu", city: "Bali", country: "Indonesia", lat: -8.8291, lng: 115.0849, formatted_address: "Pecatu, Kuta Selatan, Bali" },
    rating: 4.8,
    price: 1,
    photos: [{ id: "p9", url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", width: 600, height: 400 }],
    hours: { open_now: true, display: "9:00 AM – 7:00 PM" },
    tags: ["Sunset", "Cultural", "Scenic"],
    distance: 200,
  },
  {
    id: "10",
    name: "Tegallalang Rice Terrace",
    description: "Breathtaking tiered rice paddies near Ubud, a classic example of the subak irrigation system.",
    categories: [{ id: "nature", name: "Nature", icon: "🌾" }],
    location: { address: "Tegallalang", city: "Bali", country: "Indonesia", lat: -8.4312, lng: 115.2790, formatted_address: "Tegallalang, Gianyar, Bali" },
    rating: 4.7,
    price: 1,
    photos: [{ id: "p10", url: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80", width: 600, height: 400 }],
    hours: { open_now: true, display: "Open 24 hours" },
    tags: ["Nature", "Photography", "UNESCO"],
    distance: 450,
  },
];

const MOCK_DB: Record<string, typeof TOKYO_SPOTS> = {
  tokyo: TOKYO_SPOTS,
  japan: TOKYO_SPOTS,
  paris: PARIS_SPOTS,
  france: PARIS_SPOTS,
  bali: BALI_SPOTS,
  indonesia: BALI_SPOTS,
};

const MOCK_WEATHER: Record<string, WeatherResponse> = {
  default: {
    location: { name: "Tokyo", region: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, localtime: new Date().toISOString() },
    current: { temp_c: 18, temp_f: 64, condition: { text: "Partly Cloudy", icon: "", code: 1003 }, wind_kph: 12, humidity: 68, feelslike_c: 16, uv: 4 },
    forecast: {
      forecastday: [
        { date: new Date(Date.now() + 0).toISOString().split("T")[0], date_epoch: Date.now(), day: { maxtemp_c: 20, mintemp_c: 14, avgtemp_c: 17, condition: { text: "Partly Cloudy", icon: "", code: 1003 }, daily_chance_of_rain: 20 } },
        { date: new Date(Date.now() + 86400000).toISOString().split("T")[0], date_epoch: Date.now()+86400000, day: { maxtemp_c: 22, mintemp_c: 15, avgtemp_c: 18, condition: { text: "Sunny", icon: "", code: 1000 }, daily_chance_of_rain: 5 } },
        { date: new Date(Date.now() + 172800000).toISOString().split("T")[0], date_epoch: Date.now()+172800000, day: { maxtemp_c: 19, mintemp_c: 13, avgtemp_c: 16, condition: { text: "Rain", icon: "", code: 1189 }, daily_chance_of_rain: 75 } },
        { date: new Date(Date.now() + 259200000).toISOString().split("T")[0], date_epoch: Date.now()+259200000, day: { maxtemp_c: 16, mintemp_c: 11, avgtemp_c: 14, condition: { text: "Overcast", icon: "", code: 1009 }, daily_chance_of_rain: 30 } },
        { date: new Date(Date.now() + 345600000).toISOString().split("T")[0], date_epoch: Date.now()+345600000, day: { maxtemp_c: 21, mintemp_c: 14, avgtemp_c: 17, condition: { text: "Sunny", icon: "", code: 1000 }, daily_chance_of_rain: 10 } },
        { date: new Date(Date.now() + 432000000).toISOString().split("T")[0], date_epoch: Date.now()+432000000, day: { maxtemp_c: 23, mintemp_c: 16, avgtemp_c: 19, condition: { text: "Partly Cloudy", icon: "", code: 1003 }, daily_chance_of_rain: 15 } },
        { date: new Date(Date.now() + 518400000).toISOString().split("T")[0], date_epoch: Date.now()+518400000, day: { maxtemp_c: 18, mintemp_c: 12, avgtemp_c: 15, condition: { text: "Thunderstorm", icon: "", code: 1276 }, daily_chance_of_rain: 90 } },
      ],
    },
  },
};

// ==================================
// API Fetchers
// ==================================

export async function fetchWeather(city: string): Promise<WeatherResponse> {
  try {
    const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    if (!res.ok) throw new Error("API error");
    return res.json();
  } catch {
    // Return mock data
    const key = city.toLowerCase();
    return MOCK_WEATHER[key] || {
      ...MOCK_WEATHER.default,
      location: { ...MOCK_WEATHER.default.location, name: city },
    };
  }
}

export async function fetchPlaces(city: string): Promise<PlacesResponse> {
  try {
    const res = await fetch(`/api/places?city=${encodeURIComponent(city)}`);
    if (!res.ok) throw new Error("API error");
    return res.json();
  } catch {
    const key = Object.keys(MOCK_DB).find(k => city.toLowerCase().includes(k));
    const results = key ? MOCK_DB[key] : TOKYO_SPOTS;
    return { results, total: results.length, city };
  }
}
