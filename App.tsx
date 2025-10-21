

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { mockArticles, hiddenArticles, mockPodcasts, categories, stockData, mockCurrentUser, mockStreamingContent } from './constants';
import type { Article, Podcast, Settings, StreamingContent, AudioPlayerState, AiTtsVoice, WeatherData, User, FactCheckResult, KeyConcept, TimelineEvent, CommunityHighlight } from './types';
import { getOfflineArticleIds, saveArticleForOffline, getOfflineArticles, deleteOfflineArticle, clearAllOfflineArticles } from './utils/db';
import { determineOptimalLayout, getFactCheck, getKeyConcepts, getTimeline, getPullQuotes, getAiTags, getCommunityHighlights } from './utils/ai';
import { fetchWeather } from './utils/weather';
import { TranslationProvider } from './contexts/TranslationContext';

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
import DataDrivenInsights from './components/DataDrivenInsights';
import PodcastHub from './components/PodcastHub';
import InnovationTimeline from './components/InnovationTimeline';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import MoviesTVPage from './components/MoviesTVPage';
import SponsoredBanners from './components/SponsoredBanners';
import InteractiveGlobe from './components/InteractiveGlobe';
import MahamaInvestigatesPage from './components/MahamaInvestigatesPage';

// Modal & Page Imports
import SummarizerModal from './components/SummarizerModal';
import ExplainSimplyModal from './components/ExplainSimplyModal';
import QuizModal from './components/QuizModal';
import CounterpointModal from './components/CounterpointModal';
import BehindTheNewsModal from './components/BehindTheNewsModal';
import ExpertAnalysisModal from './components/ExpertAnalysisModal';
import AskAuthorModal from './components/AskAuthorModal';
import SearchModal from './components/SearchModal';
import CategoryExplorerPage from './components/CategoryExplorerPage';
import BookmarksModal from './components/BookmarksModal';
import OfflineModal from './components/OfflineModal';
import SettingsPage from './components/SettingsPage';
import LoginModal from './components/LoginModal';
import MoviePlayerPage from './components/MoviePlayerPage';
import SubscriptionModal from './components/SubscriptionModal';
import NewsBriefingModal from './components/NewsBriefingModal';
import LiveConversationModal from './components/LiveConversationModal';
import AudioPlayer from './components/AudioPlayer';
import FloatingActionButton from './components/FloatingActionButton';
import FactCheckPageModal from './components/FactCheckPageModal';
import TextToSpeechModal from './components/TextToSpeechModal';
import DeepDiveModal from './components/DeepDiveModal';
import InfographicModal from './components/InfographicModal';
import PaymentModal from './components/PaymentModal';
import AboutPage from './components/AboutPage';
import CareersPage from './components/CareersPage';
import ContactPage from './components/ContactPage';
import AdvertisePage from './components/AdvertisePage';
import ProfilePage from './components/ProfilePage';
import TrailerModal from './components/TrailerModal';
import CategoryLoadingOverlay from './components/CategoryLoadingOverlay';
import NotificationCenter from './components/NotificationCenter';
import OnboardingTour from './components/OnboardingTour';
import ComparisonModal from './components/ComparisonModal';
import CompareNowButton from './components/CompareNowButton';
import AiAnchorVideoModal from './components/AiAnchorVideoModal';
import KireheServicesModal from './components/KireheServicesModal';


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
    showNewsMap: true,
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
};

const aiModals = ['summarize', 'explain', 'quiz', 'counterpoint', 'behindTheNews', 'expertAnalysis', 'askAuthor', 'briefing', 'factCheckPage', 'deepDive', 'infographic', 'live', 'compare', 'kireheServices'];
const premiumModals = ['askAuthor', 'deepDive', 'counterpoint', 'expertAnalysis', 'factCheckPage', 'infographic', 'briefing', 'compare'];


