

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NewsTicker from './components/NewsTicker';
import GlobalHighlights from './components/GlobalHighlights';
import RightAside from './components/RightAside';
import LiveStream from './components/LiveStream';
import Mahama360 from './components/Mahama360';
import Footer from './components/Footer';
import CategoryMenu from './components/CategoryMenu';
import SearchModal from './components/SearchModal';
import SummarizerModal from './components/SummarizerModal';
import ExplainSimplyModal from './components/ExplainSimplyModal';
import TranslationModal from './components/TranslationModal';
import QuizModal from './components/QuizModal';
import TextToSpeechPlayer from './components/TextToSpeechPlayer';
import PodcastPlayer from './components/PodcastPlayer';
import ArticlePage from './components/ArticlePage';
import BookmarksModal from './components/BookmarksModal';
import OfflineModal from './components/OfflineModal';
import SettingsPage from './components/SettingsPage';
import LoginModal from './components/LoginModal';
import FloatingActionButton from './components/FloatingActionButton';
import LiveConversationModal from './components/LiveConversationModal';
import ConfirmationModal from './components/ConfirmationModal';
import NewsMap from './components/NewsMap';
import PodcastHub from './components/PodcastHub';
import NowStreaming from './components/NowStreaming';
import InnovationTimeline from './components/InnovationTimeline';
import DataDrivenInsights from './components/DataDrivenInsights';
import TrailerModal from './components/TrailerModal';
import FilterBar from './components/FilterBar';
import CounterpointModal from './components/CounterpointModal';


import type { Article, Podcast, Settings } from './types';
import { mockArticles, mockPodcasts, categories } from './constants';
import { saveArticleForOffline, getOfflineArticleIds, getOfflineArticles, deleteOfflineArticle, clearAllOfflineArticles } from './utils/db';

const defaultSettings: Settings = {
    theme: 'system',
    fontFamily: 'sans',
    fontSize: 16,
    showInnovationTimelines: true,
    showNowStreaming: true,
    homepageLayout: 'Standard',
    summaryLength: 'Medium',
    ttsVoice: 'Zephyr',
    contentPreferences: [],
    preferredLanguage: 'English',
    showCounterpoint: true,
};

