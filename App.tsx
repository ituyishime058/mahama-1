import React, { useState, useEffect, useCallback } from 'react';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import GlobalHighlights from './components/GlobalHighlights';
import RightAside from './components/RightAside';
import Footer from './components/Footer';
import CategoryMenu from './components/CategoryMenu';
import SearchModal from './components/SearchModal';
import BookmarksModal from './components/BookmarksModal';
import OfflineModal from './components/OfflineModal';
import LoginModal from './components/LoginModal';
import SettingsPage from './components/SettingsPage';
import ArticlePage from './components/ArticlePage';
import SummarizerModal from './components/SummarizerModal';
import ExplainSimplyModal from './components/ExplainSimplyModal';
import TextToSpeechPlayer from './components/TextToSpeechPlayer';
import TranslationModal from './components/TranslationModal';
import QuizModal from './components/QuizModal';
import PodcastHub from './components/PodcastHub';
import PodcastPlayer from './components/PodcastPlayer';
import ConfirmationModal from './components/ConfirmationModal';
import FloatingActionButton from './components/FloatingActionButton';
import LiveConversationModal from './components/LiveConversationModal';
import FilterBar from './components/FilterBar';
import NewsMap from './components/NewsMap';

// Data and types
import { mockArticles, mockTrendingArticles, categories as allCategories, mockPodcasts } from './constants';
import type { Article, Settings, Podcast, AiSummaryLength, AiTtsVoice } from './types';

// Utils
import * as db from './utils/db';

const defaultSettings: Settings = {
    theme: 'system',
    fontSize: 16,
    fontFamily: 'sans',
    enableNotifications: true,
    dataSaverMode: false,
    language: 'English',
    hiddenCategories: [],
    aiSummaryLength: 'Medium',
    aiTtsVoice: 'Kore',
};

