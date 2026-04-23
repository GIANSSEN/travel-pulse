"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Compass, Calendar, Heart, CloudSun, Settings, LogOut, User } from "lucide-react";

const navItems = [
  { href: "/explore", icon: Compass, label: "EXPLORE", isOutlined: true },
  { href: "/itinerary", icon: Calendar, label: "MY ITINERARY" },
  { href: "/favorites", icon: Heart, label: "FAVORITES" },
  { href: "/weather", icon: CloudSun, label: "WEATHER CENTER" },
  { href: "/settings", icon: Settings, label: "SETTINGS" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar-glass w-[200px] shrink-0 h-full flex flex-col justify-between pt-16 pb-8 relative z-20">
      <nav className="flex flex-col gap-10">
        {navItems.map(({ href, icon: Icon, label, isOutlined }) => {
          const isActive = pathname === href || (href === "/explore" && pathname === "/");
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-3 relative group">
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-cyan-400 rounded-r shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              )}
              <div 
                className={cn(
                  "flex items-center justify-center rounded-full transition-all duration-300",
                  isActive && isOutlined ? "w-12 h-12 border-2 border-violet-500/50 bg-violet-600/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]" : "w-12 h-12",
                  isActive ? "scale-110" : "hover:scale-105"
                )}
              >
                <Icon
                  className={cn(
                    "w-[22px] h-[22px] transition-colors",
                    isActive ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "text-violet-400/60 group-hover:text-violet-300"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span className={cn(
                "text-[10px] font-bold tracking-widest",
                isActive ? "text-cyan-300" : "text-white/40 group-hover:text-white/70"
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="px-5 mt-auto">
        <div className="bg-white/5 border border-white/10 rounded-[20px] p-2.5 flex items-center shadow-lg hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-md">
          <div className="w-8 h-8 rounded-full bg-[#161d31] flex items-center justify-center border border-white/20 shrink-0">
            <User className="w-4 h-4 text-white/80" />
          </div>
          <span className="text-[11px] font-bold text-white uppercase tracking-wider ml-2 truncate">Alex Chen</span>
        </div>
        <button className="w-full text-center mt-3 text-[10px] font-bold tracking-widest text-[#a8b2d1]/60 hover:text-white transition-colors">
          LOGOUT
        </button>
      </div>
    </aside>
  );
}
