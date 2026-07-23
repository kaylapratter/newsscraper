import React from 'react';
import { Newspaper, Radio, Database, Sparkles } from 'lucide-react';

export default function Header({ articleCount = 0, isLive = true, lastUpdated = null }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Live Badge */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg shadow-red-600/30 ring-1 ring-red-500/50">
            <Newspaper className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading">
                BBC News <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">Pulse</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-950/80 text-red-400 border border-red-800/60">
                <Radio className="w-3 h-3 animate-pulse" /> LIVE SYNC
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Automated Python Scraping & Supabase Real-time Feed
            </p>
          </div>
        </div>

        {/* Status Indicators & Metadata */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <div className="hidden md:flex items-center space-x-4 bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Supabase DB: <strong className="text-white">Connected</strong></span>
            </div>
            <div className="w-px h-3 bg-slate-800" />
            <div className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Articles: <strong className="text-white">{articleCount}</strong></span>
            </div>
          </div>

          {/* Scraper Status Badge */}
          <div className="flex items-center space-x-2 bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="hidden xs:inline">Scraper Active</span>
          </div>
        </div>

      </div>
    </header>
  );
}
