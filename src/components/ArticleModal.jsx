import React from 'react';
import { X, ExternalLink, Bookmark, Clock, Share2, Globe } from 'lucide-react';

export default function ArticleModal({ article, onClose, isBookmarked, onToggleBookmark }) {
  if (!article) return null;

  const { title, link, summary, category, formattedDate, published } = article;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Timestamp */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="px-3 py-1 rounded-lg text-xs font-semibold uppercase bg-red-950/80 border border-red-800/60 text-red-400">
            {category || 'World News'}
          </span>
          <div className="flex items-center text-xs text-slate-400 space-x-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{formattedDate || published}</span>
          </div>
        </div>

        {/* Article Headline */}
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white mb-4 leading-snug">
          {title}
        </h2>

        {/* Article Body Snippet */}
        <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-5 mb-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          {summary || 'No detailed summary snippet available for this news item.'}
        </div>

        {/* Modal Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-2">
            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
            >
              <Share2 className="w-4 h-4 text-slate-400" /> Copy Link
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => onToggleBookmark(article)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                isBookmarked
                  ? 'bg-amber-950/80 border border-amber-500/50 text-amber-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isBookmarked ? 'Bookmarked' : 'Save'}</span>
            </button>
          </div>

          {/* Go to BBC Button */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>Read Full Story on BBC</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
