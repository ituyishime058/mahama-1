import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { mockArticles, hiddenArticles, mockPodcasts, categories, mockCurrentUser, mockStreamingContent } from '../constants';
// FIX: Added FactCheckResult to the import list from ../types.
import type { Article, Settings, StreamingContent, AudioPlayerState, WeatherData, User, KeyConcept, TimelineEvent, CommunityHighlight, FactCheckResult, ChatMessage } from '../types';
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
// FIX: Corrected import path for Mahama360 component.
import Mahama360 from './Mahama360';
import DataDrivenInsights from './DataDrivenInsights';
import PodcastHub from './PodcastHub';
import InnovationTimeline from './InnovationTimeline';
import Footer from './Footer';
import ScrollProgressBar from './ScrollProgressBar';
// FIX: Changed import to a named import to resolve "no default export" error.
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


    // Real-time feed state
    const [allArticles, setAllArticles] = useState<Article[]>(mockArticles);
    const [newArticlesQueue, setNewArticlesQueue] = useState<Article[]>([]);
    const hiddenArticlesRef = useRef([...hiddenArticles]);
    const [notifications, setNotifications] = useState<any[]>([]);


    // Authentication & User
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>(mockCurrentUser);

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
    
    // Apply theme
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

    // Initial data loading
    useEffect(() => {
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

        const fetchDefaultWeather = async () => {
            console.warn("Geolocation failed or was denied. Fetching weather for a default location.");
            try {
              const data = await fetchWeather(40.7128, -74.0060);
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
                const { latitude, longitude } = position.coords;
                try {
                  const data = await fetchWeather(latitude, longitude);
                  setWeatherData(data);
                } catch (e) { 
                    console.error("Failed to fetch weather for current location.", e);
                    fetchDefaultWeather();
                } 
                finally { 
                  setIsWeatherLoading(false); 
                }
              },
              (error) => {
                console.error(`Geolocation error: ${error.message}`);
                fetchDefaultWeather();
              }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
            fetchDefaultWeather();
        }

    }, []);

    const bookmarkedArticles = useMemo(() => allArticles.filter(a => bookmarkedArticleIds.includes(a.id)), [bookmarkedArticleIds, allArticles]);

    const handleSettingsChange = (newSettings: Settings) => {
        setSettings(newSettings);
    };

    const openModal = (modal: string, article?: Article) => {
        if ((aiModals.includes(modal)) && !isAuthenticated) {
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

    const handleOpenTtsModal = (article: Article) => {
        if (!isAuthenticated) {
            setActiveModal('login');
            return;
        }
        setTtsModalArticle(article);
    };
    
    const handleAnalyzeImage = (article: Article) => {
        if (premiumModals.includes('analyzeImage') && settings.subscriptionTier !== 'Premium') {
            setActiveModal('subscribe');
            return;
        }
        if (!isAuthenticated) {
            setActiveModal('login');
            return;
        }
        setAnalyzeImageArticle(article);
    };


    const closeModal = () => {
        setActiveModal(null);
        setModalArticle(null);
    };

    const handleReadMore = (article: Article) => {
        setActiveArticle(article);
        setActiveMovie(null);
        setActiveModal(null);
        setIsSettingsOpen(false);
    };
    
    const handleWatchMovie = (movie: StreamingContent) => {
        setActiveMovie(movie);
        setActiveArticle(null);
        setActiveModal(null);
        setIsSettingsOpen(false);
    };
    
    const handleDeepDiveMovie = (movie: StreamingContent) => {
        if (premiumModals.includes('movieDeepDive') && settings.subscriptionTier !== 'Premium') {
            setActiveModal('subscribe');
            return;
        }
        setDeepDiveMovie(movie);
    };

    const handleWatchTrailer = (url: string) => {
        setActiveTrailer(url);
    };

    const handleCloseContent = () => {
        setActiveArticle(null);
        setActiveMovie(null);
        setIsSettingsOpen(false);
        setActiveInfoPage(null);
        setIsMahamaServicesPageOpen(false);
    };

    const toggleBookmark = (id: number) => {
        const newBookmarks = bookmarkedArticleIds.includes(id)
            ? bookmarkedArticleIds.filter(bId => bId !== id)
            : [...bookmarkedArticleIds, id];
        setBookmarkedArticleIds(newBookmarks);
        localStorage.setItem('kireheTVBookmarks', JSON.stringify(newBookmarks));
    };

    const handleDownloadArticle = useCallback(async (article: Article) => {
        setDownloadingArticleId(article.id);
        try {
            await saveArticleForOffline(article);
            const ids = await getOfflineArticleIds();
            setOfflineArticleIds(ids);
            const articles = await getOfflineArticles();
            setOfflineArticles(articles);
        } catch (error) {
            console.error("Failed to save article for offline", error);
        } finally {
            setDownloadingArticleId(null);
        }
    }, []);

    const handleDeleteOfflineArticle = useCallback(async (id: number) => {
        try {
            await deleteOfflineArticle(id);
            const ids = await getOfflineArticleIds();
            setOfflineArticleIds(ids);
            const articles = await getOfflineArticles();
            setOfflineArticles(articles);
        } catch (error) {
            console.error("Failed to delete offline article", error);
        }
    }, []);
    
    const handleClearAllOffline = async () => {
        try {
            await clearAllOfflineArticles();
            setOfflineArticleIds([]);
            setOfflineArticles([]);
        } catch (error) {
            console.error("Failed to clear offline articles", error);
        }
    }
    
    const handleClearAllBookmarks = () => {
        setBookmarkedArticleIds([]);
        localStorage.removeItem('kireheTVBookmarks');
    }

    const handleLogin = () => {
        setIsAuthenticated(true);
        setActiveModal(null);
    };
    const handleLogout = () => setIsAuthenticated(false);
    
    const handleSubscribe = (plan: 'Free' | 'Premium', priceDetails: { name: string, price: string }) => {
        if (plan === 'Premium') {
            setSelectedPlan(priceDetails);
            setActiveModal('payment');
        } else {
            handleSettingsChange({ ...settings, subscriptionTier: plan });
            setActiveModal(null);
        }
    };

    const handlePaymentSuccess = () => {
        handleSettingsChange({ ...settings, subscriptionTier: 'Premium' });
        setActiveModal(null);
        setSelectedPlan(null);
    }
    
    const handleLogoClick = () => {
        setActiveArticle(null);
        setActiveMovie(null);
        setIsSettingsOpen(false);
        setIsMoviesPage(false);
        setIsMahamaServicesPageOpen(false);
        setCurrentCategory('For You');
        setCurrentSubCategory(null);
        window.scrollTo(0, 0);
    };

    const handleSelectCategory = (category: string) => {
        if (category === currentCategory) return;
        setIsCategoryLoading(true);

        setTimeout(() => {
            if (category === 'Movies & TV') {
                setIsMoviesPage(true);
                setIsInvestigatesPage(false);
                setActiveArticle(null);
            } else if (category === 'Mahama Investigates') {
                setIsInvestigatesPage(true);
                setIsMoviesPage(false);
                setActiveArticle(null);
            } else {
                setIsMoviesPage(false);
                setIsInvestigatesPage(false);
                setActiveArticle(null);
            }
            setCurrentCategory(category);
            setCurrentSubCategory(null);
            window.scrollTo(0, 0);
            setIsCategoryLoading(false);
        }, 1000); 
    };

    const handleSelectSubCategory = (subCategory: string) => {
        setCurrentSubCategory(subCategory);
        window.scrollTo(0, 0);
    };

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
    }, [allArticles, currentCategory, currentSubCategory, settings.contentPreferences]);

    const addToCompare = (articleId: number) => {
      if (comparisonList.length < 2 && !comparisonList.find(a => a.id === articleId)) {
        const article = allArticles.find(a => a.id === articleId);
        if (article) {
          setComparisonList(prev => [...prev, article]);
        }
      }
    };

    const removeFromCompare = (articleId: number) => {
      setComparisonList(prev => prev.filter(a => a.id !== articleId));
    };
    
    const pageContent = (
      <>
        {isCategoryLoading && <CategoryLoadingOverlay />}
        {activeArticle && <ScrollProgressBar />}
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
        />
        <main className="pt-20">
          {!activeArticle && !activeMovie && !isSettingsOpen && !activeInfoPage && !isMahamaServicesPageOpen && (
            <NewsTicker headlines={allArticles.slice(0, 5).map(a => a.title)} />
          )}
           <div className="sticky top-20 z-30">
               {!activeArticle && !activeMovie && !isSettingsOpen && !activeInfoPage && !isMahamaServicesPageOpen && (
                  <FilterBar categories={categories} currentCategory={currentCategory} currentSubCategory={currentSubCategory} onSelectCategory={handleSelectCategory} onSelectSubCategory={handleSelectSubCategory} onGenerateBriefing={() => openModal('briefing')} subscriptionTier={settings.subscriptionTier} />
               )}
           </div>

            <div className={`w-full px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300`}>
                {isMahamaServicesPageOpen ? (
                     <MahamaServicesPage
                        onClose={handleCloseContent}
                    />
                ) : activeArticle ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8">
                        <div className="md:col-span-2 lg:col-span-8">
                            <ArticlePage 
                                article={activeArticle} 
                                onClose={handleCloseContent}
                                isBookmarked={bookmarkedArticleIds.includes(activeArticle.id)}
                                onToggleBookmark={toggleBookmark}
                                onReadMore={handleReadMore}
                                onSummarize={(article) => openModal('summarize', article)}
                                onExplainSimply={(article) => openModal('explain', article)}
                                onTextToSpeech={handleOpenTtsModal}
                                onQuiz={(article) => openModal('quiz', article)}
                                onCounterpoint={(article) => openModal('counterpoint', article)}
                                onBehindTheNews={(article) => openModal('behindTheNews', article)}
                                onExpertAnalysis={(article) => openModal('expertAnalysis', article)}
                                onAskAuthor={(article) => openModal('askAuthor', article)}
                                onFactCheckPage={(article) => openModal('factCheckPage', article)}
                                onDeepDive={(article) => openModal('deepDive', article)}
                                onInfographic={(article) => openModal('infographic', article)}
                                onAnalyzeImage={handleAnalyzeImage}
                                settings={settings}
                                onPremiumClick={() => setActiveModal('subscribe')}
                                keyConcepts={keyConcepts}
                                timelineEvents={timelineEvents}
                                timelineLoading={timelineLoading}
                                pullQuotes={pullQuotes}
                                pullQuotesLoading={pullQuotesLoading}
                                tags={tags}
                                tagsLoading={tagsLoading}
                                factCheckResult={factCheckResult}
                                factCheckLoading={factCheckLoading}
                                aiTakeaways={aiTakeaways}
                                takeawaysLoading={takeawaysLoading}
                                communityHighlights={communityHighlights}
                                highlightsLoading={highlightsLoading}
                            />
                        </div>
                        <div className="md:col-span-1 lg:col-span-4">
                            <RightAside
                                allArticles={allArticles}
                                trendingArticles={allArticles.slice(1, 6)}
                                onArticleClick={handleReadMore}
                                activeArticle={activeArticle}
                                settings={settings}
                                onGoPremium={() => setActiveModal('subscribe')}
                                weatherData={weatherData}
                                isWeatherLoading={isWeatherLoading}
                                isSettingsOpen={isSettingsOpen}
                                user={currentUser}
                                keyConcepts={keyConcepts}
                                conceptsLoading={conceptsLoading}
                                timelineEvents={timelineEvents}
                                timelineLoading={timelineLoading}
                            />
                        </div>
                    </div>
                ) : activeMovie ? (
                     <MoviePlayerPage movie={activeMovie} onClose={handleCloseContent} onWatchMovie={handleWatchMovie} onDeepDive={handleDeepDiveMovie} />
                ) : isSettingsOpen ? (
                    <SettingsPage user={currentUser} onUserChange={setCurrentUser} settings={settings} onSettingsChange={handleSettingsChange} onClose={handleCloseContent} onClearBookmarks={handleClearAllBookmarks} onClearOffline={handleClearAllOffline} onManageSubscription={() => setActiveModal('subscribe')} readingHistory={allArticles.slice(5, 10)} />
                ) : activeInfoPage ? (
                    <>
                        {activeInfoPage === 'about' && <AboutPage isOpen={true} onClose={() => setActiveInfoPage(null)} />}
                        {activeInfoPage === 'careers' && <CareersPage isOpen={true} onClose={() => setActiveInfoPage(null)} />}
                        {activeInfoPage === 'contact' && <ContactPage isOpen={true} onClose={() => setActiveInfoPage(null)} />}
                        {activeInfoPage === 'advertise' && <AdvertisePage isOpen={true} onClose={() => setActiveInfoPage(null)} />}
                    </>
                ) : isMoviesPage ? (
                    <MoviesTVPage onWatchMovie={handleWatchMovie} onWatchTrailer={handleWatchTrailer} settings={settings} />
                ) : isInvestigatesPage ? (
                    <MahamaInvestigatesPage onArticleClick={handleReadMore} />
                ) : (
                    <div className="md:grid md:grid-cols-3 md:gap-x-0 lg:gap-x-8">
                        <div className="md:col-span-2">
                           {currentCategory === 'For You' && <Hero article={allArticles[0]} onReadMore={() => handleReadMore(allArticles[0])}/>}
                           <div className="mt-8">
                                <GlobalHighlights articles={filteredArticles} onSummarize={article => openModal('summarize', article)} onExplainSimply={article => openModal('explain', article)} onTextToSpeech={handleOpenTtsModal} onReadMore={handleReadMore} audioState={{ playingArticleId: audioPlayerState?.article?.id || null, isGenerating: false }} bookmarkedArticleIds={bookmarkedArticleIds} onToggleBookmark={toggleBookmark} offlineArticleIds={offlineArticleIds} downloadingArticleId={downloadingArticleId} onDownloadArticle={handleDownloadArticle} comparisonList={comparisonList.map(a => a.id)} onAddToCompare={addToCompare} layout={settings.homepageLayout === 'Dashboard' ? 'grid' : 'default'} />
                           </div>
                            {settings.showMahama360 && <Mahama360 articles={allArticles.slice(7, 10)} onArticleClick={handleReadMore}/>}
                            {settings.showDataInsights && <DataDrivenInsights />}
                            <PodcastHub podcasts={mockPodcasts} />
                            {settings.showInnovationTimelines && <InnovationTimeline />}
                            {settings.showNowStreaming && <NowStreaming onWatchMovie={handleWatchMovie} onWatchTrailer={handleWatchTrailer} />}
                            <SponsoredBanners />
                        </div>
                        <RightAside allArticles={allArticles} trendingArticles={allArticles.slice(1, 6)} onArticleClick={handleReadMore} activeArticle={activeArticle} settings={settings} onGoPremium={() => setActiveModal('subscribe')} weatherData={weatherData} isWeatherLoading={isWeatherLoading} isSettingsOpen={isSettingsOpen} user={currentUser} keyConcepts={keyConcepts} conceptsLoading={conceptsLoading} timelineEvents={timelineEvents} timelineLoading={timelineLoading} />
                    </div>
                )}
            </div>
        </main>
        {!activeArticle && !activeMovie && !isSettingsOpen && !activeInfoPage && !isMahamaServicesPageOpen && <Footer onInfoPageClick={setActiveInfoPage} />}
        
        <SummarizerModal isOpen={activeModal === 'summarize'} article={modalArticle} settings={settings} onClose={closeModal} />
        <ExplainSimplyModal isOpen={activeModal === 'explain'} article={modalArticle} settings={settings} onClose={closeModal} />
        <QuizModal isOpen={activeModal === 'quiz'} article={modalArticle} settings={settings} onClose={closeModal} />
        <CounterpointModal isOpen={activeModal === 'counterpoint'} article={modalArticle} settings={settings} onClose={closeModal} />
        <BehindTheNewsModal isOpen={activeModal === 'behindTheNews'} article={modalArticle} settings={settings} onClose={closeModal} />
        <ExpertAnalysisModal isOpen={activeModal === 'expertAnalysis'} article={modalArticle} settings={settings} onClose={closeModal} />
        <AskAuthorModal isOpen={activeModal === 'askAuthor'} article={modalArticle} settings={settings} onClose={closeModal} />
        <DeepDiveModal isOpen={activeModal === 'deepDive'} article={modalArticle} settings={settings} onClose={closeModal} />
        <InfographicModal isOpen={activeModal === 'infographic'} article={modalArticle} settings={settings} onClose={closeModal} />
        <FactCheckPageModal isOpen={activeModal === 'factCheckPage'} onClose={closeModal} settings={settings} pageContent={activeArticle?.content || ''} />
        <SearchModal isOpen={activeModal === 'search'} onClose={closeModal} articles={allArticles} movies={mockStreamingContent} onArticleSelect={handleReadMore} onMovieSelect={handleWatchMovie} onWatchTrailer={handleWatchTrailer} settings={settings}/>
        <CategoryExplorerPage isOpen={activeModal === 'categoryExplorer'} onClose={closeModal} categories={categories} onCategorySelect={(cat) => { handleSelectCategory(cat); closeModal(); }} onSubCategorySelect={(sub) => {handleSelectSubCategory(sub); closeModal();}} onBookmarksClick={() => openModal('bookmarks')} onOfflineClick={() => openModal('offline')} onSettingsClick={() => setIsSettingsOpen(true)} />
        <BookmarksModal isOpen={activeModal === 'bookmarks'} onClose={closeModal} bookmarkedArticles={bookmarkedArticles} onToggleBookmark={toggleBookmark} onReadArticle={handleReadMore} />
        <OfflineModal isOpen={activeModal === 'offline'} onClose={closeModal} offlineArticles={offlineArticles} onDeleteArticle={handleDeleteOfflineArticle} onReadArticle={handleReadMore}/>
        <LoginModal isOpen={activeModal === 'login'} onClose={closeModal} onLogin={handleLogin} />
        <SubscriptionModal isOpen={activeModal === 'subscribe'} onClose={closeModal} onSubscribe={handleSubscribe} />
        <PaymentModal isOpen={activeModal === 'payment'} onClose={closeModal} onSuccess={handlePaymentSuccess} plan={selectedPlan} />
        <NewsBriefingModal isOpen={activeModal === 'briefing'} onClose={closeModal} settings={settings} articles={allArticles} onPlayBriefing={(briefing) => setAudioPlayerState({ article: briefing })} onGenerateVideo={(script) => {setVideoScript(script); openModal('aiAnchorVideo');}} />
        <LiveConversationModal isOpen={activeModal === 'live'} onClose={closeModal} />
        
        <TextToSpeechModal isOpen={!!ttsModalArticle} article={ttsModalArticle} settings={settings} onClose={() => setTtsModalArticle(null)} onPlay={(originalArticle, translatedText, voice) => setAudioPlayerState({ article: {...originalArticle, content: translatedText}, voiceOverride: voice })} />
        <TrailerModal isOpen={!!activeTrailer} onClose={() => setActiveTrailer(null)} trailerUrl={activeTrailer} />
        <NotificationCenter isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} notifications={notifications} onMarkAsRead={() => {}} onMarkAllAsRead={() => {}} />
        <CompareNowButton articles={comparisonList} onCompare={() => openModal('compare')} onRemove={removeFromCompare} onClear={() => setComparisonList([])} />
        <ComparisonModal isOpen={activeModal === 'compare'} articles={comparisonList} settings={settings} onClose={closeModal} />
        <AiAnchorVideoModal isOpen={activeModal === 'aiAnchorVideo'} onClose={closeModal} script={videoScript} />
        <MovieDeepDiveModal isOpen={!!deepDiveMovie} movie={deepDiveMovie} settings={settings} onClose={() => setDeepDiveMovie(null)} />
        <ImageAnalysisModal isOpen={!!analyzeImageArticle} article={analyzeImageArticle} settings={settings} onClose={() => setAnalyzeImageArticle(null)} />

        <AudioPlayer state={audioPlayerState} onStateChange={setAudioPlayerState} voice={settings.ttsVoice} />
        {!activeArticle && !activeMovie && <FloatingActionButton onClick={() => openModal('live')} />}
      </>
    );

    return (
        <TranslationProvider language={settings.preferredLanguage} settings={settings}>
            <div className="bg-slate-50 dark:bg-navy text-slate-900 dark:text-slate-200 min-h-screen">
                {pageContent}
                 <TranslationStatusBanner />
            </div>
        </TranslationProvider>
    );
};

export default App;