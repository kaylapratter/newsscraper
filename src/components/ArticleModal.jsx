import React from 'react';
import { X, ExternalLink, Bookmark, Clock, Share2, Globe, Newspaper } from 'lucide-react';

export default function ArticleModal({ article, onClose, isBookmarked, onToggleBookmark }) {
  if (!article) return null;

  const { title, cleanTitle, link, summary, content, category, formattedDate, published, source, image_url } = article;
  const displayTitle = cleanTitle || title;
  const isWeeklyCitizen = source === 'Weekly Citizen';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Line */}
        <div className={`h-1.5 w-full ${isWeeklyCitizen ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-red-600 to-amber-500'}`} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">

          {/* Featured Image if present */}
          {image_url && (
            <div className="relative w-full h-64 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <img src={image_url} alt={displayTitle} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Category & Source Metadata */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
              isWeeklyCitizen 
                ? 'bg-emerald-950 border border-emerald-800 text-emerald-400' 
                : 'bg-red-950 border border-red-800 text-red-400'
            }`}>
              {source || 'BBC News'}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300">
              {category || 'General'}
            </span>
            <div className="flex items-center text-xs text-slate-400 space-x-1.5 ml-auto">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{formattedDate || published}</span>
            </div>
          </div>

          {/* Article Title */}
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white leading-tight">
            {displayTitle}
          </h2>

          {/* Full Article Content or Summary */}
          {content ? (
            <div 
              className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/80 pt-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-6 text-slate-300 text-sm sm:text-base leading-relaxed">
              {summary || 'No extended content snippet available.'}
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-6 border-t border-slate-800 bg-slate-950/90 mt-auto">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
            >
              <Share2 className="w-4 h-4 text-slate-400" /> Copy Link
            </button>

            <button
              onClick={() => onToggleBookmark(article)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                isBookmarked
                  ? 'bg-amber-950/80 border border-amber-500/50 text-amber-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-lg transition-all ${
              isWeeklyCitizen 
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30' 
                : 'bg-red-600 hover:bg-red-500 shadow-red-600/30'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Read Original Article on {source}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
