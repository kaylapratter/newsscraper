import React from 'react';
import { Rss, Calendar, ShieldCheck, Flame } from 'lucide-react';

export default function StatsBar({ totalArticles = 0, lastSyncTime = null, activeCategory = 'All' }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
      
      <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center space-x-3.5">
        <div className="p-2.5 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
          <Rss className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold font-heading text-white">{totalArticles}</div>
          <div className="text-xs text-slate-400">Total Stories</div>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center space-x-3.5">
        <div className="p-2.5 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/40">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold font-heading text-white">2026</div>
          <div className="text-xs text-slate-400">Archive Coverage</div>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center space-x-3.5">
        <div className="p-2.5 rounded-xl bg-teal-950/60 text-teal-400 border border-teal-800/40">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold font-heading text-white">Verified</div>
          <div className="text-xs text-slate-400">Journalism Standard</div>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex items-center space-x-3.5">
        <div className="p-2.5 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/40">
          <Flame className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold font-heading text-white truncate max-w-[90px]">{activeCategory}</div>
          <div className="text-xs text-slate-400">Active Section</div>
        </div>
      </div>

    </div>
  );
}
