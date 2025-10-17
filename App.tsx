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


import type { Article, Podcast, AiSummaryLength, AiTtsVoice } from './types';
import { mockArticles, mockPodcasts, categories } from './constants';
import { saveArticleForOffline, getOfflineArticleIds, getOfflineArticles, deleteOfflineArticle } from './utils/db';

const App: React.FC = () => {
    // State management
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedTheme = window.localStorage.getItem('theme');
            if (storedTheme === 'dark' || storedTheme === 'light') {
                return storedTheme;
            }
        }
        return 'dark'; // Default theme
    });
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [articles, setArticles] = useState<Article[]>(mockArticles);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(mockArticles);
    const [currentCategory, setCurrentCategory] = useState<string>('All');
    const [activeArticle, setActiveArticle] = useState<Article | null>(null);

    // Modal states
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isSummarizerOpen, setIsSummarizerOpen] = useState(false);
    const [isExplainSimplyOpen, setIsExplainSimplyOpen] = useState(false);
    const [isTranslationOpen, setIsTranslationOpen] = useState(false);
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
    const [isOfflineOpen, setIsOfflineOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLiveConvoOpen, setIsLiveConvoOpen] = useState(false);
    const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);


    // AI action states
    const [articleForAI, setArticleForAI] = useState<Article | null>(null);
    const [summaryLength, setSummaryLength] = useState<AiSummaryLength>('Medium');
    const [ttsArticle, setTtsArticle] = useState<Article | null>(null);
    
    // Settings state
    const [aiSettings, setAiSettings] = useState({
        summaryLength: 'Medium' as AiSummaryLength,
        ttsVoice: 'Zephyr' as AiTtsVoice,
        defaultLanguage: 'Spanish',
    });

    // Audio/Podcast states
    const [activePodcast, setActivePodcast] = useState<Podcast | null>(null);
    const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);
    
    // Bookmarks and Offline states
    const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<number[]>([]);
    const [offlineArticleIds, setOfflineArticleIds] = useState<number[]>([]);
    const [offlineArticles, setOfflineArticles] = useState<Article[]>([]);
    const [downloadingArticleId, setDownloadingArticleId] = useState<number | null>(null);

    // Effects
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const storedBookmarks = localStorage.getItem('bookmarkedArticleIds');
        if (storedBookmarks) {
            setBookmarkedArticleIds(JSON.parse(storedBookmarks));
        }
        
        const fetchOfflineData = async () => {
            const ids = await getOfflineArticleIds();
            setOfflineArticleIds(ids);
            if (isOfflineOpen) { // Refresh full articles if modal is open
                const fullArticles = await getOfflineArticles();
                setOfflineArticles(fullArticles);
            }
        };
        fetchOfflineData();
    }, [isOfflineOpen]);

    useEffect(() => {
        if (currentCategory === 'All') {
            setFilteredArticles(articles);
        } else {
            setFilteredArticles(articles.filter(a => a.category === currentCategory));
        }
        window.scrollTo(0, 0);
    }, [currentCategory, articles]);

    // Handlers
    const handleToggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    const handleSelectCategory = (category: string) => {
        setCurrentCategory(category);
        setIsMenuOpen(false);
        setActiveArticle(null);
    };

    const handleReadMore = (article: Article) => {
        setActiveArticle(article);
        window.scrollTo(0, 0);
    };

    // AI Action Handlers
    const handleSummarize = (article: Article) => {
        setArticleForAI(article);
        setSummaryLength(aiSettings.summaryLength);
        setIsSummarizerOpen(true);
    };

    const handleExplainSimply = (article: Article) => {
        setArticleForAI(article);
        setIsExplainSimplyOpen(true);
    };
    
    const handleTranslate = (article: Article) => {
        setArticleForAI(article);
        setIsTranslationOpen(true);
    }
    
    const handleQuiz = (article: Article) => {
        setArticleForAI(article);
        setIsQuizOpen(true);
    }

    const handleTextToSpeech = (article: Article) => {
        setTtsArticle(prev => prev?.id === article.id ? null : article);
    };
    
    // Podcast Player Handlers
    const handlePlayPodcast = (podcast: Podcast) => {
        if (activePodcast?.id === podcast.id) {
            setIsPodcastPlaying(!isPodcastPlaying);
        } else {
            setActivePodcast(podcast);
            setIsPodcastPlaying(true);
        }
    };

    // Bookmarking
    const handleToggleBookmark = (articleId: number) => {
        setBookmarkedArticleIds(prev => {
            const newBookmarks = prev.includes(articleId)
                ? prev.filter(id => id !== articleId)
                : [...prev, articleId];
            localStorage.setItem('bookmarkedArticleIds', JSON.stringify(newBookmarks));
            return newBookmarks;
        });
    };
    
    // Offline Functionality
    const handleDownloadArticle = async (article: Article) => {
        setDownloadingArticleId(article.id);
        try {
            await saveArticleForOffline(article);
            setOfflineArticleIds(prev => [...prev, article.id]);
        } catch (error) {
            console.error("Failed to download article:", error);
            // You might want to show a toast notification here
        } finally {
            setDownloadingArticleId(null);
        }
    };
    
    const handleDeleteOfflineArticle = async (articleId: number) => {
        await deleteOfflineArticle(articleId);
        setOfflineArticleIds(prev => prev.filter(id => id !== articleId));
        setOfflineArticles(prev => prev.filter(a => a.id !== articleId));
    };
    
    // Auth Handlers
    const handleLogin = () => {
        setIsAuthenticated(true);
        setIsLoginOpen(false);
    };
    
    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsConfirmLogoutOpen(false);
    };
    
    const openBookmarks = async () => {
        setIsBookmarksOpen(true);
    };
    
    const openOffline = async () => {
        const fullArticles = await getOfflineArticles();
        setOfflineArticles(fullArticles);
        setIsOfflineOpen(true);
    };

    const bookmarkedArticles = articles.filter(article => bookmarkedArticleIds.includes(article.id));
    
    const closeAllModals = () => {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
      setIsSummarizerOpen(false);
      setIsExplainSimplyOpen(false);
      setIsTranslationOpen(false);
      setIsQuizOpen(false);
      setIsBookmarksOpen(false);
      setIsOfflineOpen(false);
      setIsLoginOpen(false);
      setIsLiveConvoOpen(false);
      setArticleForAI(null);
      // Don't close settings or article page
    };

    const handleSelectArticleFromSearch = (article: Article) => {
      setIsSearchOpen(false);
      setTimeout(() => handleReadMore(article), 300); // delay to allow modal to close
    };

    const handleLogoClick = () => {
        setActiveArticle(null);
        setCurrentCategory('All');
        closeAllModals();
    };

    if (activeArticle) {
        return (
            <div className={`font-sans antialiased text-slate-800 dark:text-slate-200 bg-white dark:bg-navy`}>
                <button onClick={() => setActiveArticle(null)} className="fixed top-4 left-4 z-[60] bg-white/50 dark:bg-navy/50 backdrop-blur-sm p-2 rounded-full shadow-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-navy transition-colors">
                    &larr; Back to Home
                </button>
                <ArticlePage
                    article={activeArticle}
                    onClose={() => setActiveArticle(null)}
                    isBookmarked={bookmarkedArticleIds.includes(activeArticle.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onSummarize={handleSummarize}
                    onExplainSimply={handleExplainSimply}
                    onTextToSpeech={handleTextToSpeech}
                    onTranslate={handleTranslate}
                    onQuiz={handleQuiz}
                />
            </div>
        );
    }
    
    if (isSettingsOpen) {
        return (
             <SettingsPage
                onClose={() => setIsSettingsOpen(false)}
                currentSettings={aiSettings}
                onSave={setAiSettings}
                theme={theme}
                onToggleTheme={handleToggleTheme}
            />
        )
    }

    return (
        <div className={`font-sans antialiased text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-navy`}>
            <Header 
                onMenuClick={() => setIsMenuOpen(true)}
                onSearchClick={() => setIsSearchOpen(true)}
                onSettingsClick={() => setIsSettingsOpen(true)}
                onLogoClick={handleLogoClick}
                categories={categories}
                onSelectCategory={handleSelectCategory}
                isAuthenticated={isAuthenticated}
                onLoginClick={() => setIsLoginOpen(true)}
                onLogout={() => setIsConfirmLogoutOpen(true)}
            />
            <NewsTicker headlines={articles.slice(0, 5).map(a => a.title)} />
            <main className="pt-28">
                <Hero article={articles[0]} onReadMore={() => handleReadMore(articles[0])} />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                           <GlobalHighlights 
                                articles={filteredArticles} 
                                onSummarize={handleSummarize}
                                onExplainSimply={handleExplainSimply}
                                onTextToSpeech={handleTextToSpeech}
                                onTranslate={handleTranslate}
                                onReadMore={handleReadMore}
                                audioState={{ playingArticleId: null, isGenerating: false }} 
                                bookmarkedArticleIds={bookmarkedArticleIds}
                                onToggleBookmark={handleToggleBookmark}
                                offlineArticleIds={offlineArticleIds}
                                downloadingArticleId={downloadingArticleId}
                                onDownloadArticle={handleDownloadArticle}
                           />
                        </div>
                       <RightAside 
                           trendingArticles={articles.slice(1, 6)}
                           onArticleClick={handleReadMore}
                       />
                    </div>
                     <LiveStream />
                     <NewsMap articles={articles} onArticleClick={handleReadMore} />
                     <PodcastHub podcasts={mockPodcasts} activePodcast={activePodcast} isPodcastPlaying={isPodcastPlaying} onPlay={handlePlayPodcast} />
                     <Mahama360 articles={articles.slice(5, 8)} />
                </div>
            </main>
            <Footer />

            {/* Modals & Players */}
            <CategoryMenu 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)}
                categories={categories}
                onCategorySelect={handleSelectCategory}
                onBookmarksClick={() => { setIsMenuOpen(false); openBookmarks(); }}
                onOfflineClick={() => { setIsMenuOpen(false); openOffline(); }}
                onSettingsClick={() => { setIsMenuOpen(false); setIsSettingsOpen(true); }}
            />
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} articles={articles} onArticleSelect={handleSelectArticleFromSearch} />
            <SummarizerModal article={articleForAI} summaryLength={summaryLength} onClose={() => setIsSummarizerOpen(false)} />
            <ExplainSimplyModal article={articleForAI} onClose={() => setIsExplainSimplyOpen(false)} />
            <TranslationModal article={articleForAI} defaultLanguage={aiSettings.defaultLanguage} onClose={() => setIsTranslationOpen(false)} />
            <QuizModal article={articleForAI} onClose={() => setIsQuizOpen(false)} />
            <TextToSpeechPlayer article={ttsArticle} voice={aiSettings.ttsVoice} onClose={() => setTtsArticle(null)} />
            <PodcastPlayer 
                activePodcast={activePodcast} 
                isPlaying={isPodcastPlaying} 
                onPlayPause={() => setIsPodcastPlaying(!isPodcastPlaying)}
                onClose={() => { setActivePodcast(null); setIsPodcastPlaying(false); }}
            />
            <BookmarksModal isOpen={isBookmarksOpen} onClose={() => setIsBookmarksOpen(false)} bookmarkedArticles={bookmarkedArticles} onToggleBookmark={handleToggleBookmark} onReadArticle={handleReadMore} />
            <OfflineModal isOpen={isOfflineOpen} onClose={() => setIsOfflineOpen(false)} offlineArticles={offlineArticles} onDeleteArticle={handleDeleteOfflineArticle} onReadArticle={handleReadMore} />
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
            <LiveConversationModal isOpen={isLiveConvoOpen} onClose={() => setIsLiveConvoOpen(false)} />
            <ConfirmationModal isOpen={isConfirmLogoutOpen} onClose={() => setIsConfirmLogoutOpen(false)} title="Confirm Logout" message="Are you sure you want to log out?" onConfirm={handleLogout} />

            <FloatingActionButton onClick={() => setIsLiveConvoOpen(true)} />
        </div>
    );
};

export default App;
