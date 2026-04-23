"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import type { Place } from "@/types/places";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom glowing marker
function createPurpleIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 20px; height: 20px;
      background: transparent;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid #8b5cf6;
      box-shadow: 0 0 10px #8b5cf6, inset 0 0 5px #8b5cf6;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="width: 4px; height: 4px; background: white; border-radius: 50%; box-shadow: 0 0 4px white;"></div>
    </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -22],
  });
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
}

interface LeafletMapProps {
  spots: Place[];
  city: string;
}

// Default city coordinates
const CITY_COORDS: Record<string, [number, number]> = {
  Tokyo: [35.6762, 139.6503],
  Paris: [48.8566, 2.3522],
  Bali: [-8.4095, 115.1889],
  "New York": [40.7128, -74.006],
  Seoul: [37.5665, 126.978],
  Rome: [41.9028, 12.4964],
};

function getCityCenter(city: string, spots: Place[]): [number, number] {
  if (spots.length > 0) {
    return [spots[0].location.lat, spots[0].location.lng];
  }
  const key = Object.keys(CITY_COORDS).find((k) => city.toLowerCase().includes(k.toLowerCase()));
  return key ? CITY_COORDS[key] : [35.6762, 139.6503];
}

export default function LeafletMap({ spots, city }: LeafletMapProps) {
  const center = getCityCenter(city, spots);
  const purpleIcon = createPurpleIcon();

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%", background: "#0d1117" }}
      zoomControl={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com">CARTO</a>'
      />
      <MapUpdater center={center} />
      {spots.slice(0, 10).map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.location.lat, spot.location.lng]}
          icon={purpleIcon}
        >
          <Popup>
            <div style={{ background: "#1a1a2e", color: "white", borderRadius: 8, padding: "8px 12px", minWidth: 160, border: "1px solid rgba(124,58,237,0.3)" }}>
              <p style={{ fontWeight: 700, fontSize: 13, margin: 0 }}>{spot.name}</p>
              <p style={{ fontSize: 11, color: "rgba(200,200,255,0.7)", margin: "2px 0 0" }}>
                {spot.categories[0]?.name} · ⭐ {spot.rating}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
