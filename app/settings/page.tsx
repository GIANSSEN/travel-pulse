"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Settings, Globe, Bell, Palette, Shield, Trash2, Moon, Sun, Monitor } from "lucide-react";
import { useState } from "react";

type Theme = "dark" | "light" | "system";
type Units = "metric" | "imperial";
type Language = "en" | "es" | "ja" | "fr";

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [units, setUnits] = useState<Units>("metric");
  const [language, setLanguage] = useState<Language>("en");
  const [notifications, setNotifications] = useState({
    weather: true,
    deals: false,
    reminders: true,
  });

  return (
    <div className="app-shell">
      <div className="app-background" />
      <Sidebar />

      <div className="main-area">
        <TopNav />

        <ScrollArea className="flex-1" orientation="vertical">
          <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-600 to-gray-500 flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-sm text-white/40">Customize your TravelPulse experience</p>
              </div>
            </div>

            {/* Appearance */}
            <section className="glass-card rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-white/5 flex items-center gap-2">
                <Palette className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-white/80">Appearance</span>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs text-white/50 mb-2">Theme</p>
                  <div className="flex gap-2">
                    {([
                      { value: "dark" as Theme, label: "Dark", icon: Moon },
                      { value: "light" as Theme, label: "Light", icon: Sun },
                      { value: "system" as Theme, label: "System", icon: Monitor },
                    ] as { value: Theme; label: string; icon: typeof Moon }[]).map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        id={`theme-${value}`}
                        onClick={() => setTheme(value)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          theme === value
                            ? "bg-violet-600/40 border border-violet-500/40 text-violet-200"
                            : "bg-white/5 border border-white/8 text-white/50 hover:bg-white/10 hover:text-white/80"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Regional */}
            <section className="glass-card rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-white/5 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-white/80">Regional</span>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs text-white/50 mb-2">Temperature Units</p>
                  <div className="flex gap-2">
                    {([
                      { value: "metric" as Units, label: "°C Celsius" },
                      { value: "imperial" as Units, label: "°F Fahrenheit" },
                    ] as { value: Units; label: string }[]).map(({ value, label }) => (
                      <button
                        key={value}
                        id={`units-${value}`}
                        onClick={() => setUnits(value)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          units === value
                            ? "bg-violet-600/40 border border-violet-500/40 text-violet-200"
                            : "bg-white/5 border border-white/8 text-white/50 hover:bg-white/10 hover:text-white/80"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-2">Language</p>
                  <select
                    id="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/80 focus:outline-none focus:ring-2 focus:ring-violet-500/40 appearance-none cursor-pointer"
                  >
                    <option value="en" className="bg-[#0d1226]">🇺🇸 English</option>
                    <option value="es" className="bg-[#0d1226]">🇪🇸 Español</option>
                    <option value="ja" className="bg-[#0d1226]">🇯🇵 日本語</option>
                    <option value="fr" className="bg-[#0d1226]">🇫🇷 Français</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section className="glass-card rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-white/5 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-white/80">Notifications</span>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { key: "weather" as const, label: "Weather Alerts", desc: "Rain & extreme weather warnings" },
                  { key: "deals" as const, label: "Travel Deals", desc: "Discounts and special offers" },
                  { key: "reminders" as const, label: "Trip Reminders", desc: "Upcoming itinerary events" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm text-white/80">{label}</p>
                      <p className="text-[11px] text-white/40">{desc}</p>
                    </div>
                    <button
                      id={`notif-toggle-${key}`}
                      onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))}
                      className={`relative w-10 h-6 rounded-full transition-all duration-300 ${
                        notifications[key] ? "bg-violet-600" : "bg-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${
                          notifications[key] ? "left-5" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Privacy */}
            <section className="glass-card rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-white/5 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-white/80">Privacy & Data</span>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-xs text-white/40 leading-relaxed">
                  TravelPulse stores your itinerary and favorites locally in your browser. No personal data is sent to external servers without your knowledge.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="secondary" size="sm" id="export-data">
                    Export My Data
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    id="clear-data"
                    onClick={() => {
                      if (confirm("Clear all local data? This cannot be undone.")) {
                        localStorage.clear();
                        window.location.reload();
                      }
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear All Data
                  </Button>
                </div>
              </div>
            </section>

            {/* About */}
            <div className="text-center py-6">
              <p className="text-xs text-white/20">TravelPulse v1.0.0 · Built with ❤️ using Next.js 16</p>
              <p className="text-xs text-white/15 mt-1">Powered by OpenWeatherMap · Foursquare · Unsplash</p>
            </div>

          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
