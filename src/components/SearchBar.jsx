import React from 'react';
import { Search, RotateCw, X, Filter, Bookmark, Globe2 } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  selectedSource,
  setSelectedSource,
  sources,
  onRefresh,
  isRefreshing,
  bookmarkCount = 0,
  showOnlyBookmarks,
  setShowOnlyBookmarks
}) {
  return (
    <div className="w-full space-y-4 mb-8">
      
      {/* Top Bar: Search Input & Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search BBC and Weekly Citizen headlines or summaries..."
            className="w-full pl-10 pr-10 py-3 bg-slate-900/80 border border-slate-800 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 rounded-xl text-sm text-slate-100 placeholder-slate-500 transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 active:scale-[0.98] text-slate-200 text-sm font-medium rounded-xl transition-all shadow-sm disabled:opacity-60"
            title="Refresh news feed"
          >
            <RotateCw className={`w-4 h-4 text-red-500 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">Refresh Feed</span>
          </button>

          <button
            onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
            className={`flex items-center justify-center gap-2 px-4 py-3 border text-sm font-medium rounded-xl transition-all ${
              showOnlyBookmarks
                ? 'bg-amber-950/60 border-amber-500/60 text-amber-300 shadow-lg shadow-amber-500/10'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${showOnlyBookmarks ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="hidden sm:inline">Saved</span>
            {bookmarkCount > 0 && (
              <span className={`px-1.5 py-0.5 text-xs rounded-md ${showOnlyBookmarks ? 'bg-amber-500/30 text-amber-200' : 'bg-slate-800 text-slate-300'}`}>
                {bookmarkCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* News Outlets / Sources Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center text-xs font-semibold text-slate-400 uppercase tracking-wider pr-2 border-r border-slate-800">
          <Globe2 className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Outlet:
        </div>
        {sources.map(src => {
          const isActive = selectedSource === src && !showOnlyBookmarks;
          return (
            <button
              key={src}
              onClick={() => {
                setShowOnlyBookmarks(false);
                setSelectedSource(src);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400/50'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {src}
            </button>
          );
        })}
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
        <div className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wider pr-2 border-r border-slate-800">
          <Filter className="w-3.5 h-3.5 mr-1" /> Topic:
        </div>
        
        {categories.map((category) => {
          const isActive = selectedCategory === category && !showOnlyBookmarks;
          return (
            <button
              key={category}
              onClick={() => {
                setShowOnlyBookmarks(false);
                setSelectedCategory(category);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30 font-semibold ring-1 ring-red-400/50'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

    </div>
  );
}
