import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Constants and Types
import { articles as initialArticles, featuredArticle, tickerHeadlines, categories, trendingArticles, mahama360Articles, podcasts } from './constants';
import type { Article, Podcast, Settings } from './types';

// Components
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import StockTicker from './components/StockTicker';
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
import SettingsModal from './components/SettingsModal';
import PodcastPlayer from './components/PodcastPlayer';
import ConfirmationModal from './components/ConfirmationModal';
import LoginModal from './components/LoginModal';
import LiveConversationModal from './components/LiveConversationModal';
import FloatingActionButton from './components/FloatingActionButton';
import SearchModal from './components/SearchModal';


// Utils
import { getOfflineArticleIds, saveArticleForOffline, getOfflineArticles, deleteOfflineArticle, clearAllOfflineArticles } from './utils/db';

const defaultSettings: Settings = {
    theme: 'light',
    accentColor: 'gold',
    fontFamily: 'sans',
    fontSize: 'md',
    reduceMotion: false,
    notifications: {
      breakingNews: true,
      newsletter: false,
    },
    ai: {
      enabled: true,
      summaryLength: 'medium',
      ttsVoice: 'Zephyr',
    },
};

const App: React.FC = () => {
    // UI State
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // View State
    const [view, setView] = useState<'home' | 'article'>('home');
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    // Modal States
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
    const [isOfflineOpen, setIsOfflineOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLiveConvOpen, setIsLiveConvOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [confirmationProps, setConfirmationProps] = useState({ title: '', message: '', onConfirm: () => {} });
    
    // User State
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Bookmarks State
    const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<number[]>([]);

    // Offline State
    const [offlineArticleIds, setOfflineArticleIds] = useState<number[]>([]);
    const [offlineArticles, setOfflineArticles] = useState<Article[]>([]);
    const [downloadingArticleId, setDownloadingArticleId] = useState<number | null>(null);

    // Podcast State
    const [activePodcast, setActivePodcast] = useState<Podcast | null>(null);
    const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);

    const allArticles = useMemo(() => [featuredArticle, ...initialArticles, ...trendingArticles, ...mahama360Articles], []);
    
    const fetchOfflineData = useCallback(async () => {
        const ids = await getOfflineArticleIds();
        setOfflineArticleIds(ids);
        if (isOfflineOpen) {
            const articles = await getOfflineArticles();
            setOfflineArticles(articles);
        }
    }, [isOfflineOpen]);

    // Effect for loading initial data from localStorage
    useEffect(() => {
        const storedSettings = localStorage.getItem('mnh-settings');
        const initialSettings = storedSettings ? { ...defaultSettings, ...JSON.parse(storedSettings) } : defaultSettings;
        setSettings(initialSettings);

        const storedBookmarks = localStorage.getItem('bookmarkedArticles');
        if (storedBookmarks) {
            setBookmarkedArticleIds(JSON.parse(storedBookmarks));
        }

        fetchOfflineData();
    }, [fetchOfflineData]);

    // Effect for applying settings to the document
    useEffect(() => {
        const root = document.documentElement;
        // Theme
        if (settings.theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        // Font Size
        root.classList.remove('text-sm', 'text-base', 'text-lg');
        if(settings.fontSize === 'sm') root.classList.add('text-sm');
        else if(settings.fontSize === 'lg') root.classList.add('text-lg');
        else root.classList.add('text-base');
        // Font Family
        if (settings.fontFamily === 'serif') {
            root.classList.remove('font-sans');
            root.classList.add('font-serif');
        } else {
            root.classList.remove('font-serif');
            root.classList.add('font-sans');
        }
        // Accent Color
        root.classList.remove('accent-gold', 'accent-deep-red');
        root.classList.add(`accent-${settings.accentColor}`);
        // Reduce motion
        if(settings.reduceMotion) {
            root.classList.add('reduce-motion');
        } else {
            root.classList.remove('reduce-motion');
        }
        
        localStorage.setItem('mnh-settings', JSON.stringify(settings));
    }, [settings]);

    const handleUpdateSettings = (newSettings: Partial<Settings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        setIsMenuOpen(false);
        setView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOpenArticle = async (article: Article) => {
        setSelectedArticle(article);
        setView('article');
        setIsSearchOpen(false); // Close search when an article is opened
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
    
    const handleClearOfflineData = () => {
        setConfirmationProps({
            title: 'Clear All Offline Articles',
            message: 'Are you sure you want to delete all saved articles? This action cannot be undone.',
            onConfirm: async () => {
                await clearAllOfflineArticles();
                await fetchOfflineData();
                setIsConfirmationOpen(false);
                setIsSettingsOpen(false);
            }
        });
        setIsConfirmationOpen(true);
    };

    const handleClearBookmarks = () => {
        setConfirmationProps({
            title: 'Clear All Bookmarks',
            message: 'Are you sure you want to delete all your bookmarks? This action cannot be undone.',
            onConfirm: () => {
                setBookmarkedArticleIds([]);
                localStorage.removeItem('bookmarkedArticles');
                setIsConfirmationOpen(false);
                setIsSettingsOpen(false);
            }
        });
        setIsConfirmationOpen(true);
    };

    const handlePlayPodcast = (podcast: Podcast) => {
        if (activePodcast?.id === podcast.id) {
            setIsPodcastPlaying(prev => !prev);
        } else {
            setActivePodcast(podcast);
            setIsPodcastPlaying(true);
        }
    };

    const handleClosePodcastPlayer = () => {
        setActivePodcast(null);
        setIsPodcastPlaying(false);
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
        setIsLoginModalOpen(false);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const bookmarkedArticles = allArticles.filter(article => bookmarkedArticleIds.includes(article.id));
    const filteredArticles = selectedCategory === 'All'
        ? initialArticles
        : initialArticles.filter(article => article.category === selectedCategory);
    
    return (
        <div className={`bg-slate-100 dark:bg-navy text-slate-900 dark:text-white selection:bg-gold/30`}>
             <style>{`:root { --accent-color: ${settings.accentColor === 'gold' ? '#d97706' : '#b91c1c'}; } .reduce-motion * { transition: none !important; animation: none !important; }`}</style>
            {view === 'home' && <ScrollProgressBar />}
            <Header
                onMenuClick={() => setIsMenuOpen(true)}
                onSearchClick={() => setIsSearchOpen(true)}
                onSettingsClick={() => setIsSettingsOpen(true)}
                onLogoClick={() => view === 'home' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : handleCloseArticle()}
                categories={categories}
                onSelectCategory={handleSelectCategory}
                isAuthenticated={isAuthenticated}
                onLoginClick={() => setIsLoginModalOpen(true)}
                onLogout={handleLogout}
            />
            {view === 'home' && (
                <>
                    <NewsTicker headlines={tickerHeadlines} />
                    <StockTicker />
                </>
            )}
            
            <main className={view === 'home' ? "pt-[152px]" : ""}>
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
                              <PodcastHub 
                                  podcasts={podcasts} 
                                  activePodcast={activePodcast}
                                  isPodcastPlaying={isPodcastPlaying}
                                  onPlay={handlePlayPodcast}
                              />
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
                    bookmarkedArticleIds={bookmarkedArticleIds}
                    onToggleBookmark={handleToggleBookmark}
                  />
              )}
            </main>

            <Footer />

            {/* Global Components / Modals */}
            <FloatingActionButton onClick={() => setIsLiveConvOpen(true)} />
             <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                articles={allArticles}
                onArticleSelect={handleOpenArticle}
            />
            <LiveConversationModal isOpen={isLiveConvOpen} onClose={() => setIsLiveConvOpen(false)} />
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
            />
            <CategoryMenu 
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                categories={categories}
                onCategorySelect={handleSelectCategory}
                onBookmarksClick={() => { setIsMenuOpen(false); setIsBookmarksOpen(true); }}
                onOfflineClick={() => { setIsMenuOpen(false); setIsOfflineOpen(true); fetchOfflineData(); }}
                onSettingsClick={() => { setIsMenuOpen(false); setIsSettingsOpen(true); }}
            />
            <BookmarksModal
                isOpen={isBookmarksOpen}
                onClose={() => setIsBookmarksOpen(false)}
                bookmarkedArticles={bookmarkedArticles}
                onToggleBookmark={handleToggleBookmark}
                onReadArticle={handleOpenArticle}
            />
            <OfflineModal
                isOpen={isOfflineOpen}
                onClose={() => setIsOfflineOpen(false)}
                offlineArticles={offlineArticles}
                onDeleteArticle={handleDeleteOfflineArticle}
                onReadArticle={handleOpenArticle}
            />
            <SettingsModal 
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                onClearOffline={handleClearOfflineData}
                onClearBookmarks={handleClearBookmarks}
            />
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                {...confirmationProps}
            />
            {activePodcast && (
                <PodcastPlayer 
                    podcast={activePodcast}
                    isPlaying={isPodcastPlaying}
                    onPlayPause={() => setIsPodcastPlaying(p => !p)}
                    onClose={handleClosePodcastPlayer}
                />
            )}
        </div>
    );
};

export default App;