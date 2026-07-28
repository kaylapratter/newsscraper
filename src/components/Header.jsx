import React from 'react';
import { Newspaper, Radio, Database, Flame, Globe2 } from 'lucide-react';

export default function Header({ articleCount = 0, isLive = true }) {
  const currentDateStr = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <header className="w-full bg-[#090c10] border-b border-slate-800">
      
      {/* Top Breaking Marquee Bar */}
      <div className="bg-emerald-950/80 border-b border-emerald-800/60 py-1.5 px-4 text-xs flex items-center justify-between text-emerald-200 overflow-hidden">
        <div className="flex items-center space-x-2 shrink-0 pr-4 bg-emerald-950 font-bold uppercase tracking-wider text-[11px] text-emerald-400 z-10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Breaking News:</span>
        </div>
        <div className="whitespace-nowrap overflow-hidden relative flex-1">
          <div className="inline-block animate-marquee text-slate-300">
            Kenya Trade & Economy Growth • Real-time Supabase Database Active • Nairobi Infrastructure Milestones • Renewable Energy Surge in East Africa • Tech Innovation Hubs Empower Youth
          </div>
        </div>
        <div className="shrink-0 pl-4 hidden sm:flex items-center space-x-2 text-[11px] text-emerald-300">
          <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>Live Edition</span>
        </div>
      </div>

      {/* Main Newspaper Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        
        {/* Date Issue Header Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-widest pb-3 border-b border-slate-800/60 font-medium">
          <div>Nairobi, Kenya • Est. 1998</div>
          <div className="font-semibold text-slate-200">{currentDateStr}</div>
          <div className="hidden md:block">Issue No. 2,480</div>
        </div>

        {/* Masthead Branding */}
        <div className="py-5">
          <div className="inline-flex items-center justify-center space-x-3 mb-1">
            <div className="p-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400">
              <Newspaper className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight font-editorial text-white uppercase drop-shadow-md">
              The Weekly <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">Citizen</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans tracking-wide">
            Independent Investigative News, National Politics & Global Archive Feed
          </p>
        </div>

        {/* Bottom Double Line Accent */}
        <div className="editorial-border py-1.5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase Sync: <strong className="text-emerald-300">Connected</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Total Stories Stored: <strong className="text-white">{articleCount}</strong></span>
          </div>
        </div>

      </div>

    </header>
  );
}
