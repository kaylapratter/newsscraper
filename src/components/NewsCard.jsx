import React from 'react';
import { ExternalLink, Bookmark, Clock, Eye, Share2 } from 'lucide-react';

export default function NewsCard({ article, onOpenModal, isBookmarked, onToggleBookmark }) {
  const { title, link, summary, category, formattedDate, published } = article;

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <article className="group glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
      
      {/* Top Accent Gradient on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Header Metadata: Category Tag & Timestamp */}
        <div className="flex items-center justify-between mb-3.5 gap-2">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wider uppercase bg-red-950/60 border border-red-800/40 text-red-400">
            {category || 'World News'}
          </span>
          <div className="flex items-center text-xs text-slate-400 gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{formattedDate || published || 'Recently'}</span>
          </div>
        </div>

        {/* Article Title */}
        <h2 className="text-lg font-bold text-slate-100 font-heading group-hover:text-red-400 transition-colors duration-200 line-clamp-2 leading-snug mb-2.5">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline decoration-red-500/50 underline-offset-4"
          >
            {title}
          </a>
        </h2>

        {/* Article Summary Snippet */}
        <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed mb-6 font-normal">
          {summary || 'No detailed summary snippet available for this headline.'}
        </p>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-auto">
        
        <div className="flex items-center space-x-2">
          {/* Quick View Button */}
          <button
            onClick={() => onOpenModal(article)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" /> Quick View
          </button>

          {/* Share Copy Link */}
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all"
            title="Copy link"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Bookmark Button */}
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

          {/* Full Article External Link */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600/90 hover:bg-red-600 text-white transition-all shadow-sm hover:shadow-red-600/25"
          >
            <span>BBC News</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </article>
  );
}
