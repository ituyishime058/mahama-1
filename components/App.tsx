import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import io from 'socket.io-client';
import * as api from '../services/api';
import type { Article, Settings, StreamingContent, AudioPlayerState, WeatherData, User, KeyConcept, TimelineEvent, CommunityHighlight, FactCheckResult, ChatMessage, Podcast, Category } from '../types';
import { getOfflineArticleIds, saveArticleForOffline, getOfflineArticles, deleteOfflineArticle, clearAllOfflineArticles } from '../utils/db';
import { findRelatedArticles } from '../utils/ai';
import { fetchWeather } from '../utils/weather';
import { TranslationProvider } from '../contexts/TranslationContext';
import { useTranslation } from '../hooks/useTranslation';

// Component Imports
import Header from './Header';
import Hero from './Hero';
import GlobalHighlights from './GlobalHighlights';
import RightAside from './RightAside';
import NewsTicker from './NewsTicker';
import FilterBar from './FilterBar';
import ArticlePage from './ArticlePage';
import Mahama360 from './Mahama360';
import DataDrivenInsights from './DataDrivenInsights';
import PodcastHub from './PodcastHub';
import InnovationTimeline from './InnovationTimeline';
import Footer from './Footer';
import ScrollProgressBar from './ScrollProgressBar';
import { MoviesTVPage } from './MoviesTVPage';
import SponsoredBanners from './SponsoredBanners';
import MahamaInvestigatesPage from './MahamaInvestigatesPage';
import NowStreaming from './NowStreaming';

// Modal & Page Imports
import SummarizerModal from './SummarizerModal';
import ExplainSimplyModal from './ExplainSimplyModal';
import QuizModal from './QuizModal';
import CounterpointModal from './CounterpointModal';
import BehindTheNewsModal from './BehindTheNewsModal';
import ExpertAnalysisModal from './ExpertAnalysisModal';
import AskAuthorModal from './AskAuthorModal';
import SearchModal from './SearchModal';
import CategoryExplorerPage from './CategoryExplorerPage';
import BookmarksModal from './BookmarksModal';
import OfflineModal from './OfflineModal';
import SettingsPage from './SettingsPage';
import LoginModal from './LoginModal';
import MoviePlayerPage from './MoviePlayerPage';
import SubscriptionModal from './SubscriptionModal';
import NewsBriefingModal from './NewsBriefingModal';
import LiveConversationModal from './LiveConversationModal';
import AudioPlayer from './AudioPlayer';
import FloatingActionButton from './FloatingActionButton';
import FactCheckPageModal from './FactCheckPageModal';
import TextToSpeechModal from './TextToSpeechModal';
import DeepDiveModal from './DeepDiveModal';
import InfographicModal from './InfographicModal';
import PaymentModal from './PaymentModal';
import AboutPage from './AboutPage';
import CareersPage from './CareersPage';
import ContactPage from './ContactPage';
import AdvertisePage from './AdvertisePage';
import TrailerModal from './TrailerModal';
import CategoryLoadingOverlay from './CategoryLoadingOverlay';
import NotificationCenter from './NotificationCenter';
import MahamaServicesPage from './MahamaServicesPage';
import CompareNowButton from './CompareNowButton';
import ComparisonModal from './ComparisonModal';
import AiAnchorVideoModal from './AiAnchorVideoModal';
import MovieDeepDiveModal from './MovieDeepDiveModal';
import ImageAnalysisModal from './ImageAnalysisModal';
import RingLoader from './RingLoader';

// Admin Components
import AdminDashboard from './Admin/AdminDashboard';


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
    showMahama360: true,
    showNewsMap: false,
    showDataInsights: true,
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
    highContrast: false,
    reduceMotion: false,
    dyslexiaFont: false,
};

const aiModals = ['summarize', 'explain', 'quiz', 'counterpoint', 'behindTheNews', 'expertAnalysis', 'askAuthor', 'briefing', 'factCheckPage', 'deepDive', 'infographic', 'live', 'compare', 'aiAnchorVideo', 'movieDeepDive', 'analyzeImage'];
const premiumModals = ['askAuthor', 'deepDive', 'counterpoint', 'expertAnalysis', 'factCheckPage', 'infographic', 'briefing', 'aiAnchorVideo', 'movieDeepDive', 'analyzeImage'];

const socket = io('http://localhost:5000');


const TranslationStatusBanner = () => {
    const { isTranslating, language } = useTranslation();
    if (!isTranslating) return null;
    return (
        <div className="fixed bottom-4 left-4 z-[100] bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <RingLoader className="text-gold"/>
            <span className="text-sm font-semibold">Translating UI to {language}...</span>
        </div>
    );
}