const App: React.FC = () => {
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const storedSettings = window.localStorage.getItem('mahama-settings');
            return storedSettings ? { ...defaultSettings, ...JSON.parse(storedSettings) } : defaultSettings;
        } catch {
            return defaultSettings;
        }
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [articles, setArticles] = useState<Article[]>(mockArticles);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(mockArticles);
    const [currentCategory, setCurrentCategory] = useState<string>('All');
    const [activeArticle, setActiveArticle] = useState<Article | null>(null);

    // View state
    const [currentView, setCurrentView] = useState<'home' | 'article' | 'settings'>('home');
    
    // Modal states
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSummarizerOpen, setIsSummarizerOpen] = useState(false);
    const [isExplainSimplyOpen, setIsExplainSimplyOpen] = useState(false);
    const [isTranslationOpen, setIsTranslationOpen] = useState(false);
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
    const [isOfflineOpen, setIsOfflineOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLiveConvoOpen, setIsLiveConvoOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<{title: string, message: string, onConfirm: () => void} | null>(null);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [isCounterpointOpen, setIsCounterpointOpen] = useState(false);


    // AI action states
    const [articleForAI, setArticleForAI] = useState<Article | null>(null);
    const [ttsArticle, setTtsArticle] = useState<Article | null>(null);
    
    // Audio/Podcast states
    const [activePodcast, setActivePodcast] = useState<Podcast | null>(null);
    const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);
    
    // Bookmarks and Offline states
    const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<Set<number>>(() => {
        const stored = localStorage.getItem('bookmarkedArticleIds');
        return stored ? new Set(JSON.parse(stored)) : new Set();
    });
    const [offlineArticleIds, setOfflineArticleIds] = useState<Set<number>>(new Set());
    const [offlineArticles, setOfflineArticles] = useState<Article[]>([]);
    const [downloadingArticleId, setDownloadingArticleId] = useState<number | null>(null);

    // Effects for settings
    useEffect(() => {
        const root = window.document.documentElement;
        const isDark =
          settings.theme === 'dark' ||
          (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        root.classList.toggle('dark', isDark);
        root.classList.toggle('font-sans', settings.fontFamily === 'sans');
        root.classList.toggle('font-serif', settings.fontFamily === 'serif');
        root.style.fontSize = `${settings.fontSize}px`;
        localStorage.setItem('mahama-settings', JSON.stringify(settings));
    }, [settings]);

    // Effects for data fetching
    useEffect(() => {
        const fetchOfflineData = async () => {
            const ids = await getOfflineArticleIds();
            setOfflineArticleIds(new Set(ids));
        };
        fetchOfflineData();
    }, []);

    // Effect for filtering articles
    useEffect(() => {
        let articlesToFilter = [...mockArticles];
        
        if (currentCategory !== 'All') {
            articlesToFilter = articlesToFilter.filter(a => a.category === currentCategory);
        } else if (settings.contentPreferences && settings.contentPreferences.length > 0) {
            const preferred = articlesToFilter.filter(a => settings.contentPreferences.includes(a.category));
            const others = articlesToFilter.filter(a => !settings.contentPreferences.includes(a.category));
            articlesToFilter = [...preferred, ...others];
        }
        
        setFilteredArticles(articlesToFilter);
        window.scrollTo(0, 0);
    }, [currentCategory, settings.contentPreferences]);
    
    // Handlers
    const handleSelectCategory = (category: string) => {
        setCurrentCategory(category);
        setCurrentView('home');
        setIsMenuOpen(false);
    };

    const handleReadMore = (article: Article) => {
        setActiveArticle(article);
        setCurrentView('article');
        window.scrollTo(0, 0);
    };

    const handleGoHome = () => {
        setCurrentView('home');
        setActiveArticle(null);
    };

    // AI Action Handlers
    const handleSummarize = (article: Article) => { setArticleForAI(article); setIsSummarizerOpen(true); };
    const handleExplainSimply = (article: Article) => { setArticleForAI(article); setIsExplainSimplyOpen(true); };
    const handleTranslate = (article: Article) => { setArticleForAI(article); setIsTranslationOpen(true); };
    const handleQuiz = (article: Article) => { setArticleForAI(article); setIsQuizOpen(true); };
    const handleTextToSpeech = (article: Article) => { setTtsArticle(prev => prev?.id === article.id ? null : article); };
    const handleCounterpoint = (article: Article) => { setArticleForAI(article); setIsCounterpointOpen(true); };
    
    // Podcast Player Handlers
    const handlePlayPodcast = (podcast: Podcast) => {
        setActivePodcast(prev => prev?.id === podcast.id ? (setIsPodcastPlaying(!isPodcastPlaying), prev) : (setIsPodcastPlaying(true), podcast));
    };

    // Bookmarking
    const handleToggleBookmark = (articleId: number) => {
        setBookmarkedArticleIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(articleId)) newSet.delete(articleId);
            else newSet.add(articleId);
            localStorage.setItem('bookmarkedArticleIds', JSON.stringify(Array.from(newSet)));
            return newSet;
        });
    };
    
    // Offline Functionality
    const handleDownloadArticle = async (article: Article) => {
        setDownloadingArticleId(article.id);
        try {
            await saveArticleForOffline(article);
            setOfflineArticleIds(prev => new Set(prev).add(article.id));
        } catch (error) { console.error("Failed to download article:", error); } 
        finally { setDownloadingArticleId(null); }
    };
    
    const handleDeleteOfflineArticle = async (articleId: number) => {
        await deleteOfflineArticle(articleId);
        setOfflineArticleIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(articleId);
            return newSet;
        });
        setOfflineArticles(prev => prev.filter(a => a.id !== articleId));
    };

    const handleClearBookmarks = () => {
        setConfirmAction({
            title: 'Clear All Bookmarks',
            message: 'Are you sure you want to remove all your bookmarks? This action cannot be undone.',
            onConfirm: () => {
                setBookmarkedArticleIds(new Set());
                localStorage.removeItem('bookmarkedArticleIds');
                setIsConfirmOpen(false);
            }
        });
        setIsConfirmOpen(true);
    };
    
    const handleClearOffline = () => {
        setConfirmAction({
            title: 'Clear Offline Articles',
            message: 'Are you sure you want to delete all saved articles? This action cannot be undone.',
            onConfirm: async () => {
                await clearAllOfflineArticles();
                setOfflineArticleIds(new Set());
                setOfflineArticles([]);
                setIsConfirmOpen(false);
            }
        });
        setIsConfirmOpen(true);
    };
    
    // Auth Handlers
    const handleLogin = () => { setIsAuthenticated(true); setIsLoginOpen(false); };
    const handleLogout = () => { setIsAuthenticated(false); setIsConfirmOpen(false); };
    const handleConfirmLogout = () => {
        setConfirmAction({
            title: 'Confirm Logout',
            message: 'Are you sure you want to log out?',
            onConfirm: handleLogout
        });
        setIsConfirmOpen(true);
    };
    
    const openBookmarks = () => { setIsBookmarksOpen(true); };
    
    const openOffline = async () => {
        const fullArticles = await getOfflineArticles();
        setOfflineArticles(fullArticles);
        setIsOfflineOpen(true);
    };

    const bookmarkedArticles = mockArticles.filter(article => bookmarkedArticleIds.has(article.id));

    const handleSelectArticleFromSearch = (article: Article) => {
      setIsSearchOpen(false);
      setTimeout(() => handleReadMore(article), 300);
    };

    if (currentView === 'article' && activeArticle) {
        return <ArticlePage article={activeArticle} onClose={handleGoHome} isBookmarked={bookmarkedArticleIds.has(activeArticle.id)} onToggleBookmark={handleToggleBookmark} onSummarize={handleSummarize} onExplainSimply={handleExplainSimply} onTextToSpeech={handleTextToSpeech} onTranslate={handleTranslate} onQuiz={handleQuiz} onReadMore={handleReadMore} onCounterpoint={handleCounterpoint} settings={settings} />;
    }
    
    if (currentView === 'settings') {
        return <SettingsPage onClose={() => setCurrentView('home')} settings={settings} onSettingsChange={setSettings} onClearBookmarks={handleClearBookmarks} onClearOffline={handleClearOffline} />;
    }

    return (
        <div className="font-sans antialiased text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-navy">
            <Header onMenuClick={() => setIsMenuOpen(true)} onSearchClick={() => setIsSearchOpen(true)} onSettingsClick={() => setCurrentView('settings')} onLogoClick={handleGoHome} categories={categories} onSelectCategory={handleSelectCategory} isAuthenticated={isAuthenticated} onLoginClick={() => setIsLoginOpen(true)} onLogout={handleConfirmLogout} />
            <NewsTicker headlines={articles.slice(0, 5).map(a => a.title)} />
            <main className="pt-28">
                {currentCategory === 'All' && <Hero article={articles[0]} onReadMore={() => handleReadMore(articles[0])} />}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <FilterBar categories={categories} currentCategory={currentCategory} onSelectCategory={handleSelectCategory} />
                    
                    {settings.showNowStreaming && currentCategory === 'Movies & TV' && <NowStreaming onWatchTrailer={() => setIsTrailerOpen(true)} />}
                    {settings.showInnovationTimelines && currentCategory === 'Technology' && <InnovationTimeline />}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
                        <div className="lg:col-span-2 space-y-8">
                           <GlobalHighlights articles={filteredArticles} onReadMore={handleReadMore} onSummarize={handleSummarize} onExplainSimply={handleExplainSimply} onTextToSpeech={handleTextToSpeech} onTranslate={handleTranslate} audioState={{ playingArticleId: null, isGenerating: false }} bookmarkedArticleIds={Array.from(bookmarkedArticleIds)} onToggleBookmark={handleToggleBookmark} offlineArticleIds={Array.from(offlineArticleIds)} downloadingArticleId={downloadingArticleId} onDownloadArticle={handleDownloadArticle} />
                            {settings.homepageLayout === 'Dashboard' && currentCategory === 'All' && <DataDrivenInsights />}
                        </div>
                       <RightAside trendingArticles={articles.slice(1, 6)} onArticleClick={handleReadMore} />
                    </div>
                     {currentCategory === 'All' && <>
                        <LiveStream />
                        <NewsMap articles={articles} onArticleClick={handleReadMore} />
                     </>}
                     <PodcastHub podcasts={mockPodcasts} activePodcast={activePodcast} isPodcastPlaying={isPodcastPlaying} onPlay={handlePlayPodcast} />
                     <Mahama360 articles={articles.slice(5, 8)} />
                </div>
            </main>
            <Footer />

            <CategoryMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} categories={categories} onCategorySelect={handleSelectCategory} onBookmarksClick={() => { setIsMenuOpen(false); openBookmarks(); }} onOfflineClick={() => { setIsMenuOpen(false); openOffline(); }} onSettingsClick={() => { setIsMenuOpen(false); setCurrentView('settings'); }} />
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} articles={articles} onArticleSelect={handleSelectArticleFromSearch} />
            <SummarizerModal isOpen={isSummarizerOpen} article={articleForAI} summaryLength={settings.summaryLength || 'Medium'} onClose={() => {setIsSummarizerOpen(false); setArticleForAI(null);}} />
            <ExplainSimplyModal isOpen={isExplainSimplyOpen} article={articleForAI} onClose={() => {setIsExplainSimplyOpen(false); setArticleForAI(null);}} />
            <TranslationModal isOpen={isTranslationOpen} article={articleForAI} defaultLanguage={settings.preferredLanguage || 'English'} onClose={() => {setIsTranslationOpen(false); setArticleForAI(null);}} />
            <QuizModal isOpen={isQuizOpen} article={articleForAI} onClose={() => {setIsQuizOpen(false); setArticleForAI(null);}} />
            <CounterpointModal isOpen={isCounterpointOpen} article={articleForAI} onClose={() => {setIsCounterpointOpen(false); setArticleForAI(null);}} />
            <TrailerModal isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} />
            <TextToSpeechPlayer article={ttsArticle} voice={settings.ttsVoice || 'Zephyr'} onClose={() => setTtsArticle(null)} />
            <PodcastPlayer activePodcast={activePodcast} isPlaying={isPodcastPlaying} onPlayPause={() => setIsPodcastPlaying(!isPodcastPlaying)} onClose={() => { setActivePodcast(null); setIsPodcastPlaying(false); }} />
            <BookmarksModal isOpen={isBookmarksOpen} onClose={() => setIsBookmarksOpen(false)} bookmarkedArticles={bookmarkedArticles} onToggleBookmark={handleToggleBookmark} onReadArticle={handleReadMore} />
            <OfflineModal isOpen={isOfflineOpen} onClose={() => setIsOfflineOpen(false)} offlineArticles={offlineArticles} onDeleteArticle={handleDeleteOfflineArticle} onReadArticle={handleReadMore} />
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
            <LiveConversationModal isOpen={isLiveConvoOpen} onClose={() => setIsLiveConvoOpen(false)} />
            {confirmAction && <ConfirmationModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} title={confirmAction.title} message={confirmAction.message} onConfirm={confirmAction.onConfirm} />}
            <FloatingActionButton onClick={() => setIsLiveConvoOpen(true)} />
        </div>
    );
};

export default App;