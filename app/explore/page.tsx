import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { RightPanel } from "@/components/layout/right-panel";
import { SpotList } from "@/components/travel/spot-list";

export const metadata: Metadata = {
  title: "Explore — TravelPulse",
  description: "Discover recommended spots and plan your trip.",
};

export default function ExplorePage() {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#060a16] text-white">
      {/* Background radial/pattern effect */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#060a16] via-[#091024] to-[#0c1328]" />
      
      {/* Abstract Map overlay simulating the UI image background */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 10 Q 50 90 90 20\' stroke=\'white\' fill=\'none\' stroke-width=\'1\'/%3E%3Cpath d=\'M20 90 Q 50 10 90 80\' stroke=\'white\' fill=\'none\' stroke-width=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: '400px 400px'
        }}
      />
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 pr-8 relative z-10 w-full">
        <TopNav />
        
        {/* Layout Split Layer */}
        <div className="flex gap-8 flex-1 mt-6 mb-8 min-h-0">
          
          {/* Left Panel - approx 60% */}
          <div className="flex-[5.5] flex flex-col min-w-0 h-full relative">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                LEFT PANEL <span className="opacity-40">(60%)</span>
              </span>
            </div>
            
            <div className="flex-1 min-h-0 w-full overflow-hidden relative">
               <SpotList />
            </div>
          </div>
          
          {/* Right Panel - approx 40% */}
          <div className="flex-[4.5] flex flex-col min-w-0 h-full">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                RIGHT PANEL <span className="opacity-40">(40%)</span>
              </span>
            </div>
          
             <RightPanel />
          </div>
          
        </div>
      </div>
    </div>
  );
}
