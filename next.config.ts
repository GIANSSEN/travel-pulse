import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "openweathermap.org" },
      { protocol: "https", hostname: "cdnjs.cloudflare.com" },
      { protocol: "https", hostname: "**.foursquare.com" },
      { protocol: "https", hostname: "fastly.4sqi.net" },
    ],
  },
};

export default nextConfig;
