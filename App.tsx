

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { mockArticles, hiddenArticles, mockPodcasts, categories, mockCurrentUser, mockStreamingContent } from './constants';
import type { Article, Podcast, Settings, StreamingContent, AudioPlayerState, AiTtsVoice, WeatherData, User, KeyConcept, TimelineEvent, CommunityHighlight, FactCheckResult, Notification } from './types';
import { getOfflineArticleIds, saveArticleForOffline, getOfflineArticles, deleteOfflineArticle, clearAllOfflineArticles } from './utils/db';
import { determineOptimalLayout, factCheckArticle, getThisDayInHistory } from './utils/ai';
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
import Mahama360 from './components/Mahama360';
import DataDrivenInsights from './components/DataDrivenInsights';
import PodcastHub from './components/PodcastHub';
import InnovationTimeline from './components/InnovationTimeline';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import MoviesTVPage from './components/MoviesTVPage';
import SponsoredBanners from './components/SponsoredBanners';
import InteractiveGlobe from './components/InteractiveGlobe';

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
import ComparisonModal from './components/ComparisonModal';
import CompareNowButton from './components/CompareNowButton';
// FIX: Import the missing MahamaInvestigatesPage component.
import MahamaInvestigatesPage from './components/MahamaInvestigatesPage';


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

const aiModals = ['summarize', 'explain', 'quiz', 'counterpoint', 'behindTheNews', 'expertAnalysis', 'askAuthor', 'briefing', 'factCheckPage', 'deepDive', 'infographic', 'live', 'compare'];
const premiumModals = ['askAuthor', 'deepDive', 'counterpoint', 'expertAnalysis', 'factCheckPage', 'infographic', 'compare'];


