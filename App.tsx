import React, { useState, useEffect, useCallback } from 'react';
import { mockArticles, mockPodcasts, categories, stockData } from './constants';
import type { Article, Podcast, Settings, StreamingContent, AudioPlayerState } from './types';
import { getOfflineArticleIds, saveArticleForOffline, getOfflineArticles, deleteOfflineArticle, clearAllOfflineArticles } from './utils/db';

// Component Imports
import Header from './components/Header';
import Hero from './components/Hero';
import GlobalHighlights from './components/GlobalHighlights';
import RightAside from './components/RightAside';
import NewsTicker from './components/NewsTicker';
import FilterBar from './components/FilterBar';
import ArticlePage from './components/ArticlePage';
import LiveStream from './components/LiveStream';
import Mahama360 from './components/Mahama360';
import NewsMap from './components/NewsMap';
import DataDrivenInsights from './components/DataDrivenInsights';
import PodcastHub from './components/PodcastHub';
import InnovationTimeline from './components/InnovationTimeline';
import NowStreaming from './components/NowStreaming';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';

// Modal Imports
import SummarizerModal from './components/SummarizerModal';
import ExplainSimplyModal from './components/ExplainSimplyModal';
import TranslationModal from './components/TranslationModal';
import QuizModal from './components/QuizModal';
import CounterpointModal from './components/CounterpointModal';
import BehindTheNewsModal from './components/BehindTheNewsModal';
import ExpertAnalysisModal from './components/ExpertAnalysisModal';
import AskAuthorModal from './components/AskAuthorModal';
import SearchModal from './components/SearchModal';
import CategoryMenu from './components/CategoryMenu';
import BookmarksModal from './components/BookmarksModal';
import OfflineModal from './components/OfflineModal';
import SettingsPage from './components/SettingsPage';
import LoginModal from './components/LoginModal';
import TrailerModal from './components/TrailerModal';
import MoviePlayerPage from './components/MoviePlayerPage';
import SubscriptionModal from './components/SubscriptionModal';
import NewsBriefingModal from './components/NewsBriefingModal';
import LiveConversationModal from './components/LiveConversationModal';
import AudioPlayer from './components/AudioPlayer';
import FloatingActionButton from './components/FloatingActionButton';
import FactCheckPageModal from './components/FactCheckPageModal';

const defaultSettings: Settings = {
    theme: 'system',
    fontSize: 16,
    fontFamily: 'sans',
    aiModelPreference: 'Speed',
    summaryLength: 'medium',
    contentPreferences: [],
    autoTranslate: false,
    preferredLanguage: 'English',
    showCounterpoint: true,
    showInnovationTimelines: true,
    showNowStreaming: true,
    interactiveGlossary: true,
    aiReadingLens: 'None',
    ttsVoice: 'Zephyr',
    aiVoicePersonality: 'Friendly',
    homepageLayout: 'Standard',
    notificationPreferences: {
        breakingNews: true,
        dailyDigest: false,
        aiRecommendations: true,
    },
    subscriptionTier: 'Free',
    informationDensity: 'Comfortable',
};


