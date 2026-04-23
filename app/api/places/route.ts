import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city") || "Tokyo";
  const apiKey = process.env.FOURSQUARE_API_KEY;
  const unsplashKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "No API key configured. Using mock data on client." },
      { status: 503 }
    );
  }

  try {
    // Foursquare Places Search
    const res = await fetch(
      `https://api.foursquare.com/v3/places/search?near=${encodeURIComponent(city)}&limit=12&categories=16000,13000,10000,19000`,
      {
        headers: {
          Authorization: apiKey,
          Accept: "application/json",
        },
        next: { revalidate: 1800 },
      }
    );

    if (!res.ok) {
      throw new Error(`Foursquare error: ${res.status}`);
    }

    const data = await res.json();
    const places = data.results || [];

    // Enrich with Unsplash photos if key available
    const enriched = await Promise.all(
      places.map(async (place: Record<string, unknown>) => {
        const loc = place.geocodes as Record<string, Record<string, number>>;
        const categories = (place.categories as Array<Record<string, unknown>>) || [];
        const location = (place.location as Record<string, unknown>) || {};

        let photoUrl = `https://picsum.photos/seed/${place.fsq_id || place.name}/600/400`;

        if (unsplashKey) {
          try {
            const query = `${(categories[0] as Record<string, string>)?.name || ""} ${city} travel`;
            const photoRes = await fetch(
              `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${unsplashKey}`,
              { next: { revalidate: 86400 } }
            );
            if (photoRes.ok) {
              const photo = await photoRes.json();
              photoUrl = photo.urls?.regular || photoUrl;
            }
          } catch {
            // keep picsum fallback
          }
        }

        return {
          id: place.fsq_id || String(Math.random()),
          name: place.name,
          description: `A recommended spot in ${city} — ${(categories[0] as Record<string, string>)?.name || "attraction"}.`,
          categories: categories.map((cat: Record<string, unknown>) => ({
            id: String(cat.id),
            name: String(cat.name),
            icon: "📍",
          })),
          location: {
            address: String(location.address || ""),
            city: String(location.locality || city),
            country: String(location.country || ""),
            lat: loc?.main?.latitude || 0,
            lng: loc?.main?.longitude || 0,
            formatted_address: [location.address, location.locality, location.country]
              .filter(Boolean)
              .join(", "),
          },
          rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
          photos: [{ id: "1", url: photoUrl, width: 600, height: 400 }],
          tags: [(categories[0] as Record<string, string>)?.name || "Attraction", city, "Recommended"].filter(Boolean),
          distance: place.distance || 0,
        };
      })
    );

    return NextResponse.json({ results: enriched, total: enriched.length, city });
  } catch (error) {
    console.error("Places API error:", error);
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
  }
}
