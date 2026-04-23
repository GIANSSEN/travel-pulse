import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatShortDay(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function getWeatherEmoji(code: number): string {
  if (code === 1000) return "☀️";
  if (code >= 1003 && code <= 1009) return "⛅";
  if (code >= 1063 && code <= 1072) return "🌦️";
  if (code >= 1150 && code <= 1207) return "🌧️";
  if (code >= 1210 && code <= 1282) return "❄️";
  if (code >= 1273 && code <= 1282) return "⛈️";
  return "🌤️";
}

export function getPriceLabel(price?: number): string {
  if (!price) return "";
  return "₱".repeat(price);
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + "...";
}