const App: React.FC = () => {
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const savedSettings = localStorage.getItem('mahamaNewsSettings');
            const parsed = savedSettings ? JSON.parse(savedSettings) : {};
            return { ...defaultSettings, ...parsed };
        } catch (error) {
            return defaultSettings;
        }
    });
    
    // Page state
    const [activeArticle, setActiveArticle] = useState<Article | null>(null);
    const [activeMovie, setActiveMovie] = useState<StreamingContent | null>(null);
    const [isMoviesPage, setIsMoviesPage] = useState(false);
    const [isMahamaInvestigatesPage, setIsMahamaInvestigatesPage] = useState(false);
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


    // Real-time feed state
    const [allArticles, setAllArticles] = useState<Article[]>([...mockArticles, ...hiddenArticles]);

    // Authentication & User
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser] = useState<User>(mockCurrentUser);

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

    // AI data for Article Page
    const [keyConcepts, setKeyConcepts] = useState<KeyConcept[]>([]);
    const [conceptsLoading, setConceptsLoading] = useState(false);
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
    const [timelineLoading, setTimelineLoading] = useState(false);
    const [pullQuotes, setPullQuotes] = useState<string[]>([]);
    const [pullQuotesLoading, setPullQuotesLoading] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tagsLoading, setTagsLoading] = useState(false);
    const [factCheckResult, setFactCheckResult] = useState<FactCheckResult | null>(null);
    const [factCheckLoading, setFactCheckLoading] = useState(false);
    const [aiTakeaways, setAiTakeaways] = useState<string[]>([]);
    const [takeawaysLoading, setTakeawaysLoading] = useState(false);
    const [communityHighlights, setCommunityHighlights] = useState<CommunityHighlight[]>([]);
    const [highlightsLoading, setHighlightsLoading] = useState(false);
    
    // Comparison state
    const [comparisonList, setComparisonList] = useState<number[]>([]);
    
    // Notifications
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 1, type: 'briefing', message: 'Your daily AI briefing is ready!', timestamp: '2h ago', read: false },
        { id: 2, type: 'mention', message: 'Chen Wei mentioned you in a comment on "G7 Leaders Convene..."', timestamp: '5h ago', read: false },
        { id: 3, type: 'news', message: 'BREAKING: Tensions flare in South China Sea.', timestamp: 'Yesterday', read: true },
    ]);

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
    }, [settings]);

    // Initial data loading
    useEffect(() => {
        try {
            const savedBookmarks = localStorage.getItem('mahamaNewsBookmarks');
            if (savedBookmarks) setBookmarkedArticleIds(JSON.parse(savedBookmarks));
        } catch (error) { console.error("Failed to load bookmarks", error); }
        
        const fetchOfflineData = async () => {
            const ids = await getOfflineArticleIds();
            setOfflineArticleIds(ids);
            const articles = await getOfflineArticles();
            setOfflineArticles(articles);
        };
        fetchOfflineData();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                const data = await fetchWeather(latitude, longitude);
                setWeatherData(data);
                setIsWeatherLoading(false);
              },
              async () => {
                const data = await fetchWeather(40.7128, -74.0060); // Default location
                setWeatherData({ ...data, locationName: "New York, NY"});
                setIsWeatherLoading(false);
              }
            );
        } else {
            setIsWeatherLoading(false);
        }
    }, []);

    // Fetch AI data for active article
    useEffect(() => {
        if (activeArticle) {
            const fetchAiData = async () => {
                setFactCheckLoading(true);
                setTakeawaysLoading(true);
                // MOCKING DATA for features without an AI util function
                setConceptsLoading(true);
                setTimelineLoading(true);
                setPullQuotesLoading(true);
                setTagsLoading(true);
// FIX: The state setter `setCommunityHighlightsLoading` does not exist. Use `setHighlightsLoading` instead.
                setHighlightsLoading(true);

                setTimeout(() => {
                    setKeyConcepts([
                        { term: 'G7', description: 'The Group of Seven is an intergovernmental political forum consisting of Canada, France, Germany, Italy, Japan, the United Kingdom, and the United States.', type: 'Organization' },
                        { term: 'Fiscal Stimulus', description: 'Government measures, normally involving increased public spending and lower taxation, aimed at giving a positive jolt to economic activity.', type: 'Concept' }
                    ]);
                    setTimelineEvents([ { year: '2008', description: 'A similar global financial crisis led to coordinated G8/G20 summits.' } ]);
                    setPullQuotes(['Analysts are watching closely to see if the world\'s leading economies can set aside recent trade tensions.']);
                    setTags(['Global Economy', 'International Relations', 'G7 Summit', 'Financial Crisis']);
                    setCommunityHighlights([ { viewpoint: 'Optimistic View', summary: 'Community members believe this summit shows a commitment to global cooperation that could stabilize markets.' } ]);
                    
                    setConceptsLoading(false);
                    setTimelineLoading(false);
                    setPullQuotesLoading(false);
                    setTagsLoading(false);
// FIX: The state setter `setCommunityHighlightsLoading` does not exist. Use `setHighlightsLoading` instead.
                    setHighlightsLoading(false);
                }, 1500);

                try {
                    const [factCheck, takeaways] = await Promise.all([
                        factCheckArticle(activeArticle, settings),
                        Promise.resolve(activeArticle.keyTakeaways) // Using mock takeaways for now
                    ]);
                    setFactCheckResult(factCheck);
                    setAiTakeaways(takeaways);
                } catch (e) {
                    console.error("Failed to fetch some AI data", e);
                } finally {
                    setFactCheckLoading(false);
                    setTakeawaysLoading(false);
                }
            };
            fetchAiData();
        }
    }, [activeArticle, settings]);


    const handleSettingsChange = (newSettings: Settings) => setSettings(newSettings);

    const bookmarkedArticles = useMemo(() => allArticles.filter(a => bookmarkedArticleIds.includes(a.id)), [bookmarkedArticleIds, allArticles]);
    
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

    const closeModal = () => {
        setActiveModal(null);
        setModalArticle(null);
    };

    const handleReadMore = (article: Article) => {
        setActiveArticle(article);
        setActiveMovie(null);
        setIsSettingsOpen(false);
        setIsProfileOpen(false);
        setIsMoviesPage(false);
        setIsMahamaInvestigatesPage(false);
        window.scrollTo(0, 0);
    };
    
    const handleWatchMovie = (movie: StreamingContent) => {
        setActiveMovie(movie);
        setActiveArticle(null);
        setIsSettingsOpen(false);
        setIsProfileOpen(false);
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
        localStorage.setItem('mahamaNewsBookmarks', JSON.stringify(newBookmarks));
    };

    const handleDownloadArticle = useCallback(async (article: Article) => {
        setDownloadingArticleId(article.id);
        try {
            await saveArticleForOffline(article);
            const articles = await getOfflineArticles();
            setOfflineArticles(articles);
            setOfflineArticleIds(articles.map(a => a.id));
        } finally {
            setDownloadingArticleId(null);
        }
    }, []);

    const handleDeleteOfflineArticle = useCallback(async (id: number) => {
        await deleteOfflineArticle(id);
        const articles = await getOfflineArticles();
        setOfflineArticles(articles);
        setOfflineArticleIds(articles.map(a => a.id));
    }, []);
    
    const handleClearAllOffline = async () => {
        await clearAllOfflineArticles();
        setOfflineArticles([]);
        setOfflineArticleIds([]);
    }
    
    const handleClearAllBookmarks = () => {
        setBookmarkedArticleIds([]);
        localStorage.removeItem('mahamaNewsBookmarks');
    }

    const handleLogin = () => { setIsAuthenticated(true); closeModal(); };
    const handleLogout = () => setIsAuthenticated(false);
    
    const handleSubscribe = (plan: 'Free' | 'Premium', priceDetails: { name: string, price: string }) => {
        if (plan === 'Premium') {
            setSelectedPlan(priceDetails);
            setActiveModal('payment');
        } else {
            handleSettingsChange({ ...settings, subscriptionTier: plan });
            closeModal();
        }
    };
    
    const handlePaymentSuccess = () => {
        handleSettingsChange({ ...settings, subscriptionTier: 'Premium' });
        setActiveModal(null);
    }
    
    const handleLogoClick = () => {
        handleCloseContent();
        setIsMoviesPage(false);
        setIsMahamaInvestigatesPage(false);
        setCurrentCategory('For You');
        setCurrentSubCategory(null);
        window.scrollTo(0, 0);
    };

    const handleSelectCategory = (category: string) => {
        if (category === currentCategory) return;
        setIsCategoryLoading(true);
        setTimeout(() => {
            handleCloseContent();
            setIsMoviesPage(category === 'Movies & TV');
            setIsMahamaInvestigatesPage(category === 'Mahama Investigates');
            setCurrentCategory(category);
            setCurrentSubCategory(null);
            window.scrollTo(0, 0);
            setIsCategoryLoading(false);
        }, 1500);
    };

    const filteredArticles = useMemo(() => {
        if (currentCategory === 'For You') {
            return allArticles.slice(0, 15);
        }
        if(currentCategory === 'All') {
            return allArticles;
        }
        return allArticles.filter(a => a.category === currentCategory);
    }, [allArticles, currentCategory]);
    
    const addToCompare = (articleId: number) => {
        setComparisonList(prev => {
            if (prev.includes(articleId)) {
                return prev.filter(id => id !== articleId);
            }
            if (prev.length < 2) {
                return [...prev, articleId];
            }
            return prev;
        });
    };
    
    const comparisonArticles = useMemo(() => allArticles.filter(a => comparisonList.includes(a.id)), [comparisonList, allArticles]);

    const mainContent = () => {
        if (activeArticle) {
            return <ArticlePage article={activeArticle} onClose={handleCloseContent} isBookmarked={bookmarkedArticleIds.includes(activeArticle.id)} onToggleBookmark={() => toggleBookmark(activeArticle.id)} onReadMore={handleReadMore} onSummarize={article => openModal('summarize', article)} onExplainSimply={article => openModal('explain', article)} onTextToSpeech={article => openModal('tts', article)} onQuiz={article => openModal('quiz', article)} onCounterpoint={article => openModal('counterpoint', article)} onBehindTheNews={article => openModal('behindTheNews', article)} onExpertAnalysis={article => openModal('expertAnalysis', article)} onAskAuthor={article => openModal('askAuthor', article)} onFactCheckPage={article => openModal('factCheckPage', article)} onDeepDive={article => openModal('deepDive', article)} onInfographic={article => openModal('infographic', article)} settings={settings} onPremiumClick={() => setActiveModal('subscribe')} keyConcepts={keyConcepts} timelineEvents={timelineEvents} timelineLoading={timelineLoading} pullQuotes={pullQuotes} pullQuotesLoading={pullQuotesLoading} tags={tags} tagsLoading={tagsLoading} factCheckResult={factCheckResult} factCheckLoading={factCheckLoading} aiTakeaways={aiTakeaways} takeawaysLoading={takeawaysLoading} communityHighlights={communityHighlights} highlightsLoading={highlightsLoading} comparisonList={comparisonList} onAddToCompare={addToCompare} />;
        }
        if (activeMovie) {
            return <MoviePlayerPage movie={activeMovie} onClose={handleCloseContent} onWatchMovie={handleWatchMovie} />;
        }
        if (isSettingsOpen) {
            return <SettingsPage settings={settings} onSettingsChange={handleSettingsChange} onClose={handleCloseContent} onClearBookmarks={handleClearAllBookmarks} onClearOffline={handleClearAllOffline} onManageSubscription={() => openModal('subscribe')} />;
        }
        if (isProfileOpen) {
            return <ProfilePage user={currentUser} onUserChange={() => {}} settings={settings} onManageSubscription={() => openModal('subscribe')} readingHistory={allArticles.slice(0,5)} />;
        }
        if(activeInfoPage) {
            return <>
                {activeInfoPage === 'about' && <AboutPage isOpen={true} onClose={() => setActiveInfoPage(null)} />}
                {activeInfoPage === 'careers' && <CareersPage isOpen={true} onClose={() => setActiveInfoPage(null)} />}
                {activeInfoPage === 'contact' && <ContactPage isOpen={true} onClose={() => setActiveInfoPage(null)} />}
                {activeInfoPage === 'advertise' && <AdvertisePage isOpen={true} onClose={() => setActiveInfoPage(null)} />}
            </>
        }
        
        return (
            <div className={`lg:grid ${isMoviesPage || isMahamaInvestigatesPage ? '' : 'lg:grid-cols-3 lg:gap-8'}`}>
                <div className={`${isMoviesPage || isMahamaInvestigatesPage ? 'col-span-3' : 'lg:col-span-2'}`}>
                    {currentCategory === 'For You' && <Hero article={allArticles[0]} onReadMore={() => handleReadMore(allArticles[0])}/>}
                    <div className="mt-8">
                        {isMoviesPage ? <MoviesTVPage onWatchMovie={handleWatchMovie} onWatchTrailer={url => setActiveTrailer(url)} /> : isMahamaInvestigatesPage ? <MahamaInvestigatesPage onArticleClick={handleReadMore} /> : <GlobalHighlights articles={filteredArticles} onSummarize={article => openModal('summarize', article)} onExplainSimply={article => openModal('explain', article)} onTextToSpeech={article => openModal('tts', article)} onReadMore={handleReadMore} audioState={{ playingArticleId: audioPlayerState?.article.id || null, isGenerating: false }} bookmarkedArticleIds={bookmarkedArticleIds} onToggleBookmark={toggleBookmark} offlineArticleIds={offlineArticleIds} downloadingArticleId={downloadingArticleId} onDownloadArticle={handleDownloadArticle} comparisonList={comparisonList} onAddToCompare={addToCompare} layout={settings.homepageLayout === 'Dashboard' ? 'grid' : 'default'} />}
                    </div>
                    {settings.showMahama360 && currentCategory === 'For You' && <Mahama360 articles={allArticles.slice(7, 10)} onArticleClick={handleReadMore} />}
                    {settings.showNewsMap && currentCategory === 'For You' && <InteractiveGlobe articles={allArticles} onArticleClick={handleReadMore} />}
                    {settings.showDataInsights && currentCategory === 'For You' && <DataDrivenInsights />}
                    {settings.showNowStreaming && currentCategory === 'For You' && <SponsoredBanners />}
                </div>
                {!(isMoviesPage || isMahamaInvestigatesPage) && <RightAside trendingArticles={allArticles.slice(1, 6)} allArticles={allArticles} onArticleClick={handleReadMore} activeArticle={activeArticle} settings={settings} onGoPremium={() => openModal('subscribe')} weatherData={weatherData} isWeatherLoading={isWeatherLoading} isSettingsOpen={isSettingsOpen} isProfileOpen={isProfileOpen} user={currentUser} keyConcepts={keyConcepts} conceptsLoading={conceptsLoading} timelineEvents={timelineEvents} timelineLoading={timelineLoading}/>}
            </div>
        );
    };

    return (
        <TranslationProvider language={settings.preferredLanguage} settings={settings}>
            <div className="min-h-screen bg-slate-50 dark:bg-navy text-slate-900 dark:text-white">
                {isCategoryLoading && <CategoryLoadingOverlay />}
                {(activeArticle || activeMovie || isSettingsOpen || isProfileOpen || activeInfoPage) && <ScrollProgressBar />}
                <Header onMenuClick={() => openModal('categoryExplorer')} onSearchClick={() => openModal('search')} onSettingsClick={() => setIsSettingsOpen(true)} onProfileClick={() => setIsProfileOpen(true)} onLogoClick={handleLogoClick} isAuthenticated={isAuthenticated} onLoginClick={() => setActiveModal('login')} onLogout={handleLogout} user={currentUser} onNotificationsClick={() => activeModal === 'notifications' ? closeModal() : openModal('notifications')} notifications={notifications} settings={settings} onSettingsChange={handleSettingsChange} isTranslating={false} />

                <main className={`pt-20 transition-opacity duration-300 ${isCategoryLoading ? 'opacity-0' : 'opacity-100'}`}>
                    {!(activeArticle || activeMovie || isSettingsOpen || isProfileOpen || activeInfoPage) && <NewsTicker headlines={allArticles.slice(0, 5).map(a => a.title)} />}
                    <div className="sticky top-20 z-30">
                        {!(activeArticle || activeMovie || isSettingsOpen || isProfileOpen || activeInfoPage) && <FilterBar categories={categories} currentCategory={currentCategory} currentSubCategory={currentSubCategory} onSelectCategory={handleSelectCategory} onSelectSubCategory={setCurrentSubCategory} onGenerateBriefing={() => openModal('briefing')} subscriptionTier={settings.subscriptionTier} />}
                    </div>
                    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${isMoviesPage || isMahamaInvestigatesPage ? 'max-w-full' : ''}`}>
                        {mainContent()}
                    </div>
                </main>

                {!(activeArticle || activeMovie || isSettingsOpen || isProfileOpen || activeInfoPage) && <Footer onInfoPageClick={setActiveInfoPage} />}
                
                {/* Modals */}
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
                <SearchModal isOpen={activeModal === 'search'} onClose={closeModal} articles={allArticles} movies={mockStreamingContent} onArticleSelect={handleReadMore} onMovieSelect={handleWatchMovie} onWatchTrailer={url => setActiveTrailer(url)} settings={settings}/>
                <CategoryExplorerPage isOpen={activeModal === 'categoryExplorer'} onClose={closeModal} categories={categories} onCategorySelect={(cat) => { handleSelectCategory(cat); closeModal(); }} onSubCategorySelect={(sub) => {handleSelectCategory(sub); closeModal();}} onBookmarksClick={() => openModal('bookmarks')} onOfflineClick={() => openModal('offline')} onSettingsClick={() => {closeModal(); setIsSettingsOpen(true);}} />
                <BookmarksModal isOpen={activeModal === 'bookmarks'} onClose={closeModal} bookmarkedArticles={bookmarkedArticles} onToggleBookmark={toggleBookmark} onReadArticle={handleReadMore} />
                <OfflineModal isOpen={activeModal === 'offline'} onClose={closeModal} offlineArticles={offlineArticles} onDeleteArticle={handleDeleteOfflineArticle} onReadArticle={handleReadMore}/>
                <LoginModal isOpen={activeModal === 'login'} onClose={closeModal} onLogin={handleLogin} />
                <SubscriptionModal isOpen={activeModal === 'subscribe'} onClose={closeModal} onSubscribe={handleSubscribe} />
                <PaymentModal isOpen={activeModal === 'payment'} onClose={closeModal} onSuccess={handlePaymentSuccess} plan={selectedPlan} />
                <NewsBriefingModal isOpen={activeModal === 'briefing'} onClose={closeModal} settings={settings} articles={allArticles} onPlayBriefing={(briefing) => setAudioPlayerState({ article: briefing })} />
                <LiveConversationModal isOpen={activeModal === 'live'} onClose={closeModal} />
                <TextToSpeechModal isOpen={activeModal === 'tts'} article={modalArticle} settings={settings} onClose={closeModal} onPlay={(originalArticle, translatedText, voice) => setAudioPlayerState({ article: {...originalArticle, content: translatedText}, voiceOverride: voice })} />
                <TrailerModal isOpen={!!activeTrailer} onClose={() => setActiveTrailer(null)} trailerUrl={activeTrailer} />
                <NotificationCenter isOpen={activeModal === 'notifications'} onClose={closeModal} notifications={notifications} onMarkAsRead={(id) => setNotifications(notifs => notifs.map(n => n.id === id ? {...n, read: true} : n))} onMarkAllAsRead={() => setNotifications(notifs => notifs.map(n => ({...n, read: true})))} />
                <ComparisonModal isOpen={activeModal === 'compare'} onClose={closeModal} articles={comparisonArticles} settings={settings} />

                {/* Floating Players & Buttons */}
                <AudioPlayer state={audioPlayerState} onStateChange={setAudioPlayerState} voice={settings.ttsVoice} />
                {!(activeArticle || activeMovie || isSettingsOpen || isProfileOpen || activeInfoPage) && <FloatingActionButton onClick={() => openModal('live')} />}
                <CompareNowButton articles={comparisonArticles} onCompare={() => openModal('compare')} onRemove={addToCompare} onClear={() => setComparisonList([])} />
            </div>
        </TranslationProvider>
    );
};

export default App;