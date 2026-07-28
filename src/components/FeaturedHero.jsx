import React from 'react';
import { ExternalLink, Eye, Bookmark, Sparkles, Clock, Share2 } from 'lucide-react';

export default function FeaturedHero({ article, onOpenModal, isBookmarked, onToggleBookmark }) {
  if (!article) return null;

  const { title, cleanTitle, link, summary, category, formattedDate, published, source, image_url } = article;
  const displayTitle = cleanTitle || title;
  const isWeeklyCitizen = source === 'Weekly Citizen';

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="w-full mb-10 rounded-2xl overflow-hidden glass-panel border border-slate-800 shadow-2xl relative group">
      
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-20 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-600" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Side Image (or Hero Background) */}
        <div className="lg:col-span-7 relative min-h-[260px] lg:min-h-[380px] bg-slate-950 overflow-hidden">
          <img
            src={image_url || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop"}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f141d] via-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f141d]" />
          
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-emerald-600 text-white shadow-lg">
              <Sparkles className="w-3.5 h-3.5" /> Featured Lead
            </span>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase text-white shadow-md ${
              isWeeklyCitizen ? 'bg-emerald-900/90 border border-emerald-500/50' : 'bg-red-900/90 border border-red-500/50'
            }`}>
              {source || 'Weekly Citizen'}
            </span>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#0f141d]">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300">
                {category || 'Lead Story'}
              </span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{formattedDate || published}</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-editorial text-white group-hover:text-emerald-400 transition-colors leading-tight mb-4">
              <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-emerald-500/50 underline-offset-4">
                {displayTitle}
              </a>
            </h2>

            <p className="text-sm text-slate-300 line-clamp-4 leading-relaxed mb-6 font-sans">
              {summary || 'Read the full in-depth story coverage from our correspondents.'}
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenModal(article)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
              >
                <Eye className="w-4 h-4 text-emerald-400" /> Read Full Summary
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                title="Copy link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleBookmark(article)}
                className={`p-2 rounded-xl transition-all ${
                  isBookmarked
                    ? 'text-amber-400 bg-amber-950/80 border border-amber-500/50'
                    : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800'
                }`}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
              </button>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-all ${
                  isWeeklyCitizen
                    ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                    : 'bg-red-600 hover:bg-red-500 shadow-red-600/30'
                }`}
              >
                <span>Read Original</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
