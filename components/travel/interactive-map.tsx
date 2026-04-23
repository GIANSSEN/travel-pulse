"use client";

import dynamic from "next/dynamic";
import type { Place } from "@/types/places";

// Dynamically import Leaflet (SSR disabled)
const LeafletMap = dynamic(() => import("./leaflet-map"), { ssr: false });

interface InteractiveMapProps {
  spots: Place[];
  city: string;
}

export function InteractiveMap({ spots, city }: InteractiveMapProps) {
  return <LeafletMap spots={spots} city={city} />;
}
