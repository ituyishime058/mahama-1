import React, { useState, useEffect, useCallback } from 'react';
import { mockArticles, categories, mockTrendingArticles, mockPodcasts } from './constants';
import type { Article, Settings, Podcast } from './types';
import { saveArticleForOffline, getOfflineArticleIds, deleteOfflineArticle, getOfflineArticles, clearAllOfflineArticles } from './utils/db';

import Header from './components/Header';
import Hero from './components/Hero';
import NewsTicker from './components/NewsTicker';
import FilterBar from './components/FilterBar';
import GlobalHighlights from './components/GlobalHighlights';
import RightAside from './components/RightAside';
import Footer from './components/Footer';
import SummarizerModal from './components/SummarizerModal';
import ExplainSimplyModal from './components/ExplainSimplyModal';
import TextToSpeechPlayer from './components/TextToSpeechPlayer';
import ArticlePage from './components/ArticlePage';
import SearchModal from './components/SearchModal';
import SettingsPage from './components/SettingsPage';
import LoginModal from './components/LoginModal';
import CategoryMenu from './components/CategoryMenu';
import BookmarksModal from './components/BookmarksModal';
import OfflineModal from './components/OfflineModal';
import LiveConversationModal from './components/LiveConversationModal';
import FloatingActionButton from './components/FloatingActionButton';
import PodcastHub from './components/PodcastHub';
import PodcastPlayer from './components/PodcastPlayer';
import TranslationModal from './components/TranslationModal';
import QuizModal from './components/QuizModal';
import ConfirmationModal from './components/ConfirmationModal';


