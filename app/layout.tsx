import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TravelPulse — Discover Your Next Adventure",
  description:
    "Explore curated travel destinations, check real-time weather, and plan your perfect itinerary with TravelPulse — your AI-powered travel companion.",
  keywords: ["travel", "itinerary", "destinations", "weather", "explore"],
  openGraph: {
    title: "TravelPulse",
    description: "Discover your next adventure",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full overflow-hidden antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
