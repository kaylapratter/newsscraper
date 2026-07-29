import React from 'react';
import { Newspaper, Radio, Flame, Sparkles } from 'lucide-react';

export default function Header({ articleCount = 0 }) {
  const currentDateStr = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <header className="w-full bg-[#080b10] border-b border-slate-800/80">
      
      {/* Top Breaking Marquee Ticker Bar */}
      <div className="bg-emerald-950/90 border-b border-emerald-800/60 py-2 px-4 text-xs flex items-center justify-between text-emerald-200 overflow-hidden shadow-sm">
        <div className="flex items-center space-x-2 shrink-0 pr-4 bg-emerald-950 font-bold uppercase tracking-wider text-[11px] text-emerald-400 z-10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Breaking News:</span>
        </div>
        <div className="whitespace-nowrap overflow-hidden relative flex-1">
          <div className="inline-block animate-marquee text-slate-200 font-medium">
            Kenya Trade & Regional Economy Surge in 2026 • Nairobi Infrastructure Expansion Projects Milestone • Geothermal & Solar Investments Lead East Africa Clean Power • Digital Tech Academies Equip Youth • Mombasa Port Logistics Automation Cuts Transit Times
          </div>
        </div>
        <div className="shrink-0 pl-4 hidden sm:flex items-center space-x-2 text-[11px] font-semibold text-emerald-300">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Live Edition</span>
        </div>
      </div>

      {/* Main Newspaper Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        
        {/* Date Issue Header Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-widest pb-3 border-b border-slate-800/60 font-medium">
          <div>Nairobi, Kenya • 2026 Global Edition</div>
          <div className="font-semibold text-slate-200">{currentDateStr}</div>
          <div className="hidden md:block">Issue No. 4,120</div>
        </div>

        {/* Masthead Branding */}
        <div className="py-6">
          <div className="inline-flex items-center justify-center space-x-3 mb-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-lg shadow-emerald-600/20 ring-1 ring-emerald-400/40">
              <Newspaper className="w-8 h-8 sm:w-11 sm:h-11" />
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight font-editorial text-white uppercase drop-shadow-md">
              The Weekly <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">News Pulse</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-sans tracking-wide">
            Independent Investigative Reporting, National Politics & Comprehensive 2026 Archive
          </p>
        </div>

        {/* Bottom Double Line Accent Bar */}
        <div className="editorial-border py-2 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Digital Publication: <strong className="text-white">Active 2026 Archive</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Curated Stories: <strong className="text-emerald-400">{articleCount} Articles</strong></span>
          </div>
        </div>

      </div>

    </header>
  );
}
