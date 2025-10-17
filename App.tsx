import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Constants and Types
import { articles as initialArticles, featuredArticle, tickerHeadlines, categories, trendingArticles, mahama360Articles, podcasts } from './constants';
import type { Article } from './types';

// Components
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import Hero from './components/Hero';
import GlobalHighlights from './components/GlobalHighlights';
import RightAside from './components/RightAside';
import FilterBar from './components/FilterBar';
import LiveStream from './components/LiveStream';
import Mahama360 from './components/Mahama360';
import DataViz from './components/DataViz';
import NewsMap from './components/NewsMap';
import PodcastHub from './components/PodcastHub';
import Footer from './components/Footer';
import CategoryMenu from './components/CategoryMenu';
import BookmarksModal from './components/BookmarksModal';
import OfflineModal from './components/OfflineModal';
import ScrollProgressBar from './components/ScrollProgressBar';
import ArticlePage from './components/ArticlePage';


// Utils
import { getOfflineArticleIds, saveArticleForOffline, getOfflineArticles, deleteOfflineArticle } from './utils/db';


const App: React.FC = () => {
    // UI State
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // View State
    const [view, setView] = useState<'home' | 'article'>('home');
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    // Modal States
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
    const [isOfflineOpen, setIsOfflineOpen] = useState(false);
    
    // Bookmarks State
    const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<number[]>([]);

    // Offline State
    const [offlineArticleIds, setOfflineArticleIds] = useState<number[]>([]);
    const [offlineArticles, setOfflineArticles] = useState<Article[]>([]);
    const [downloadingArticleId, setDownloadingArticleId] = useState<number | null>(null);

    // Podcast State
    const [playingPodcastId, setPlayingPodcastId] = useState<number | null>(null);

    const allArticles = useMemo(() => [featuredArticle, ...initialArticles, ...trendingArticles, ...mahama360Articles], []);
    
    const fetchOfflineData = useCallback(async () => {
        const ids = await getOfflineArticleIds();
        setOfflineArticleIds(ids);
        if (isOfflineOpen) {
            const articles = await getOfflineArticles();
            setOfflineArticles(articles);
        }
    }, [isOfflineOpen]);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }

        const storedBookmarks = localStorage.getItem('bookmarkedArticles');
        if (storedBookmarks) {
            setBookmarkedArticleIds(JSON.parse(storedBookmarks));
        }

        fetchOfflineData();
    }, [fetchOfflineData]);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }, [isDarkMode]);

    const handleToggleDarkMode = () => setIsDarkMode(!isDarkMode);
    
    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        setIsMenuOpen(false);
        setView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFontSizeChange = (size: 'sm' | 'md' | 'lg') => {
        const root = document.documentElement;
        root.classList.remove('text-sm', 'text-base', 'text-lg');
        if(size === 'sm') root.classList.add('text-sm');
        else if(size === 'lg') root.classList.add('text-lg');
        else root.classList.add('text-base');
    };

    const handleOpenArticle = async (article: Article) => {
        setSelectedArticle(article);
        setView('article');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCloseArticle = () => {
      setView('home');
      setSelectedArticle(null);
    };
    
    const handleToggleBookmark = (articleId: number) => {
        const newBookmarks = bookmarkedArticleIds.includes(articleId)
            ? bookmarkedArticleIds.filter(id => id !== articleId)
            : [...bookmarkedArticleIds, articleId];
        setBookmarkedArticleIds(newBookmarks);
        localStorage.setItem('bookmarkedArticles', JSON.stringify(newBookmarks));
    };
    
    const handleDownloadArticle = async (article: Article) => {
        setDownloadingArticleId(article.id);
        try {
            await saveArticleForOffline(article);
            await fetchOfflineData();
        } catch (error) {
            console.error("Failed to download article:", error);
            alert("Failed to save article for offline reading.");
        } finally {
            setDownloadingArticleId(null);
        }
    };

    const handleDeleteOfflineArticle = async (articleId: number) => {
        await deleteOfflineArticle(articleId);
        await fetchOfflineData();
    };

    const bookmarkedArticles = allArticles.filter(article => bookmarkedArticleIds.includes(article.id));
    const filteredArticles = selectedCategory === 'All'
        ? initialArticles
        : initialArticles.filter(article => article.category === selectedCategory);
    
    return (
        <div className="bg-slate-100 dark:bg-navy text-slate-900 dark:text-white font-sans selection:bg-gold/30">
            {view === 'home' && <ScrollProgressBar />}
            <Header
                isDarkMode={isDarkMode}
                onMenuClick={() => setIsMenuOpen(true)}
                onLogoClick={() => view === 'home' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : handleCloseArticle()}
                categories={categories}
                onSelectCategory={handleSelectCategory}
            />
            {view === 'home' && <NewsTicker headlines={tickerHeadlines} />}
            
            <main className={view === 'home' ? "pt-[120px]" : ""}>
              {view === 'home' && (
                <>
                  <Hero article={featuredArticle} onReadMore={() => handleOpenArticle(featuredArticle)} />
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                      <FilterBar categories={categories} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          <div className="lg:col-span-2 space-y-16">
                              <GlobalHighlights 
                                  articles={filteredArticles}
                                  onReadMore={handleOpenArticle}
                                  bookmarkedArticleIds={bookmarkedArticleIds}
                                  onToggleBookmark={handleToggleBookmark}
                                  offlineArticleIds={offlineArticleIds}
                                  downloadingArticleId={downloadingArticleId}
                                  onDownloadArticle={handleDownloadArticle}
                              />
                              <LiveStream />
                              <Mahama360 articles={mahama360Articles} />
                              <NewsMap articles={allArticles} onArticleClick={handleOpenArticle} />
                              <DataViz />
                              <PodcastHub podcasts={podcasts} playingPodcastId={playingPodcastId} onPlay={setPlayingPodcastId}/>
                          </div>
                          <RightAside trendingArticles={trendingArticles} onArticleClick={handleOpenArticle} />
                      </div>
                  </div>
                </>
              )}
              {view === 'article' && selectedArticle && (
                  <ArticlePage
                    article={selectedArticle}
                    allArticles={allArticles}
                    trendingArticles={trendingArticles}
                    onArticleClick={handleOpenArticle}
                    isBookmarked={bookmarkedArticleIds.includes(selectedArticle.id)}
                    onToggleBookmark={() => handleToggleBookmark(selectedArticle.id)}
                  />
              )}
            </main>

            <Footer />

            {/* Modals */}
            <CategoryMenu 
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                categories={categories}
                onCategorySelect={handleSelectCategory}
                isDarkMode={isDarkMode}
                toggleDarkMode={handleToggleDarkMode}
                onFontSizeChange={handleFontSizeChange}
                onBookmarksClick={() => { setIsMenuOpen(false); setIsBookmarksOpen(true); }}
                onOfflineClick={() => { setIsMenuOpen(false); setIsOfflineOpen(true); fetchOfflineData(); }}
            />
            <BookmarksModal
                isOpen={isBookmarksOpen}
                onClose={() => setIsBookmarksOpen(false)}
                bookmarkedArticles={bookmarkedArticles}
                onToggleBookmark={handleToggleBookmark}
            />
            <OfflineModal
                isOpen={isOfflineOpen}
                onClose={() => setIsOfflineOpen(false)}
                offlineArticles={offlineArticles}
                onDeleteArticle={handleDeleteOfflineArticle}
                onReadArticle={handleOpenArticle}
            />
        </div>
    );
};

export default App;