import React from 'react';
import { Rss, Clock, ShieldCheck, Flame } from 'lucide-react';

export default function StatsBar({ totalArticles = 0, lastSyncTime = null, activeCategory = 'All' }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
      
      <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center space-x-3.5">
        <div className="p-2.5 rounded-xl bg-red-950/60 text-red-400 border border-red-800/40">
          <Rss className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold font-heading text-white">{totalArticles}</div>
          <div className="text-xs text-slate-400">Total Scraped</div>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center space-x-3.5">
        <div className="p-2.5 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/40">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold font-heading text-white">
            {lastSyncTime ? 'Just Now' : 'Every 6h'}
          </div>
          <div className="text-xs text-slate-400">Cron Schedule</div>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center space-x-3.5">
        <div className="p-2.5 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold font-heading text-white">Live</div>
          <div className="text-xs text-slate-400">Realtime Sync</div>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center space-x-3.5">
        <div className="p-2.5 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/40">
          <Flame className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold font-heading text-white truncate max-w-[90px]">{activeCategory}</div>
          <div className="text-xs text-slate-400">Current View</div>
        </div>
      </div>

    </div>
  );
}
