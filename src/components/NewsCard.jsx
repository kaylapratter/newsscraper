import React from 'react';
import { ExternalLink, Bookmark, Clock, Eye, Share2, Globe } from 'lucide-react';

export default function NewsCard({ article, onOpenModal, isBookmarked, onToggleBookmark }) {
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
    <article className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between relative">
      
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-1 z-10 transition-opacity duration-300 ${
        isWeeklyCitizen 
          ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600' 
          : 'bg-gradient-to-r from-red-600 via-amber-500 to-red-600'
      }`} />

      {/* Featured Image if available */}
      {image_url ? (
        <div className="relative w-full h-44 overflow-hidden bg-slate-900">
          <img
            src={image_url}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161820] via-transparent to-transparent opacity-90" />
          <div className="absolute top-3 left-3 z-10 flex items-center space-x-2">
            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase text-white shadow-md ${
              isWeeklyCitizen ? 'bg-emerald-700/90 border border-emerald-500/50' : 'bg-red-700/90 border border-red-500/50'
            }`}>
              {source || 'BBC News'}
            </span>
          </div>
        </div>
      ) : null}

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Tags */}
          {!image_url && (
            <div className="flex items-center justify-between mb-3 gap-2">
              <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase ${
                isWeeklyCitizen 
                  ? 'bg-emerald-950/80 border border-emerald-800/60 text-emerald-400' 
                  : 'bg-red-950/60 border border-red-800/40 text-red-400'
              }`}>
                {source || 'BBC News'}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-800 text-slate-400">
                {category || 'General'}
              </span>
            </div>
          )}

          {image_url && (
            <div className="flex items-center justify-between mb-2 text-xs text-slate-400">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                {category || 'General'}
              </span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{formattedDate || published}</span>
              </div>
            </div>
          )}

          {/* Headline */}
          <h2 className="text-lg font-bold text-slate-100 font-heading group-hover:text-red-400 transition-colors duration-200 line-clamp-2 leading-snug mb-2.5">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline decoration-red-500/50 underline-offset-4"
            >
              {displayTitle}
            </a>
          </h2>

          {/* Summary Snippet */}
          <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4 font-normal">
            {summary || 'No detailed summary snippet available for this news story.'}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onOpenModal(article)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" /> Quick View
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all"
              title="Copy link"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article);
              }}
              className={`p-1.5 rounded-lg transition-all ${
                isBookmarked
                  ? 'text-amber-400 bg-amber-950/60 border border-amber-500/40'
                  : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800/60'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all shadow-sm ${
                isWeeklyCitizen
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25'
                  : 'bg-red-600 hover:bg-red-500 shadow-red-600/25'
              }`}
            >
              <span>{isWeeklyCitizen ? 'Citizen' : 'BBC'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </article>
  );
}
