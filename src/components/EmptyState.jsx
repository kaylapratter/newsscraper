import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({ onReset }) {
  return (
    <div className="w-full glass-panel rounded-2xl p-12 text-center my-8 flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shadow-inner">
        <SearchX className="w-8 h-8 text-red-500/80" />
      </div>
      
      <div className="space-y-1 max-w-md">
        <h3 className="text-xl font-bold font-heading text-slate-100">No News Articles Found</h3>
        <p className="text-sm text-slate-400">
          We couldn't find any articles matching your search query or selected category filter.
        </p>
      </div>

      {onReset && (
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl transition-all border border-slate-700 shadow-sm mt-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
}