const App: React.FC = () => {
    // Page State
    const [currentPage, setCurrentPage] = useState<'home' | 'article' | 'settings'>('home');
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    
    // Modal State
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalArticle, setModalArticle] = useState<Article | null>(null);
    const [confirmation, setConfirmation] = useState<{ title: string; message: string; onConfirm: () => void; } | null>(null);

    // AI State
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState('');
    const [audioState, setAudioState] = useState<{ playingArticleId: number | null, isGenerating: boolean, audioBase64: string | null }>({ playingArticleId: null, isGenerating: false, audioBase64: null });
    
    // User/Settings State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [settings, setSettings] = useState<Settings>({ 
        theme: 'system', 
        fontSize: 16, 
        fontFamily: 'sans', 
        enableNotifications: true, 
        dataSaverMode: false,
        language: 'English',
        hiddenCategories: [],
        aiSummaryLength: 'Medium',
        aiTtsVoice: 'Kore'
    });
    const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<number[]>([]);
    const [offlineArticleIds, setOfflineArticleIds] = useState<number[]>([]);
    const [offlineArticles, setOfflineArticles] = useState<Article[]>([]);
    const [downloadingArticleId, setDownloadingArticleId] = useState<number | null>(null);

    // Podcast State
    const [activePodcast, setActivePodcast] = useState<Podcast | null>(null);
    const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);
    
    // Handlers
    const handleReadMore = (article: Article) => {
        setSelectedArticle(article);
        setCurrentPage('article');
        window.scrollTo(0, 0);
    };

    const handleSummarize = (article: Article) => {
        setModalArticle(article);
        setActiveModal('summarizer');
    };
    
    const handleExplainSimply = (article: Article) => {
        setModalArticle(article);
        setActiveModal('explain');
    };

    const handleTextToSpeech = (article: Article) => {
        setModalArticle(article);
        setActiveModal('tts');
    };
    
    const handleTranslate = (article: Article) => {
        setModalArticle(article);
        setActiveModal('translate');
    };

    const handleQuiz = (article: Article) => {
        setModalArticle(article);
        setActiveModal('quiz');
    };

    const closeModal = () => {
        setActiveModal(null);
        setModalArticle(null);
        setAiError('');
    };
    
    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        setActiveModal(null); // Close menu if open
    };
    
    const filteredArticles = selectedCategory === 'All'
        ? mockArticles.filter(a => !settings.hiddenCategories.includes(a.category))
        : mockArticles.filter(a => a.category === selectedCategory);

    // Bookmarks and Offline
    const toggleBookmark = (articleId: number) => {
        setBookmarkedArticleIds(prev =>
            prev.includes(articleId) ? prev.filter(id => id !== articleId) : [...prev, articleId]
        );
    };
    
    const handleClearBookmarks = () => {
        setConfirmation({
            title: "Clear All Bookmarks",
            message: "Are you sure you want to delete all your bookmarked articles? This action cannot be undone.",
            onConfirm: () => {
                setBookmarkedArticleIds([]);
                setConfirmation(null);
            }
        })
    };

    const handleDownloadArticle = async (article: Article) => {
        setDownloadingArticleId(article.id);
        try {
            await saveArticleForOffline(article);
            setOfflineArticleIds(prev => [...prev, article.id]);
        } catch (error) {
            console.error("Failed to save article", error);
        } finally {
            setDownloadingArticleId(null);
        }
    };
    
     const handleDeleteOfflineArticle = async (articleId: number) => {
        await deleteOfflineArticle(articleId);
        setOfflineArticleIds(prev => prev.filter(id => id !== articleId));
        setOfflineArticles(prev => prev.filter(a => a.id !== articleId));
    };
    
    const handleClearOfflineArticles = () => {
         setConfirmation({
            title: "Clear Offline Articles",
            message: "Are you sure you want to delete all articles saved for offline reading? This will free up storage space.",
            onConfirm: async () => {
                await clearAllOfflineArticles();
                await fetchOfflineData();
                setConfirmation(null);
            }
        })
    };


    const fetchOfflineData = useCallback(async () => {
        const ids = await getOfflineArticleIds();
        setOfflineArticleIds(ids);
        if (activeModal === 'offline') {
            const articles = await getOfflineArticles();
            setOfflineArticles(articles);
        }
    }, [activeModal]);

    useEffect(() => {
        fetchOfflineData();
    }, [fetchOfflineData]);
    
    // Podcast Player Logic
    const handlePlayPodcast = (podcast: Podcast) => {
        if (activePodcast?.id === podcast.id) {
            setIsPodcastPlaying(prev => !prev);
        } else {
            setActivePodcast(podcast);
            setIsPodcastPlaying(true);
        }
    };
    
    const handleLogoClick = () => {
        setCurrentPage('home');
        window.scrollTo(0,0);
    }
    
    const renderPage = () => {
        switch(currentPage) {
            case 'article':
                return selectedArticle && (
                    <ArticlePage 
                        article={selectedArticle} 
                        onClose={() => setCurrentPage('home')}
                        isBookmarked={bookmarkedArticleIds.includes(selectedArticle.id)}
                        onToggleBookmark={toggleBookmark}
                        onSummarize={handleSummarize}
                        onExplainSimply={handleExplainSimply}
                        onTextToSpeech={handleTextToSpeech}
                        onTranslate={handleTranslate}
                        onQuiz={handleQuiz}
                    />
                );
            case 'settings':
                return (
                    <SettingsPage 
                        settings={settings}
                        onSettingsChange={(newSettings) => setSettings(s => ({...s, ...newSettings}))}
                        onClose={() => setCurrentPage('home')}
                        onClearBookmarks={handleClearBookmarks}
                        onClearOfflineArticles={handleClearOfflineArticles}
                    />
                );
            case 'home':
            default:
                return (
                    <>
                        <Header onMenuClick={() => setActiveModal('menu')} onSearchClick={() => setActiveModal('search')} onSettingsClick={() => setCurrentPage('settings')} onLogoClick={handleLogoClick} categories={categories} onSelectCategory={handleSelectCategory} isAuthenticated={isAuthenticated} onLoginClick={() => setActiveModal('login')} onLogout={() => setIsAuthenticated(false)} />
                        <main>
                           <Hero article={mockArticles[0]} onReadMore={() => handleReadMore(mockArticles[0])} />
                           <NewsTicker headlines={mockArticles.slice(0, 5).map(a => a.title)} />
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                               <FilterBar categories={categories} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2">
                                        <GlobalHighlights 
                                            articles={filteredArticles}
                                            onSummarize={handleSummarize}
                                            onExplainSimply={handleExplainSimply}
                                            onTextToSpeech={handleTextToSpeech}
                                            onTranslate={handleTranslate}
                                            onReadMore={handleReadMore}
                                            audioState={audioState}
                                            bookmarkedArticleIds={bookmarkedArticleIds}
                                            onToggleBookmark={toggleBookmark}
                                            offlineArticleIds={offlineArticleIds}
                                            downloadingArticleId={downloadingArticleId}
                                            onDownloadArticle={handleDownloadArticle}
                                        />
                                        <PodcastHub podcasts={mockPodcasts} activePodcast={activePodcast} isPodcastPlaying={isPodcastPlaying} onPlay={handlePlayPodcast} />
                                    </div>
                                    <RightAside trendingArticles={mockTrendingArticles} onArticleClick={handleReadMore} />
                                </div>
                            </div>
                        </main>
                        <Footer />
                    </>
                );
        }
    }

    return (
        <div className="bg-slate-100 dark:bg-navy text-slate-800 dark:text-slate-200">
            {renderPage()}
            
            {/* Modals & Players */}
            <SummarizerModal article={modalArticle} summaryLength={settings.aiSummaryLength} onClose={closeModal} />
            <ExplainSimplyModal article={modalArticle} onClose={closeModal} />
            <TextToSpeechPlayer article={modalArticle} voice={settings.aiTtsVoice} onClose={closeModal} />
            
            <SearchModal isOpen={activeModal === 'search'} onClose={closeModal} articles={mockArticles} onArticleSelect={(article) => { closeModal(); handleReadMore(article); }} />
            <LoginModal isOpen={activeModal === 'login'} onClose={closeModal} onLogin={() => { setIsAuthenticated(true); closeModal(); }} />
            <CategoryMenu isOpen={activeModal === 'menu'} onClose={closeModal} categories={categories} onCategorySelect={handleSelectCategory} onBookmarksClick={() => setActiveModal('bookmarks')} onOfflineClick={() => setActiveModal('offline')} onSettingsClick={() => setCurrentPage('settings')} />
            <BookmarksModal isOpen={activeModal === 'bookmarks'} onClose={closeModal} bookmarkedArticles={mockArticles.filter(a => bookmarkedArticleIds.includes(a.id))} onToggleBookmark={toggleBookmark} onReadArticle={handleReadMore} />
            <OfflineModal isOpen={activeModal === 'offline'} onClose={closeModal} offlineArticles={offlineArticles} onDeleteArticle={handleDeleteOfflineArticle} onReadArticle={handleReadMore} />
            <LiveConversationModal isOpen={activeModal === 'live'} onClose={closeModal} />
            <TranslationModal article={modalArticle} defaultLanguage={settings.language} onClose={closeModal} />
            <QuizModal article={modalArticle} onClose={closeModal} />
            <ConfirmationModal isOpen={!!confirmation} onClose={() => setConfirmation(null)} title={confirmation?.title || ''} message={confirmation?.message || ''} onConfirm={confirmation?.onConfirm || (() => {})} />
            
            <FloatingActionButton onClick={() => setActiveModal('live')} />
            <PodcastPlayer activePodcast={activePodcast} isPlaying={isPodcastPlaying} onPlayPause={() => setIsPodcastPlaying(p => !p)} onClose={() => { setActivePodcast(null); setIsPodcastPlaying(false); }} />
        </div>
    );
};

export default App;