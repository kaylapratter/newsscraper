import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-5 w-24 bg-slate-800 rounded-lg" />
        <div className="h-4 w-20 bg-slate-800 rounded-lg" />
      </div>
      <div className="h-6 w-5/6 bg-slate-800 rounded-lg" />
      <div className="h-6 w-3/4 bg-slate-800 rounded-lg" />
      <div className="space-y-2 pt-2">
        <div className="h-3 w-full bg-slate-800/60 rounded" />
        <div className="h-3 w-4/5 bg-slate-800/60 rounded" />
      </div>
      <div className="pt-4 border-t border-slate-800/60 flex justify-between items-center">
        <div className="h-7 w-24 bg-slate-800 rounded-lg" />
        <div className="h-7 w-24 bg-slate-800 rounded-lg" />
      </div>
    </div>
  );
}
