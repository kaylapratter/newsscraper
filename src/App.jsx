import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FeaturedHero from './components/FeaturedHero';
import NewsCard from './components/NewsCard';
import ArticleModal from './components/ArticleModal';
import SkeletonCard from './components/SkeletonCard';
import EmptyState from './components/EmptyState';
import StatsBar from './components/StatsBar';
import Footer from './components/Footer';
import { fetchArticlesFromSupabase, supabase } from './lib/supabase';
import { Bell } from 'lucide-react';

const CATEGORIES = ['All', 'Kenya & East Africa', 'World & Politics', 'Technology', 'Business & Economy', 'Health & Energy', 'UK News'];
const SOURCES = ['All Outlets', 'Weekly Citizen', 'BBC News'];

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All Outlets');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('bbc_saved_articles');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  const loadArticles = async (showSpinner = false) => {
    if (showSpinner) setIsRefreshing(true);
    try {
      const { data, error } = await fetchArticlesFromSupabase();
      if (!error && data) {
        setArticles(data);
        setLastSyncTime(new Date());
      }
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadArticles();

    const channel = supabase
      .channel('realtime-articles')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'articles' },
        (payload) => {
          showToast(`New article: "${payload.new?.title || 'Feed Update'}"`);
          loadArticles();
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Artcles' },
        (payload) => {
          showToast(`New article: "${payload.new?.title || 'Feed Update'}"`);
          loadArticles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bbc_saved_articles', JSON.stringify(bookmarks));
    } catch (e) {
      console.error("Failed to save bookmarks:", e);
    }
  }, [bookmarks]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleBookmark = (article) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.link === article.link);
      if (exists) {
        return prev.filter(b => b.link !== article.link);
      } else {
        return [...prev, article];
      }
    });
  };

  const filteredArticles = useMemo(() => {
    let sourceList = showOnlyBookmarks ? bookmarks : articles;

    return sourceList.filter(article => {
      if (selectedSource !== 'All Outlets' && !showOnlyBookmarks) {
        if (article.source !== selectedSource) {
          return false;
        }
      }

      if (selectedCategory !== 'All' && !showOnlyBookmarks) {
        if (article.category !== selectedCategory) {
          return false;
        }
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatches = (article.cleanTitle || article.title || '').toLowerCase().includes(query);
        const summaryMatches = (article.summary || '').toLowerCase().includes(query);
        return titleMatches || summaryMatches;
      }

      return true;
    });
  }, [articles, bookmarks, searchQuery, selectedCategory, selectedSource, showOnlyBookmarks]);

  const heroArticle = filteredArticles[0] || null;
  const gridArticles = filteredArticles.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e14] text-slate-100 selection:bg-emerald-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-emerald-950 border border-emerald-600/80 text-white px-5 py-3.5 rounded-2xl shadow-2xl animate-bounce">
          <Bell className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Editorial Header & Masthead */}
      <Header
        articleCount={articles.length}
        lastUpdated={lastSyncTime}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Stats Analytics Overview */}
        <StatsBar
          totalArticles={articles.length}
          lastSyncTime={lastSyncTime}
          activeCategory={showOnlyBookmarks ? 'Saved' : selectedCategory}
        />

        {/* Search & Outlet Filter Bar */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={CATEGORIES}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          sources={SOURCES}
          onRefresh={() => loadArticles(true)}
          isRefreshing={isRefreshing}
          bookmarkCount={bookmarks.length}
          showOnlyBookmarks={showOnlyBookmarks}
          setShowOnlyBookmarks={setShowOnlyBookmarks}
        />

        {/* Featured Hero Story for Top Result */}
        {!loading && heroArticle && !searchQuery && selectedCategory === 'All' && selectedSource === 'All Outlets' && !showOnlyBookmarks && (
          <FeaturedHero
            article={heroArticle}
            onOpenModal={(art) => setSelectedArticle(art)}
            isBookmarked={bookmarks.some(b => b.link === heroArticle.link)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* Article Grid / Loading / Empty State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(!searchQuery && selectedCategory === 'All' && selectedSource === 'All Outlets' && !showOnlyBookmarks ? gridArticles : filteredArticles).map(article => (
              <NewsCard
                key={article.id || article.link}
                article={article}
                onOpenModal={(art) => setSelectedArticle(art)}
                isBookmarked={bookmarks.some(b => b.link === article.link)}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            onReset={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedSource('All Outlets');
              setShowOnlyBookmarks(false);
            }}
          />
        )}

      </main>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isBookmarked={bookmarks.some(b => b.link === selectedArticle.link)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
}