const App: React.FC = () => {
    // Page view state
    const [view, setView] = useState<'home' | 'article' | 'settings'>('home');
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    
    // Modal states
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
    const [isOfflineOpen, setIsOfflineOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isLiveConversationOpen, setIsLiveConversationOpen] = useState(false);
    
    // AI Modal states
    const [summarizerArticle, setSummarizerArticle] = useState<Article | null>(null);
    const [explainerArticle, setExplainerArticle] = useState<Article | null>(null);
    const [translatorArticle, setTranslatorArticle] = useState<Article | null>(null);
    const [quizArticle, setQuizArticle] = useState<Article | null>(null);
    const [ttsArticle, setTtsArticle] = useState<Article | null>(null);

    // Data & User state
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<number[]>([]);
    const [offlineArticles, setOfflineArticles] = useState<Article[]>([]);
    const [downloadingArticleId, setDownloadingArticleId] = useState<number | null>(null);

    // Media player state
    const [activePodcast, setActivePodcast] = useState<Podcast | null>(null);
    const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);

    // Load initial data from localStorage/IndexedDB
    useEffect(() => {
        // Load settings
        try {
            const savedSettings = localStorage.getItem('mahama-settings');
            if (savedSettings) {
                setSettings(JSON.parse(savedSettings));
            }
        } catch (e) {
            console.error("Failed to load settings:", e);
        }

        // Load bookmarks
        try {
            const savedBookmarks = localStorage.getItem('mahama-bookmarks');
            if (savedBookmarks) {
                setBookmarkedArticleIds(JSON.parse(savedBookmarks));
            }
        } catch (e) {
            console.error("Failed to load bookmarks:", e);
        }
        
        // Load offline articles
        fetchOfflineArticles();
    }, []);

    const fetchOfflineArticles = async () => {
        try {
            const articles = await db.getOfflineArticles();
            setOfflineArticles(articles);
        } catch (e) {
            console.error("Failed to fetch offline articles", e);
        }
    };
    
    // Apply settings changes to the document
    useEffect(() => {
        const root = document.documentElement;
        // Theme
        if (settings.theme === 'system') {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', systemPrefersDark);
        } else {
            root.classList.toggle('dark', settings.theme === 'dark');
        }
        // Font size and family
        root.style.fontSize = `${settings.fontSize}px`;
        root.classList.toggle('font-serif', settings.fontFamily === 'serif');
        root.classList.toggle('font-sans', settings.fontFamily === 'sans');
        // Save settings
        try {
            localStorage.setItem('mahama-settings', JSON.stringify(settings));
        } catch (e) {
            console.error("Failed to save settings:", e);
        }
    }, [settings]);

    // Save bookmarks
    useEffect(() => {
        try {
            localStorage.setItem('mahama-bookmarks', JSON.stringify(bookmarkedArticleIds));
        } catch (e) {
            console.error("Failed to save bookmarks:", e);
        }
    }, [bookmarkedArticleIds]);


    const handleUpdateSettings = (newSettings: Partial<Settings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        setIsMenuOpen(false);
    };
    
    const handleSelectArticle = (article: Article) => {
        setSelectedArticle(article);
        setView('article');
        setIsSearchOpen(false);
        window.scrollTo(0, 0);
    };
    
    const handleCloseArticle = () => {
        setView('home');
        setSelectedArticle(null);
    };

    const handleToggleBookmark = (articleId: number) => {
        setBookmarkedArticleIds(prev =>
            prev.includes(articleId)
                ? prev.filter(id => id !== articleId)
                : [...prev, articleId]
        );
    };
    
    const handleDownloadArticle = async (article: Article) => {
        setDownloadingArticleId(article.id);
        try {
            await db.saveArticleForOffline(article);
            await fetchOfflineArticles();
        } catch (e) {
            console.error("Failed to download article:", e);
            alert("Could not save article for offline reading.");
        } finally {
            setDownloadingArticleId(null);
        }
    };

    const handleDeleteOfflineArticle = async (articleId: number) => {
        try {
            await db.deleteOfflineArticle(articleId);
            await fetchOfflineArticles();
        } catch(e) {
            console.error("Failed to delete article", e);
        }
    };

    const handleClearOfflineData = async () => {
        try {
            await db.clearAllOfflineArticles();
            await fetchOfflineArticles();
            setIsConfirmationOpen(false);
        } catch(e) {
            console.error("Failed to clear offline data", e);
        }
    };
    
    const handlePlayPodcast = (podcast: Podcast) => {
        if (activePodcast?.id === podcast.id) {
            setIsPodcastPlaying(prev => !prev);
        } else {
            setActivePodcast(podcast);
            setIsPodcastPlaying(true);
        }
    };
    
    const filteredArticles = mockArticles.filter(article => 
        (selectedCategory === 'All' || article.category === selectedCategory) &&
        !settings.hiddenCategories.includes(article.category)
    );

    const renderView = () => {
        if (view === 'article' && selectedArticle) {
            return <ArticlePage 
                article={selectedArticle}
                onClose={handleCloseArticle}
                isBookmarked={bookmarkedArticleIds.includes(selectedArticle.id)}
                onToggleBookmark={handleToggleBookmark}
                onSummarize={setSummarizerArticle}
                onExplainSimply={setExplainerArticle}
                onTextToSpeech={setTtsArticle}
                onTranslate={setTranslatorArticle}
                onQuiz={setQuizArticle}
            />;
        }
        if (view === 'settings') {
            return <SettingsPage
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                onClose={() => setView('home')}
                onClearOfflineData={() => setIsConfirmationOpen(true)}
            />;
        }
        return (
             <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28">
                <Hero article={mockArticles[0]} onReadMore={() => handleSelectArticle(mockArticles[0])} />
                <FilterBar categories={['All', ...allCategories]} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <GlobalHighlights 
                            articles={filteredArticles}
                            onSummarize={setSummarizerArticle}
                            onExplainSimply={setExplainerArticle}
                            onTextToSpeech={setTtsArticle}
                            onTranslate={setTranslatorArticle}
                            onReadMore={handleSelectArticle}
                            audioState={{ playingArticleId: null, isGenerating: false }} // Placeholder
                            bookmarkedArticleIds={bookmarkedArticleIds}
                            onToggleBookmark={handleToggleBookmark}
                            offlineArticleIds={offlineArticles.map(a => a.id)}
                            downloadingArticleId={downloadingArticleId}
                            onDownloadArticle={handleDownloadArticle}
                        />
                         <NewsMap articles={mockArticles} onArticleClick={handleSelectArticle} />
                         <PodcastHub podcasts={mockPodcasts} activePodcast={activePodcast} isPodcastPlaying={isPodcastPlaying} onPlay={handlePlayPodcast} />
                    </div>
                    <RightAside trendingArticles={mockTrendingArticles} onArticleClick={handleSelectArticle} />
                </div>
            </main>
        );
    };

    return (
        <div className="bg-slate-100 dark:bg-navy text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
            {view === 'home' && (
                <Header 
                    onMenuClick={() => setIsMenuOpen(true)}
                    onSearchClick={() => setIsSearchOpen(true)}
                    onSettingsClick={() => setView('settings')}
                    onLogoClick={() => { setView('home'); setSelectedCategory('All'); }}
                    categories={allCategories}
                    onSelectCategory={handleSelectCategory}
                    isAuthenticated={isAuthenticated}
                    onLoginClick={() => setIsLoginOpen(true)}
                    onLogout={() => setIsAuthenticated(false)}
                />
            )}
            
            {renderView()}

            {view === 'home' && <Footer />}
            
            <CategoryMenu 
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                categories={['All', ...allCategories]}
                onCategorySelect={handleSelectCategory}
                onBookmarksClick={() => { setIsMenuOpen(false); setIsBookmarksOpen(true); }}
                onOfflineClick={() => { setIsMenuOpen(false); setIsOfflineOpen(true); }}
                onSettingsClick={() => { setIsMenuOpen(false); setView('settings'); }}
            />
            <SearchModal 
                isOpen={isSearchOpen} 
                onClose={() => setIsSearchOpen(false)}
                articles={mockArticles}
                onArticleSelect={handleSelectArticle}
            />
             <BookmarksModal 
                isOpen={isBookmarksOpen}
                onClose={() => setIsBookmarksOpen(false)}
                bookmarkedArticles={mockArticles.filter(a => bookmarkedArticleIds.includes(a.id))}
                onToggleBookmark={handleToggleBookmark}
                onReadArticle={handleSelectArticle}
            />
            <OfflineModal
                isOpen={isOfflineOpen}
                onClose={() => setIsOfflineOpen(false)}
                offlineArticles={offlineArticles}
                onDeleteArticle={handleDeleteOfflineArticle}
                onReadArticle={handleSelectArticle}
            />
            <LoginModal 
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={() => { setIsAuthenticated(true); setIsLoginOpen(false); }}
            />
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                title="Clear Offline Data"
                message="Are you sure you want to delete all saved articles? This action cannot be undone."
                onConfirm={handleClearOfflineData}
            />
            {summarizerArticle && (
                <SummarizerModal article={summarizerArticle} summaryLength={settings.aiSummaryLength} onClose={() => setSummarizerArticle(null)} />
            )}
            {explainerArticle && (
                <ExplainSimplyModal article={explainerArticle} onClose={() => setExplainerArticle(null)} />
            )}
            {translatorArticle && (
                <TranslationModal article={translatorArticle} defaultLanguage={settings.language} onClose={() => setTranslatorArticle(null)} />
            )}
            {quizArticle && (
                <QuizModal article={quizArticle} onClose={() => setQuizArticle(null)} />
            )}
            {ttsArticle && (
                <TextToSpeechPlayer article={ttsArticle} voice={settings.aiTtsVoice} onClose={() => setTtsArticle(null)} />
            )}
             {activePodcast && (
                <PodcastPlayer 
                    activePodcast={activePodcast} 
                    isPlaying={isPodcastPlaying} 
                    onPlayPause={() => setIsPodcastPlaying(p => !p)} 
                    onClose={() => { setActivePodcast(null); setIsPodcastPlaying(false); }} 
                />
            )}
            <FloatingActionButton onClick={() => setIsLiveConversationOpen(true)} />
            <LiveConversationModal isOpen={isLiveConversationOpen} onClose={() => setIsLiveConversationOpen(false)} />
        </div>
    );
};

export default App;