const App: React.FC = () => {
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const savedSettings = localStorage.getItem('kireheTVSettings');
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
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeInfoPage, setActiveInfoPage] = useState<string | null>(null);
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);

    // Modal states
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalArticle, setModalArticle] = useState<Article | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null);
    const [activeTrailer, setActiveTrailer] = useState<string | null>(null);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('kireheTVOnboardingComplete'));
    const [comparisonList, setComparisonList] = useState<number[]>([]);
    const [briefingScript, setBriefingScript] = useState<string|null>(null);


    // Real-time feed state
    const [allArticles, setAllArticles] = useState<Article[]>(mockArticles);
    const [newArticlesQueue, setNewArticlesQueue] = useState<Article[]>([]);
    const hiddenArticlesRef = useRef([...hiddenArticles]);


    // Authentication & User
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>(mockCurrentUser);
    const [notifications, setNotifications] = useState<any[]>([]);

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

    // AI-generated article enhancement states
    const [keyConcepts, setKeyConcepts] = useState<KeyConcept[]>([]);
    const [conceptsLoading, setConceptsLoading] = useState(false);
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
    const [timelineLoading, setTimelineLoading] = useState(false);
    const [pullQuotes, setPullQuotes] = useState<string[]>([]);
    const [pullQuotesLoading, setPullQuotesLoading] = useState(false);
    const [aiTags, setAiTags] = useState<string[]>([]);
    const [tagsLoading, setTagsLoading] = useState(false);
    const [factCheckResult, setFactCheckResult] = useState<FactCheckResult|null>(null);
    const [factCheckLoading, setFactCheckLoading] = useState(false);
    const [aiTakeaways, setAiTakeaways] = useState<string[]>([]);
    const [takeawaysLoading, setTakeawaysLoading] = useState(false);
    const [communityHighlights, setCommunityHighlights] = useState<CommunityHighlight[]>([]);
    const [highlightsLoading, setHighlightsLoading] = useState(false);
    
    // Apply theme
    useEffect(() => {
        localStorage.setItem('kireheTVSettings', JSON.stringify(settings));
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

        if (settings.reduceMotion) {
            root.classList.add('reduce-motion');
        } else {
            root.classList.remove('reduce-motion');
        }
        if (settings.highContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }

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

        // Geolocation & Weather
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

    // Fetch AI enhancements when active article changes
    useEffect(() => {
        if (activeArticle) {
            setKeyConcepts([]);
            setTimelineEvents([]);
            setPullQuotes([]);
            setAiTags([]);
            setFactCheckResult(null);
            setAiTakeaways([]);
            setCommunityHighlights([]);

            setConceptsLoading(true);
            getKeyConcepts(activeArticle, settings).then(setKeyConcepts).catch(console.error).finally(() => setConceptsLoading(false));

            if (activeArticle.hasTimeline) {
                setTimelineLoading(true);
                getTimeline(activeArticle, settings).then(setTimelineEvents).catch(console.error).finally(() => setTimelineLoading(false));
            }
            
            setPullQuotesLoading(true);
            getPullQuotes(activeArticle, settings).then(setPullQuotes).catch(console.error).finally(() => setPullQuotesLoading(false));

            setTagsLoading(true);
            getAiTags(activeArticle, settings).then(setAiTags).catch(console.error).finally(() => setTagsLoading(false));

            setFactCheckLoading(true);
            getFactCheck(activeArticle, settings).then(setFactCheckResult).catch(console.error).finally(() => setFactCheckLoading(false));

            setTakeawaysLoading(true);
            getCommunityHighlights(activeArticle, settings, 'takeaways').then(res => setAiTakeaways(res.map(r => r.summary))).catch(console.error).finally(() => setTakeawaysLoading(false));
            
            setHighlightsLoading(true);
            // FIX: Corrected state setter call from sethighlightsLoading to setHighlightsLoading
            getCommunityHighlights(activeArticle, settings, 'highlights').then(setCommunityHighlights).catch(console.error).finally(() => setHighlightsLoading(false));

        }
    }, [activeArticle, settings]);


    // Real-time article simulation
    useEffect(() => {
      const interval = setInterval(() => {
        if (hiddenArticlesRef.current.length > 0) {
          const nextArticle = hiddenArticlesRef.current.shift();
          if (nextArticle) {
            setNewArticlesQueue(prev => [nextArticle, ...prev]);
          }
        } else {
          clearInterval(interval);
        }
      }, 20000); // New article every 20 seconds
    
      return () => clearInterval(interval);
    }, []);

    const loadNewArticles = () => {
        setAllArticles(prev => [...newArticlesQueue, ...prev]);
        setNewArticlesQueue([]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSettingsChange = (newSettings: Settings) => {
        setSettings(newSettings);
    };

    const bookmarkedArticles = useMemo(() => {
        const bookmarked = allArticles.filter(a => bookmarkedArticleIds.includes(a.id));
        const offlineBookmarked = offlineArticles.filter(a => bookmarkedArticleIds.includes(a.id) && !bookmarked.find(ba => ba.id === a.id));
        return [...bookmarked, ...offlineBookmarked];
    }, [bookmarkedArticleIds, allArticles, offlineArticles]);


    // AI Layout Optimization
    useEffect(() => {
        const optimizeLayout = async () => {
          if (settings.subscriptionTier === 'Premium' && bookmarkedArticles.length >= 3) {
            try {
              const optimalLayout = await determineOptimalLayout(bookmarkedArticles, settings);
              if (optimalLayout && settings.homepageLayout !== optimalLayout) {
                const newDensity = optimalLayout === 'Dashboard' ? 'Compact' : 'Comfortable';
                handleSettingsChange({ ...settings, homepageLayout: optimalLayout, informationDensity: newDensity });
              }
            } catch (e) {
              console.error("Layout optimization failed", e);
            }
          }
        };
        const timer = setTimeout(optimizeLayout, 2000); // Debounce
        return () => clearTimeout(timer);
    }, [bookmarkedArticles.length, settings.subscriptionTier]);


    const openModal = (modal: string, article?: Article) => {
        if (aiModals.includes(modal) && !isAuthenticated) {
            setActiveModal('login');
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
        setActiveModal('tts');
        setModalArticle(article);
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
        setIsProfileOpen(false);
        setIsMoviesPage(false);
        setIsInvestigatesPage(false);
    };
    
    const handleWatchMovie = (movie: StreamingContent) => {
        setActiveMovie(movie);
        setActiveArticle(null);
        setActiveModal(null);
        setIsSettingsOpen(false);
        setIsProfileOpen(false);
    };

    const handleWatchTrailer = (url: string) => {
        setActiveTrailer(url);
    };

    const handleCloseContent = () => {
        setActiveArticle(null);
        setActiveMovie(null);
        setIsSettingsOpen(false);
        setIsProfileOpen(false);
        setActiveInfoPage(null);
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
        // Show onboarding tour for new logins if they haven't seen it
        if (!localStorage.getItem('kireheTVOnboardingComplete')) {
            setShowOnboarding(true);
        }
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
        setIsProfileOpen(false);
        setIsMoviesPage(false);
        setIsInvestigatesPage(false);
        setActiveInfoPage(null);
        setCurrentCategory('For You');
        setCurrentSubCategory(null);
        window.scrollTo(0, 0);
    };

    const handleSelectCategory = (category: string) => {
        if (category === currentCategory && !isMoviesPage && !isInvestigatesPage) return;

        setIsCategoryLoading(true);

        setTimeout(() => {
            setIsMoviesPage(category === 'Movies & TV');
            setIsInvestigatesPage(category === 'Kirehe TV Investigates');
            setActiveArticle(null);

            setCurrentCategory(category);
            setCurrentSubCategory(null);
            window.scrollTo(0, 0);
            setIsCategoryLoading(false);
        }, 1000); // 1-second delay
    };

    const handleSelectSubCategory = (subCategory: string) => {
        setCurrentSubCategory(subCategory);
        window.scrollTo(0, 0);
    };
    
    const closeOnboarding = () => {
        setShowOnboarding(false);
        localStorage.setItem('kireheTVOnboardingComplete', 'true');
    }

    const handleAddToCompare = (articleId: number) => {
        setComparisonList(prev => {
            if (prev.includes(articleId)) {
                return prev.filter(id => id !== articleId);
            }
            if (prev.length < 2) {
                return [...prev, articleId];
            }
            return prev; // Max 2
        });
    };
    
    const comparisonArticles = useMemo(() => allArticles.filter(a => comparisonList.includes(a.id)), [comparisonList, allArticles]);


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
    
    const renderCategoryContent = () => {
        if (isMoviesPage) {
            return <MoviesTVPage onWatchMovie={handleWatchMovie} onWatchTrailer={handleWatchTrailer} />;
        }
        if (isInvestigatesPage) {
            return <MahamaInvestigatesPage onArticleClick={handleReadMore} />;
        }

        const layout = settings.homepageLayout === 'Dashboard' ? 'grid' : 'default';
        return <GlobalHighlights articles={filteredArticles} onSummarize={article => openModal('summarize', article)} onExplainSimply={article => openModal('explain', article)} onTextToSpeech={handleOpenTtsModal} onReadMore={handleReadMore} audioState={{ playingArticleId: audioPlayerState?.article.id || null, isGenerating: false }} bookmarkedArticleIds={bookmarkedArticleIds} onToggleBookmark={toggleBookmark} offlineArticleIds={offlineArticleIds} downloadingArticleId={downloadingArticleId} onDownloadArticle={handleDownloadArticle} comparisonList={comparisonList} onAddToCompare={handleAddToCompare} layout={layout} />;
    };


    return (
        <TranslationProvider language={settings.preferredLanguage} settings={settings}>
            <div className="min-h-screen bg-slate-50 dark:bg-navy text-slate-800 dark:text-slate-200">
                {isCategoryLoading && <CategoryLoadingOverlay text={`Loading ${currentCategory}...`} />}
                {activeArticle && <ScrollProgressBar />}
                <Header
                    onMenuClick={() => openModal('categoryExplorer')}
                    onSearchClick={() => openModal('search')}
                    onKireheServicesClick={() => openModal('kireheServices')}
                    onSettingsClick={() => setIsSettingsOpen(true)}
                    onProfileClick={() => setIsProfileOpen(true)}
                    onLogoClick={handleLogoClick}
                    isAuthenticated={isAuthenticated}
                    onLoginClick={() => setActiveModal('login')}
                    onLogout={handleLogout}
                    user={currentUser}
                    onNotificationsClick={() => setIsNotificationsOpen(p => !p)}
                    notifications={notifications}
                    settings={settings}
                    onSettingsChange={handleSettingsChange}
                    isTranslating={false}
                />

                <main className="pt-20">
                    {!activeArticle && !activeMovie && !isSettingsOpen && !isProfileOpen && !activeInfoPage && (
                    <NewsTicker headlines={allArticles.slice(0, 5).map(a => a.title)} />
                    )}
                    <div className="sticky top-20 z-30">
                        {!activeArticle && !activeMovie && !isSettingsOpen && !isProfileOpen && !activeInfoPage && (
                            <FilterBar categories={categories} currentCategory={currentCategory} currentSubCategory={currentSubCategory} onSelectCategory={handleSelectCategory} onSelectSubCategory={handleSelectSubCategory} onGenerateBriefing={() => openModal('briefing')} subscriptionTier={settings.subscriptionTier} />
                        )}
                    </div>
                    
                    {newArticlesQueue.length > 0 && !activeArticle && !activeMovie && (
                        <div className="fixed top-40 left-1/2 -translate-x-1/2 z-40">
                            <button onClick={loadNewArticles} className="px-4 py-2 bg-deep-red text-white font-semibold rounded-full shadow-lg animate-bounce">
                                {newArticlesQueue.length} New Article{newArticlesQueue.length > 1 ? 's' : ''}
                            </button>
                        </div>
                    )}
                    
                    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${isMoviesPage || isInvestigatesPage ? 'max-w-full' : ''}`}>
                        {activeArticle ? (
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
                                settings={settings}
                                onPremiumClick={() => setActiveModal('subscribe')}
                                keyConcepts={keyConcepts}
                                timelineEvents={timelineEvents}
                                timelineLoading={timelineLoading}
                                pullQuotes={pullQuotes}
                                pullQuotesLoading={pullQuotesLoading}
                                tags={aiTags}
                                tagsLoading={tagsLoading}
                                factCheckResult={factCheckResult}
                                factCheckLoading={factCheckLoading}
                                aiTakeaways={aiTakeaways}
                                takeawaysLoading={takeawaysLoading}
                                communityHighlights={communityHighlights}
                                highlightsLoading={highlightsLoading}
                            />
                        ) : activeMovie ? (
                            <MoviePlayerPage movie={activeMovie} onClose={handleCloseContent} onWatchMovie={handleWatchMovie} />
                        ) : isSettingsOpen ? (
                            <SettingsPage settings={settings} onSettingsChange={handleSettingsChange} onClose={handleCloseContent} onClearBookmarks={handleClearAllBookmarks} onClearOffline={handleClearAllOffline} onManageSubscription={() => setActiveModal('subscribe')} />
                        ) : isProfileOpen ? (
                            <ProfilePage onClose={handleCloseContent} user={currentUser} onUserChange={setCurrentUser} settings={settings} onManageSubscription={() => setActiveModal('subscribe')} readingHistory={allArticles.slice(5, 10)} />
                        ) : activeInfoPage ? (
                            <>
                                {activeInfoPage === 'about' && <AboutPage isOpen={true} onClose={() => setActiveInfoPage(null)} />}
                                {activeInfoPage === 'careers' && <CareersPage isOpen={true} onClose={() => setActiveInfoPage(null)} />}
                                {activeInfoPage === 'contact' && <ContactPage isOpen={true} onClose={() => setActiveInfoPage(null)} />}
                                {activeInfoPage === 'advertise' && <AdvertisePage isOpen={true} onClose={() => setActiveInfoPage(null)} />}
                            </>
                        ) : (
                            <div className={`lg:grid ${isMoviesPage || isInvestigatesPage ? '' : 'lg:grid-cols-3 lg:gap-8'}`}>
                                <div className={`${isMoviesPage || isInvestigatesPage ? 'col-span-3' : 'lg:col-span-2'}`}>
                                {currentCategory === 'For You' && !isMoviesPage && !isInvestigatesPage && <Hero article={allArticles[0]} onReadMore={() => handleReadMore(allArticles[0])}/>}
                                <div className={`${currentCategory === 'For You' && !isMoviesPage && !isInvestigatesPage ? 'mt-8' : ''}`}>
                                    {renderCategoryContent()}
                                </div>
                                    {settings.showMahama360 && currentCategory === 'For You' && <Mahama360 articles={allArticles.slice(7, 10)} onArticleClick={handleReadMore} />}
                                    {settings.showNowStreaming && currentCategory === 'For You' && <SponsoredBanners />}
                                </div>
                                {!isMoviesPage && !isInvestigatesPage && <RightAside trendingArticles={allArticles.slice(1, 6)} allArticles={allArticles} onArticleClick={handleReadMore} activeArticle={activeArticle} settings={settings} onGoPremium={() => setActiveModal('subscribe')} weatherData={weatherData} isWeatherLoading={isWeatherLoading} isSettingsOpen={isSettingsOpen} isProfileOpen={isProfileOpen} user={currentUser} keyConcepts={keyConcepts} conceptsLoading={conceptsLoading} timelineEvents={timelineEvents} timelineLoading={timelineLoading} />}
                            </div>
                        )}
                    </div>
                </main>

                {!activeArticle && <Footer onInfoPageClick={setActiveInfoPage} />}
                
                {showOnboarding && <OnboardingTour onClose={closeOnboarding} />}

                <CompareNowButton articles={comparisonArticles} onCompare={() => openModal('compare')} onRemove={handleAddToCompare} onClear={() => setComparisonList([])} />

                <SummarizerModal isOpen={activeModal === 'summarize'} article={modalArticle} settings={settings} onClose={closeModal} />
                <ExplainSimplyModal isOpen={activeModal === 'explain'} article={modalArticle} settings={settings} onClose={closeModal} />
                <QuizModal isOpen={activeModal === 'quiz'} article={modalArticle} settings={settings} onClose={closeModal} />
                <CounterpointModal isOpen={activeModal === 'counterpoint'} article={modalArticle} settings={settings} onClose={closeModal} />
                <BehindTheNewsModal isOpen={activeModal === 'behindTheNews'} article={modalArticle} settings={settings} onClose={closeModal} />
                <ExpertAnalysisModal isOpen={activeModal === 'expertAnalysis'} article={modalArticle} settings={settings} onClose={closeModal} />
                <AskAuthorModal isOpen={activeModal === 'askAuthor'} article={modalArticle} settings={settings} onClose={closeModal} />
                <DeepDiveModal isOpen={activeModal === 'deepDive'} article={modalArticle} settings={settings} onClose={closeModal} />
                <InfographicModal isOpen={activeModal === 'infographic'} article={modalArticle} settings={settings} onClose={closeModal} />
                <FactCheckPageModal isOpen={activeModal === 'factCheckPage'} onClose={closeModal} settings={settings} pageContent={modalArticle?.content || ''} />
                <SearchModal isOpen={activeModal === 'search'} onClose={closeModal} articles={allArticles} movies={mockStreamingContent} onArticleSelect={handleReadMore} onMovieSelect={handleWatchMovie} onWatchTrailer={handleWatchTrailer} settings={settings}/>
                <CategoryExplorerPage isOpen={activeModal === 'categoryExplorer'} onClose={closeModal} categories={categories} onCategorySelect={(cat) => { handleSelectCategory(cat); closeModal(); }} onBookmarksClick={() => openModal('bookmarks')} onOfflineClick={() => openModal('offline')} onSettingsClick={() => {closeModal(); setIsSettingsOpen(true);}} />
                <BookmarksModal isOpen={activeModal === 'bookmarks'} onClose={closeModal} bookmarkedArticles={bookmarkedArticles} onToggleBookmark={toggleBookmark} onReadArticle={handleReadMore} />
                <OfflineModal isOpen={activeModal === 'offline'} onClose={closeModal} offlineArticles={offlineArticles} onDeleteArticle={handleDeleteOfflineArticle} onReadArticle={handleReadMore}/>
                <LoginModal isOpen={activeModal === 'login'} onClose={closeModal} onLogin={handleLogin} />
                <SubscriptionModal isOpen={activeModal === 'subscribe'} onClose={closeModal} onSubscribe={handleSubscribe} />
                <PaymentModal isOpen={activeModal === 'payment'} onClose={closeModal} onSuccess={handlePaymentSuccess} plan={selectedPlan} />
                <NewsBriefingModal isOpen={activeModal === 'briefing'} onClose={closeModal} settings={settings} articles={allArticles} onPlayBriefing={(briefing) => setAudioPlayerState({ article: briefing })} onGenerateVideo={script => { setBriefingScript(script); openModal('anchorVideo'); }}/>
                <AiAnchorVideoModal isOpen={activeModal === 'anchorVideo'} onClose={closeModal} script={briefingScript} />
                <LiveConversationModal isOpen={activeModal === 'live'} onClose={closeModal} />
                <KireheServicesModal isOpen={activeModal === 'kireheServices'} onClose={closeModal} />
                <TextToSpeechModal isOpen={activeModal === 'tts'} article={modalArticle} settings={settings} onClose={closeModal} onPlay={(originalArticle, translatedText, voice) => setAudioPlayerState({ article: {...originalArticle, content: translatedText}, voiceOverride: voice })} />
                <TrailerModal isOpen={!!activeTrailer} onClose={() => setActiveTrailer(null)} trailerUrl={activeTrailer} />
                <ComparisonModal isOpen={activeModal === 'compare'} articles={comparisonArticles} settings={settings} onClose={closeModal} />
                <NotificationCenter isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} notifications={notifications} onMarkAsRead={(id) => setNotifications(n => n.map(notif => notif.id === id ? {...notif, read: true} : notif))} onMarkAllAsRead={() => setNotifications(n => n.map(notif => ({...notif, read: true})))} />


                <AudioPlayer state={audioPlayerState} onStateChange={setAudioPlayerState} voice={settings.ttsVoice} />
                {!activeArticle && !activeMovie && <FloatingActionButton onClick={() => openModal('live')} />}
            </div>
        </TranslationProvider>
    );
};

export default App;