const App: React.FC = () => {
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const savedSettings = localStorage.getItem('mahamaNewsSettings');
            return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
        } catch (error) {
            return defaultSettings;
        }
    });
    
    // Page state
    const [activeArticle, setActiveArticle] = useState<Article | null>(null);
    const [activeMovie, setActiveMovie] = useState<StreamingContent | null>(null);
    const [currentCategory, setCurrentCategory] = useState('For You');

    // Modal states
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalArticle, setModalArticle] = useState<Article | null>(null);

    // Authentication
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Bookmarks & Offline
    const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<number[]>([]);
    const [offlineArticleIds, setOfflineArticleIds] = useState<number[]>([]);
    const [offlineArticles, setOfflineArticles] = useState<Article[]>([]);
    const [downloadingArticleId, setDownloadingArticleId] = useState<number|null>(null);
    
    // Audio Player
    const [audioPlayerState, setAudioPlayerState] = useState<AudioPlayerState | null>(null);
    const [activePodcast, setActivePodcast] = useState<Podcast | null>(null);
    const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);

    // Trailer Modal
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
    
    // Apply theme
    useEffect(() => {
        localStorage.setItem('mahamaNewsSettings', JSON.stringify(settings));
        const root = window.document.documentElement;
        if (settings.theme === 'dark' || (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        root.style.fontSize = `${settings.fontSize}px`;
        root.classList.remove('font-sans', 'font-serif');
        root.classList.add(settings.fontFamily === 'sans' ? 'font-sans' : 'font-serif');
        document.body.classList.remove('density-comfortable', 'density-compact');
        document.body.classList.add(`density-${settings.informationDensity.toLowerCase()}`);
    }, [settings]);

    // Load bookmarks and offline articles on init
    useEffect(() => {
        try {
            const savedBookmarks = localStorage.getItem('mahamaNewsBookmarks');
            if (savedBookmarks) setBookmarkedArticleIds(JSON.parse(savedBookmarks));
        } catch (error) {
            console.error("Failed to load bookmarks", error);
        }
        
        const fetchOfflineData = async () => {
            const ids = await getOfflineArticleIds();
            setOfflineArticleIds(ids);
            const articles = await getOfflineArticles();
            setOfflineArticles(articles);
        };
        fetchOfflineData();
    }, []);

    const handleSettingsChange = (newSettings: Settings) => {
        setSettings(newSettings);
    };

    const openModal = (modal: string, article?: Article) => {
        setModalArticle(article || activeArticle || null);
        setActiveModal(modal);
    };

    const closeModal = () => {
        setActiveModal(null);
        setModalArticle(null);
    };

    const handleReadMore = (article: Article) => {
        setActiveArticle(article);
        setActiveMovie(null);
        setActiveModal(null);
    };
    
    const handleWatchMovie = (movie: StreamingContent) => {
        setActiveMovie(movie);
        setActiveArticle(null);
        setActiveModal(null);
    };

    const handleCloseArticle = () => {
        setActiveArticle(null);
        setActiveMovie(null);
    };

    const toggleBookmark = (id: number) => {
        const newBookmarks = bookmarkedArticleIds.includes(id)
            ? bookmarkedArticleIds.filter(bId => bId !== id)
            : [...bookmarkedArticleIds, id];
        setBookmarkedArticleIds(newBookmarks);
        localStorage.setItem('mahamaNewsBookmarks', JSON.stringify(newBookmarks));
    };

    const handleDownloadArticle = async (article: Article) => {
        setDownloadingArticleId(article.id);
        try {
            await saveArticleForOffline(article);
            setOfflineArticleIds(prev => [...prev, article.id]);
            setOfflineArticles(await getOfflineArticles());
        } catch (error) {
            console.error("Failed to save for offline", error);
        } finally {
            setDownloadingArticleId(null);
        }
    };
    
    const handleDeleteOfflineArticle = async (id: number) => {
        await deleteOfflineArticle(id);
        setOfflineArticleIds(prev => prev.filter(offlineId => offlineId !== id));
        setOfflineArticles(await getOfflineArticles());
    };

    const handlePlayPodcast = (podcast: Podcast) => {
        if(activePodcast?.id === podcast.id) {
            setIsPodcastPlaying(!isPodcastPlaying);
        } else {
            setActivePodcast(podcast);
            setIsPodcastPlaying(true);
        }
    };

    const handlePlayBriefing = (briefingArticle: Article) => {
        setAudioPlayerState({ article: briefingArticle });
    };

    const filteredArticles = currentCategory === 'All' || currentCategory === 'For You' 
        ? mockArticles
        : mockArticles.filter(a => a.category === currentCategory);

    const bookmarkedArticles = mockArticles.filter(a => bookmarkedArticleIds.includes(a.id));

    const pageContent = (
        <>
            {!activeArticle && !activeMovie && activeModal !== 'settings' && (
                <>
                    <Hero article={mockArticles[0]} onReadMore={() => handleReadMore(mockArticles[0])} />
                    <NewsTicker headlines={stockData.map(s => `${s.symbol} ${s.price.toFixed(2)} ${s.change.startsWith('+') ? '▲' : '▼'}`)} />
                    
                    <div className="mt-8">
                        <FilterBar 
                            categories={categories} 
                            currentCategory={currentCategory} 
                            onSelectCategory={setCurrentCategory}
                            onGenerateBriefing={() => openModal('briefing')}
                            subscriptionTier={settings.subscriptionTier}
                        />
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <GlobalHighlights
                                    articles={filteredArticles}
                                    onSummarize={(a) => openModal('summarize', a)}
                                    onExplainSimply={(a) => openModal('explain', a)}
                                    onTextToSpeech={(a) => setAudioPlayerState({article: a})}
                                    onTranslate={(a) => openModal('translate', a)}
                                    onReadMore={handleReadMore}
                                    audioState={{playingArticleId: audioPlayerState?.article.id ?? null, isGenerating: false}}
                                    bookmarkedArticleIds={bookmarkedArticleIds}
                                    onToggleBookmark={toggleBookmark}
                                    offlineArticleIds={offlineArticleIds}
                                    downloadingArticleId={downloadingArticleId}
                                    onDownloadArticle={handleDownloadArticle}
                                />
                                <LiveStream />
                                <Mahama360 articles={mockArticles.slice(2, 5)} />
                                <NewsMap articles={mockArticles} onArticleClick={handleReadMore} />
                                <DataDrivenInsights />
                                <PodcastHub 
                                    podcasts={mockPodcasts} 
                                    activePodcast={activePodcast} 
                                    isPodcastPlaying={isPodcastPlaying} 
                                    onPlay={handlePlayPodcast}
                                />
                                {settings.showInnovationTimelines && <InnovationTimeline />}
                                {settings.showNowStreaming && <NowStreaming onWatchMovie={handleWatchMovie} />}
                            </div>
                            <RightAside
                                trendingArticles={mockArticles.slice(5, 10)}
                                onArticleClick={handleReadMore}
                                activeArticle={null}
                                settings={settings}
                                onGoPremium={() => openModal('subscribe')}
                            />
                        </div>
                    </div>
                </>
            )}

            {(activeArticle || activeMovie || activeModal === 'settings') && (
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {activeArticle && (
                                <ArticlePage
                                    article={activeArticle}
                                    onClose={handleCloseArticle}
                                    isBookmarked={bookmarkedArticleIds.includes(activeArticle.id)}
                                    onToggleBookmark={toggleBookmark}
                                    onReadMore={handleReadMore}
                                    onSummarize={(a) => openModal('summarize', a)}
                                    onExplainSimply={(a) => openModal('explain', a)}
                                    onTextToSpeech={(a) => setAudioPlayerState({article: a})}
                                    onTranslate={(a) => openModal('translate', a)}
                                    onQuiz={(a) => openModal('quiz', a)}
                                    onCounterpoint={(a) => openModal('counterpoint', a)}
                                    onBehindTheNews={(a) => openModal('behindTheNews', a)}
                                    onExpertAnalysis={(a) => openModal('expertAnalysis', a)}
                                    onAskAuthor={(a) => openModal('askAuthor', a)}
                                    onFactCheckPage={(a) => openModal('factCheckPage', a)}
                                    settings={settings}
                                    onPremiumClick={() => openModal('subscribe')}
                                />
                            )}
                            {activeMovie && (
                                <MoviePlayerPage movie={activeMovie} onClose={handleCloseArticle} onWatchMovie={handleWatchMovie} />
                            )}
                            {activeModal === 'settings' && (
                                <SettingsPage 
                                    settings={settings} 
                                    onSettingsChange={handleSettingsChange} 
                                    onClose={closeModal}
                                    onClearBookmarks={() => { setBookmarkedArticleIds([]); localStorage.removeItem('mahamaNewsBookmarks'); }} 
                                    onClearOffline={async () => { await clearAllOfflineArticles(); setOfflineArticleIds([]); setOfflineArticles([]); }} 
                                />
                            )}
                        </div>
                        <RightAside 
                            trendingArticles={mockArticles.slice(5, 10)}
                            onArticleClick={handleReadMore}
                            activeArticle={activeArticle}
                            settings={settings}
                            onGoPremium={() => openModal('subscribe')}
                        />
                    </div>
                </div>
            )}
        </>
    );

    return (
        <div className="bg-slate-50 dark:bg-navy text-slate-800 dark:text-slate-200 min-h-screen transition-colors duration-300">
            <Header
                onMenuClick={() => openModal('menu')}
                onSearchClick={() => openModal('search')}
                onSettingsClick={() => openModal('settings')}
                onLogoClick={handleCloseArticle}
                categories={categories}
                onSelectCategory={setCurrentCategory}
                isAuthenticated={isAuthenticated}
                onLoginClick={() => openModal('login')}
                onLogout={() => setIsAuthenticated(false)}
            />
            
            <main className="pt-20">
                {pageContent}
            </main>
            
            <Footer />

            <FloatingActionButton onClick={() => openModal('live')} />
            
            <ScrollProgressBar />

            {/* Modals */}
            <SummarizerModal isOpen={activeModal === 'summarize'} onClose={closeModal} article={modalArticle} settings={settings} />
            <ExplainSimplyModal isOpen={activeModal === 'explain'} onClose={closeModal} article={modalArticle} settings={settings} />
            <TranslationModal isOpen={activeModal === 'translate'} onClose={closeModal} article={modalArticle} settings={settings} />
            <QuizModal isOpen={activeModal === 'quiz'} onClose={closeModal} article={modalArticle} settings={settings} />
            <CounterpointModal isOpen={activeModal === 'counterpoint'} onClose={closeModal} article={modalArticle} settings={settings} />
            <BehindTheNewsModal isOpen={activeModal === 'behindTheNews'} onClose={closeModal} article={modalArticle} settings={settings} />
            <ExpertAnalysisModal isOpen={activeModal === 'expertAnalysis'} onClose={closeModal} article={modalArticle} settings={settings} />
            <AskAuthorModal isOpen={activeModal === 'askAuthor'} onClose={closeModal} article={modalArticle} settings={settings} />
            <NewsBriefingModal isOpen={activeModal === 'briefing'} onClose={closeModal} settings={settings} articles={mockArticles} onPlayBriefing={handlePlayBriefing} />
            <FactCheckPageModal isOpen={activeModal === 'factCheckPage'} onClose={closeModal} settings={settings} pageContent={modalArticle?.content || ''} />
            
            <SearchModal isOpen={activeModal === 'search'} onClose={closeModal} articles={mockArticles} onArticleSelect={handleReadMore} />
            <LoginModal isOpen={activeModal === 'login'} onClose={closeModal} onLogin={() => { setIsAuthenticated(true); closeModal(); }} />
            <SubscriptionModal isOpen={activeModal === 'subscribe'} onClose={closeModal} onSubscribe={(plan) => { if(plan === 'Premium') { handleSettingsChange({...settings, subscriptionTier: 'Premium' }); } closeModal(); }} />
            <LiveConversationModal isOpen={activeModal === 'live'} onClose={closeModal} />
            
            <CategoryMenu isOpen={activeModal === 'menu'} onClose={closeModal} categories={categories} onCategorySelect={(c) => { setCurrentCategory(c); closeModal();}} onBookmarksClick={() => openModal('bookmarks')} onOfflineClick={() => openModal('offline')} onSettingsClick={() => openModal('settings')} />
            <BookmarksModal isOpen={activeModal === 'bookmarks'} onClose={closeModal} bookmarkedArticles={bookmarkedArticles} onToggleBookmark={toggleBookmark} onReadArticle={handleReadMore} />
            <OfflineModal isOpen={activeModal === 'offline'} onClose={closeModal} offlineArticles={offlineArticles} onDeleteArticle={handleDeleteOfflineArticle} onReadArticle={handleReadMore} />
            
            <TrailerModal isOpen={activeModal === 'trailer'} onClose={() => { setTrailerUrl(null); closeModal(); }} trailerUrl={trailerUrl} />

            <AudioPlayer state={audioPlayerState} onStateChange={setAudioPlayerState} voice={settings.ttsVoice} />
        </div>
    );
};

export default App;