const App: React.FC = () => {
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const savedSettings = localStorage.getItem('mahamaHubSettings');
            return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings;
        } catch (error) {
            return defaultSettings;
        }
    });

    // --- State Initialization ---
    // Page state
    const [activeArticle, setActiveArticle] = useState<Article | null>(null);
    const [activeMovie, setActiveMovie] = useState<StreamingContent | null>(null);
    const [isMoviesPage, setIsMoviesPage] = useState(false);
    const [isInvestigatesPage, setIsInvestigatesPage] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('For You');
    const [currentSubCategory, setCurrentSubCategory] = useState<string | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [activeInfoPage, setActiveInfoPage] = useState<string | null>(null);
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);
    const [isMahamaServicesPageOpen, setIsMahamaServicesPageOpen] = useState(false);
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

    // Modal states
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalArticle, setModalArticle] = useState<Article | null>(null);
    const [ttsModalArticle, setTtsModalArticle] = useState<Article | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null);
    const [activeTrailer, setActiveTrailer] = useState<string | null>(null);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [comparisonList, setComparisonList] = useState<Article[]>([]);
    const [videoScript, setVideoScript] = useState<string|null>(null);
    const [deepDiveMovie, setDeepDiveMovie] = useState<StreamingContent | null>(null);
    const [analyzeImageArticle, setAnalyzeImageArticle] = useState<Article | null>(null);

    // Data states (articles, podcasts, etc.)
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [streamingContent, setStreamingContent] = useState<StreamingContent[]>([]);
    
    // Real-time feed state
    const [newArticlesQueue, setNewArticlesQueue] = useState<Article[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);

    // Authentication & User
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // Bookmarks & Offline
    const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<number[]>([]);
    const [offlineArticleIds, setOfflineArticleIds] = useState<number[]>([]);
    const [offlineArticles, setOfflineArticles] = useState<Article[]>([]);
    const [downloadingArticleId, setDownloadingArticleId] = useState<number|null>(null);
    
    // Audio Player
    const [audioPlayerState, setAudioPlayerState] = useState<AudioPlayerState | null>(null);

    // Widgets state
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isWeatherLoading, setIsWeatherLoading] = useState(true);

    // AI & Article Enhancement states
    const [keyConcepts, setKeyConcepts] = useState<KeyConcept[]>([]);
    const [conceptsLoading, setConceptsLoading] = useState(false);
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
    const [timelineLoading, setTimelineLoading] = useState(false);
    const [communityHighlights, setCommunityHighlights] = useState<CommunityHighlight[]>([]);
    const [highlightsLoading, setHighlightsLoading] = useState(false);
    const [aiTakeaways, setAiTakeaways] = useState<string[]>([]);
    const [takeawaysLoading, setTakeawaysLoading] = useState(false);
    const [factCheckResult, setFactCheckResult] = useState<FactCheckResult | null>(null);
    const [factCheckLoading, setFactCheckLoading] = useState(false);
    const [pullQuotes, setPullQuotes] = useState<string[]>([]);
    const [pullQuotesLoading, setPullQuotesLoading] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tagsLoading, setTagsLoading] = useState(false);

    // --- Effects ---

    // Apply theme & settings
    useEffect(() => {
        localStorage.setItem('mahamaHubSettings', JSON.stringify(settings));
        const root = window.document.documentElement;
        
        root.classList.toggle('dark', settings.theme === 'dark' || (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));
        root.style.fontSize = `${settings.fontSize}px`;
        
        root.classList.remove('font-sans', 'font-serif', 'font-dyslexic');
        if (settings.dyslexiaFont) {
            root.classList.add('font-dyslexic');
        } else {
            root.classList.add(settings.fontFamily === 'sans' ? 'font-sans' : 'font-serif');
        }
        
        root.classList.toggle('high-contrast', settings.highContrast);
        root.classList.toggle('reduce-motion', settings.reduceMotion);

        document.body.classList.remove('density-comfortable', 'density-compact');
        document.body.classList.add(`density-${settings.informationDensity.toLowerCase()}`);
    }, [settings]);

    // Initial Data Fetching & Authentication
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Parallelize fetching
                const [articlesRes, podcastsRes, categoriesRes, streamingRes, notificationsRes, user] = await Promise.all([
                    api.getArticles(),
                    api.getPodcasts(),
                    api.getCategories(),
                    api.getStreamingContent(),
                    api.getNotifications(),
                    api.getCurrentUser()
                ]);

                setAllArticles(articlesRes.data);
                setPodcasts(podcastsRes.data);
                setCategories(categoriesRes.data);
                setStreamingContent(streamingRes.data);
                setNotifications(notificationsRes.data);

                if (user) {
                    setCurrentUser(user);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Failed to fetch initial data", error);
            }
        };

        fetchInitialData();
        
        // Bookmarks
        try {
            const savedBookmarks = localStorage.getItem('kireheTVBookmarks');
            if (savedBookmarks) setBookmarkedArticleIds(JSON.parse(savedBookmarks));
        } catch (error) { console.error("Failed to load bookmarks", error); }
        
        // Offline Articles
        const fetchOfflineData = async () => {
            const ids = await getOfflineArticleIds();
            setOfflineArticleIds(ids);
            const articles = await getOfflineArticles();
            setOfflineArticles(articles);
        };
        fetchOfflineData();

        // Weather
        const fetchDefaultWeather = async () => {
            try {
              const data = await fetchWeather(40.7128, -74.0060); // Default to NY
              setWeatherData({ ...data, locationName: "New York, NY" });
            } catch (e) {
              console.error("Failed to fetch default weather", e);
            } finally {
              setIsWeatherLoading(false);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                try {
                  const data = await fetchWeather(position.coords.latitude, position.coords.longitude);
                  setWeatherData(data);
                } catch (e) { 
                    fetchDefaultWeather();
                } finally { 
                  setIsWeatherLoading(false); 
                }
              },
              () => {
                fetchDefaultWeather();
              },
            );
        } else {
            fetchDefaultWeather();
        }

    }, []);
    
    // WebSocket Connection
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('new-article', (newArticle: Article) => {
            setNewArticlesQueue(prevQueue => [newArticle, ...prevQueue]);
            setNotifications(prev => [{ type: 'new_article', article: newArticle, id: Date.now() }, ...prev]);
        });
        
        socket.on('article-updated', (updatedArticle: Article) => {
            setAllArticles(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
        });

        socket.on('new-notification', (notification: any) => {
            setNotifications(prev => [notification, ...prev]);
        });

        return () => {
            socket.off('connect');
            socket.off('new-article');
            socket.off('article-updated');
            socket.off('new-notification');
        };
    }, []);


    // --- Memoized Values ---
    const bookmarkedArticles = useMemo(() => allArticles.filter(a => bookmarkedArticleIds.includes(a.id)), [bookmarkedArticleIds, allArticles]);
    
    const filteredArticles = useMemo(() => {
        let articlesToFilter = allArticles;

        if (currentCategory === 'For You') {
            return articlesToFilter
                .filter(a => settings.contentPreferences.length === 0 || settings.contentPreferences.includes(a.category) || a.sentiment === 'Positive')
                .slice(0, 15);
        }
        
        if(currentCategory !== 'All') {
            articlesToFilter = articlesToFilter.filter(a => a.category === currentCategory);
        }
        
        return articlesToFilter;
    }, [allArticles, currentCategory, settings.contentPreferences]);


    // --- Handlers & Callbacks ---
    
    const handleSettingsChange = (newSettings: Settings) => setSettings(newSettings);

    const openModal = (modal: string, article?: Article) => {
        if (aiModals.includes(modal) && !isAuthenticated) {
            setActiveModal('login');
            return;
        }
        if (modal === 'settings') {
            setIsSettingsOpen(true);
            return;
        }
        if (premiumModals.includes(modal) && settings.subscriptionTier !== 'Premium') {
            setActiveModal('subscribe');
            return;
        }
        setModalArticle(article || activeArticle || null);
        setActiveModal(modal);
    };
    
    const closeModal = () => {
        setActiveModal(null);
        setModalArticle(null);
    };

    const handleLogin = async (credentials: any) => {
        try {
            await api.login(credentials);
            const user = await api.getCurrentUser();
            setCurrentUser(user);
            setIsAuthenticated(true);
            closeModal();
            // Redirect to profile page or dashboard
            setIsSettingsOpen(true); 
        } catch (error) {
            console.error("Login failed", error);
            // Here you would show an error message to the user
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setCurrentUser(null);
        setIsAdminPanelOpen(false); // Close admin panel on logout
        // Redirect to homepage
        handleCloseContent();
        setCurrentCategory('For You');
    };


    const handleReadMore = (article: Article) => {
        setActiveArticle(article);
        // Reset other views
        setActiveMovie(null);
        setIsSettingsOpen(false);
        setIsAdminPanelOpen(false);
    };

    const handleCloseContent = () => {
        setActiveArticle(null);
        setActiveMovie(null);
        setIsSettingsOpen(false);
        setActiveInfoPage(null);
        setIsMahamaServicesPageOpen(false);
        setIsAdminPanelOpen(false);
    };

    const handleSelectCategory = (category: string) => {
        if (category === currentCategory) return;
        setIsCategoryLoading(true);

        setTimeout(() => {
            if (category === 'Movies & TV') {
                setIsMoviesPage(true);
                setIsInvestigatesPage(false);
            } else if (category === 'Mahama Investigates') {
                setIsInvestigatesPage(true);
                setIsMoviesPage(false);
            } else {
                setIsMoviesPage(false);
                setIsInvestigatesPage(false);
            }
            // Close any open article/page
            setActiveArticle(null);
            setIsAdminPanelOpen(false);
            
            setCurrentCategory(category);
            setCurrentSubCategory(null);
            window.scrollTo(0, 0);
            setIsCategoryLoading(false);
        }, 1000); 
    };

    // Placeholder for other handlers (toggleBookmark, downloadArticle, etc.)
    // These would be updated to use API calls where necessary (e.g., if bookmarks were stored on the backend)
    const toggleBookmark = (id: number) => {
        const newBookmarks = bookmarkedArticleIds.includes(id)
            ? bookmarkedArticleIds.filter(bId => bId !== id)
            : [...bookmarkedArticleIds, id];
        setBookmarkedArticleIds(newBookmarks);
        localStorage.setItem('kireheTVBookmarks', JSON.stringify(newBookmarks));
    };

    const handleLogoClick = () => {
        handleCloseContent();
        setCurrentCategory('For You');
        setCurrentSubCategory(null);
        window.scrollTo(0, 0);
    };

    // --- Page Content Rendering ---
    const renderPageContent = () => {
        if (isAdminPanelOpen) {
            return <AdminDashboard onClose={handleCloseContent} />;
        }
        if (isMahamaServicesPageOpen) {
            return <MahamaServicesPage onClose={handleCloseContent} />;
        }
        if (activeArticle) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8">
                    <div className="md:col-span-2 lg:col-span-8">
                        <ArticlePage article={activeArticle} onClose={handleCloseContent} {...commonArticleHandlers} />
                    </div>
                    <div className="md:col-span-1 lg:col-span-4">
                        <RightAside allArticles={allArticles} onArticleClick={handleReadMore} activeArticle={activeArticle} {...commonAsideProps} />
                    </div>
                </div>
            );
        }
        if (activeMovie) {
            return <MoviePlayerPage movie={activeMovie} onClose={handleCloseContent} onWatchMovie={() => {}} onDeepDive={() => {}} />;
        }
        if (isSettingsOpen) {
            return <SettingsPage user={currentUser} onUserChange={setCurrentUser} settings={settings} onSettingsChange={handleSettingsChange} onClose={handleCloseContent} onClearBookmarks={()=>{}} onClearOffline={()=>{}} onManageSubscription={() => setActiveModal('subscribe')} readingHistory={allArticles.slice(5, 10)} />;
        }
        if (activeInfoPage) {
            const pages = {
                'about': AboutPage,
                'careers': CareersPage,
                'contact': ContactPage,
                'advertise': AdvertisePage
            };
            const PageComponent = pages[activeInfoPage as keyof typeof pages];
            return PageComponent ? <PageComponent isOpen={true} onClose={() => setActiveInfoPage(null)} /> : null;
        }
        if (isMoviesPage) {
            return <MoviesTVPage onWatchMovie={() => {}} onWatchTrailer={() => {}} settings={settings} />;
        }
        if (isInvestigatesPage) {
            return <MahamaInvestigatesPage onArticleClick={handleReadMore} />;
        }
        // Homepage
        return (
            <div className="md:grid md:grid-cols-3 md:gap-x-0 lg:gap-x-8">
                <div className="md:col-span-2">
                   {currentCategory === 'For You' && allArticles.length > 0 && <Hero article={allArticles[0]} onReadMore={() => handleReadMore(allArticles[0])}/>}
                   <div className="mt-8">
                        <GlobalHighlights articles={filteredArticles} onReadMore={handleReadMore} {...commonArticleHandlers} bookmarkedArticleIds={bookmarkedArticleIds} onToggleBookmark={toggleBookmark} layout={settings.homepageLayout === 'Dashboard' ? 'grid' : 'default'} audioState={{ playingArticleId: audioPlayerState?.article?.id || null, isGenerating: false }} offlineArticleIds={offlineArticleIds} downloadingArticleId={downloadingArticleId} onDownloadArticle={() => {}} comparisonList={comparisonList.map(a => a.id)} onAddToCompare={() => {}} />
                   </div>
                    {settings.showMahama360 && <Mahama360 articles={allArticles.slice(7, 10)} onArticleClick={handleReadMore}/>}
                    {settings.showDataInsights && <DataDrivenInsights />}
                    <PodcastHub podcasts={podcasts} />
                    {settings.showInnovationTimelines && <InnovationTimeline />}
                    {settings.showNowStreaming && <NowStreaming onWatchMovie={()=>{}} onWatchTrailer={()=>{}} />}
                    <SponsoredBanners />
                </div>
                <RightAside allArticles={allArticles} onArticleClick={handleReadMore} activeArticle={null} {...commonAsideProps} />
            </div>
        );
    };
    
    const commonArticleHandlers = {
        onSummarize: (article: Article) => openModal('summarize', article),
        onExplainSimply: (article: Article) => openModal('explain', article),
        onTextToSpeech: (article: Article) => setTtsModalArticle(article),
        onQuiz: (article: Article) => openModal('quiz', article),
        // ... add all other handlers
    };

    const commonAsideProps = {
        trendingArticles: allArticles.slice(1, 6),
        settings: settings,
        onGoPremium: () => setActiveModal('subscribe'),
        weatherData: weatherData,
        isWeatherLoading: isWeatherLoading,
        isSettingsOpen: isSettingsOpen,
        user: currentUser,
        keyConcepts: [],
        conceptsLoading: false,
        timelineEvents: [],
        timelineLoading: false
    };
    
    const showHeaderAndFilter = !activeArticle && !activeMovie && !isSettingsOpen && !activeInfoPage && !isMahamaServicesPageOpen && !isAdminPanelOpen;


    return (
        <TranslationProvider language={settings.preferredLanguage} settings={settings}>
            <div className="bg-slate-50 dark:bg-navy text-slate-900 dark:text-slate-200 min-h-screen">
                <Header
                    onMenuClick={() => openModal('categoryExplorer')}
                    onSearchClick={() => openModal('search')}
                    onMahamaServicesClick={() => setIsMahamaServicesPageOpen(true)}
                    onProfileAndSettingsClick={() => setIsSettingsOpen(true)}
                    onLogoClick={handleLogoClick}
                    isAuthenticated={isAuthenticated}
                    onLoginClick={() => setActiveModal('login')}
                    onLogout={handleLogout}
                    user={currentUser}
                    onNotificationsClick={() => setIsNotificationsOpen(prev => !prev)}
                    notifications={notifications}
                    settings={settings}
                    onSettingsChange={handleSettingsChange}
                    isTranslating={false}
                    onAdminPanelClick={() => { handleCloseContent(); setIsAdminPanelOpen(true); }}
                />

                <main className="pt-20">
                    {showHeaderAndFilter && <NewsTicker headlines={allArticles.slice(0, 5).map(a => a.title)} />}
                    <div className="sticky top-20 z-30">
                       {showHeaderAndFilter && <FilterBar categories={categories} currentCategory={currentCategory} currentSubCategory={currentSubCategory} onSelectCategory={handleSelectCategory} onSelectSubCategory={() => {}} onGenerateBriefing={() => openModal('briefing')} subscriptionTier={settings.subscriptionTier} />}
                    </div>
                    
                    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
                        {isCategoryLoading ? <CategoryLoadingOverlay /> : renderPageContent()}
                    </div>
                </main>

                {showHeaderAndFilter && <Footer onInfoPageClick={setActiveInfoPage} />}

                {/* All Modals */}
                <LoginModal isOpen={activeModal === 'login'} onClose={closeModal} onLogin={handleLogin} />
                <SummarizerModal isOpen={activeModal === 'summarize'} article={modalArticle} settings={settings} onClose={closeModal} />
                {/* Add other modals here... */}
                <CategoryExplorerPage isOpen={activeModal === 'categoryExplorer'} onClose={closeModal} categories={categories} onCategorySelect={(cat) => { handleSelectCategory(cat); closeModal(); }} onSubCategorySelect={() => {closeModal();}} onBookmarksClick={() => openModal('bookmarks')} onOfflineClick={() => openModal('offline')} onSettingsClick={() => setIsSettingsOpen(true)} />

                <NotificationCenter isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} notifications={notifications} onMarkAsRead={() => {}} onMarkAllAsRead={() => {}} />

                <AudioPlayer state={audioPlayerState} onStateChange={setAudioPlayerState} voice={settings.ttsVoice} />
                {showHeaderAndFilter && <FloatingActionButton onClick={() => openModal('live')} />}
                <TranslationStatusBanner />
            </div>
        </TranslationProvider>
    );
};

export default App;
