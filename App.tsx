import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { mockArticles, hiddenArticles, mockPodcasts, categories, stockData, mockCurrentUser, mockStreamingContent } from './constants';
import type { Article, Podcast, Settings, StreamingContent, AudioPlayerState, AiTtsVoice, WeatherData, User } from './types';
import { getOfflineArticleIds, saveArticleForOffline, getOfflineArticles, deleteOfflineArticle, clearAllOfflineArticles } from './utils/db';
import { determineOptimalLayout } from './utils/ai';
import { fetchWeather } from './utils/weather';

// Component Imports
import Header from './components/Header';
import Hero from './components/Hero';
import GlobalHighlights from './components/GlobalHighlights';
import RightAside from './components/RightAside';
import NewsTicker from './components/NewsTicker';
import FilterBar from './components/FilterBar';
import ArticlePage from './components/ArticlePage';
import Mahama360 from './components/Mahama360';
import NewsMap from './components/NewsMap';
import DataDrivenInsights from './components/DataDrivenInsights';
import PodcastHub from './components/PodcastHub';
import InnovationTimeline from './components/InnovationTimeline';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import MoviesTVPage from './components/MoviesTVPage';
import SponsoredBanners from './components/SponsoredBanners';

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
};

const aiModals = ['summarize', 'explain', 'quiz', 'counterpoint', 'behindTheNews', 'expertAnalysis', 'askAuthor', 'briefing', 'factCheckPage', 'deepDive', 'infographic', 'live'];
const premiumModals = ['askAuthor', 'deepDive', 'counterpoint', 'expertAnalysis', 'factCheckPage', 'infographic'];


const App: React.FC = () => {
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const savedSettings = localStorage.getItem('mahamaNewsSettings');
            return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings;
        } catch (error) {
            return defaultSettings;
        }
    });
    
    // Page state
    const [activeArticle, setActiveArticle] = useState<Article | null>(null);
    const [activeMovie, setActiveMovie] = useState<StreamingContent | null>(null);
    const [isMoviesPage, setIsMoviesPage] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('For You');
    const [currentSubCategory, setCurrentSubCategory] = useState<string | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeInfoPage, setActiveInfoPage] = useState<string | null>(null);
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);

    // Modal states
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalArticle, setModalArticle] = useState<Article | null>(null);
    const [ttsModalArticle, setTtsModalArticle] = useState<Article | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null);
    const [activeTrailer, setActiveTrailer] = useState<string | null>(null);


    // Real-time feed state
    const [allArticles, setAllArticles] = useState<Article[]>(mockArticles);
    const [newArticlesQueue, setNewArticlesQueue] = useState<Article[]>([]);
    const hiddenArticlesRef = useRef([...hiddenArticles]);


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

    // Initial data loading
    useEffect(() => {
        // Bookmarks
        try {
            const savedBookmarks = localStorage.getItem('mahamaNewsBookmarks');
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
              // Default to New York City
              const data = await fetchWeather(40.7128, -74.0060);
              // Manually override location name for clarity in the UI
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

    const bookmarkedArticles = useMemo(() => allArticles.filter(a => bookmarkedArticleIds.includes(a.id)), [bookmarkedArticleIds, allArticles]);

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
    }, [bookmarkedArticles, settings.subscriptionTier]);


    const openModal = (modal: string, article?: Article) => {
        if (aiModals.includes(modal) && !isAuthenticated) {
            setActiveModal('login');
            return;
        }

        if (premiumModals.includes(modal) && settings.subscriptionTier !== 'Premium') {
            if (!isAuthenticated) {
                setActiveModal('login');
            } else {
                setActiveModal('subscribe');
            }
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

    const closeModal = () => {
        setActiveModal(null);
        setModalArticle(null);
    };
    
    const navigateTo = (view: 'article' | 'movie' | 'settings' | 'profile' | 'info' | 'home' | 'moviesPage', data?: any) => {
        setActiveArticle(view === 'article' ? data : null);
        setActiveMovie(view === 'movie' ? data : null);
        setIsSettingsOpen(view === 'settings');
        setIsProfileOpen(view === 'profile');
        setActiveInfoPage(view === 'info' ? data : null);
        setIsMoviesPage(view === 'moviesPage');

        if (view === 'home') {
            setIsMoviesPage(false);
            setCurrentCategory('For You');
            setCurrentSubCategory(null);
        }

        setActiveModal(null); // Close any open modals
        window.scrollTo(0, 0);
    };


    const handleReadMore = (article: Article) => navigateTo('article', article);
    const handleWatchMovie = (movie: StreamingContent) => navigateTo('movie', movie);
    const handleWatchTrailer = (url: string) => setActiveTrailer(url);
    const handleLogoClick = () => navigateTo('home');
    
    const handleCloseContent = () => {
        // This function now returns to the last known category view instead of just home.
        setActiveArticle(null);
        setActiveMovie(null);
        setIsSettingsOpen(false);
        setIsProfileOpen(false);
        setActiveInfoPage(null);
    };

    const handleOpenSettings = () => {
        if (!isAuthenticated) {
            setActiveModal('login');
        } else {
            navigateTo('settings');
        }
    }
    
    const handleOpenProfile = () => {
        if (!isAuthenticated) {
            setActiveModal('login');
        } else {
            navigateTo('profile');
        }
    }

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
        localStorage.removeItem('mahamaNewsBookmarks');
    }

    const handleLogin = () => {
        setIsAuthenticated(true);
        setActiveModal(null);
    };
    const handleLogout = () => {
        setIsAuthenticated(false);
        // If on a protected page, redirect to home
        if (isSettingsOpen || isProfileOpen) {
            handleLogoClick();
        }
    };
    
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
    
    const handleSelectCategory = (category: string) => {
        if (category === currentCategory) return;
        setIsCategoryLoading(true);
        // Close any open page to show the category view
        handleCloseContent();
        
        setTimeout(() => {
            navigateTo(category === 'Movies & TV' ? 'moviesPage' : 'home');
            setCurrentCategory(category);
            setCurrentSubCategory(null);
            setIsCategoryLoading(false);
        }, 1500); // shorter delay
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
    
    const isHomePage = !activeArticle && !activeMovie && !isSettingsOpen && !isProfileOpen && !activeInfoPage;

    const renderMainContent = () => {
        if (activeArticle) {
            return <ArticlePage 
                        article={activeArticle} 
                        onClose={handleCloseContent}
                        isBookmarked={bookmarkedArticleIds.includes(activeArticle.id)}
                        onToggleBookmark={toggleBookmark}
                        onReadMore={handleReadMore}
                        onSummarize={(article) => openModal('summarize', article)}
                        onExplainSimply={(article) => openModal('explain', article)}
                        onTextToSpeech={handleOpenTtsModal}
                        onTranslate={(article) => openModal('translate', article)}
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
                    />;
        }
        if (activeMovie) {
            return <MoviePlayerPage movie={activeMovie} onClose={handleCloseContent} onWatchMovie={handleWatchMovie} />;
        }
        if (isSettingsOpen) {
            return <SettingsPage settings={settings} onSettingsChange={handleSettingsChange} onClose={handleCloseContent} onClearBookmarks={handleClearAllBookmarks} onClearOffline={handleClearAllOffline} onManageSubscription={() => setActiveModal('subscribe')} />;
        }
        if (isProfileOpen) {
            return <ProfilePage user={currentUser} onUserChange={setCurrentUser} settings={settings} onManageSubscription={() => setActiveModal('subscribe')} readingHistory={allArticles.slice(5, 10)} />;
        }
        if (activeInfoPage) {
            const InfoPageComponent = {
                about: AboutPage,
                careers: CareersPage,
                contact: ContactPage,
                advertise: AdvertisePage,
            }[activeInfoPage];
            return InfoPageComponent ? <InfoPageComponent isOpen={true} onClose={() => setActiveInfoPage(null)} /> : null;
        }
        if (isMoviesPage) {
            return <MoviesTVPage onWatchMovie={handleWatchMovie} onWatchTrailer={handleWatchTrailer} />;
        }

        // --- HOMEPAGE / CATEGORY CONTENT ---
        const worldAndPoliticsArticles = allArticles.filter(a => a.category === 'World' || a.category === 'Politics');
        const layout = settings.homepageLayout === 'Dashboard' ? 'grid' : 'default';
        
        const renderCategoryContent = () => {
             switch(currentCategory) {
                case 'World':
                case 'Politics':
                     return (
                        <>
                            <GlobalHighlights articles={filteredArticles} onSummarize={article => openModal('summarize', article)} onExplainSimply={article => openModal('explain', article)} onTextToSpeech={handleOpenTtsModal} onTranslate={article => openModal('translate', article)} onReadMore={handleReadMore} audioState={{ playingArticleId: audioPlayerState?.article.id || null, isGenerating: false }} bookmarkedArticleIds={bookmarkedArticleIds} onToggleBookmark={toggleBookmark} offlineArticleIds={offlineArticleIds} downloadingArticleId={downloadingArticleId} onDownloadArticle={handleDownloadArticle} />
                            <NewsMap articles={worldAndPoliticsArticles} onArticleClick={handleReadMore} />
                        </>
                     );
                case 'Technology':
                    return (
                        <>
                            <GlobalHighlights articles={filteredArticles} onSummarize={article => openModal('summarize', article)} onExplainSimply={article => openModal('explain', article)} onTextToSpeech={handleOpenTtsModal} onTranslate={article => openModal('translate', article)} onReadMore={handleReadMore} audioState={{ playingArticleId: audioPlayerState?.article.id || null, isGenerating: false }} bookmarkedArticleIds={bookmarkedArticleIds} onToggleBookmark={toggleBookmark} offlineArticleIds={offlineArticleIds} downloadingArticleId={downloadingArticleId} onDownloadArticle={handleDownloadArticle} />
                            <InnovationTimeline />
                            <DataDrivenInsights />
                        </>
                    );
                default:
                    return <GlobalHighlights articles={filteredArticles} onSummarize={article => openModal('summarize', article)} onExplainSimply={article => openModal('explain', article)} onTextToSpeech={handleOpenTtsModal} onTranslate={article => openModal('translate', article)} onReadMore={handleReadMore} audioState={{ playingArticleId: audioPlayerState?.article.id || null, isGenerating: false }} bookmarkedArticleIds={bookmarkedArticleIds} onToggleBookmark={toggleBookmark} offlineArticleIds={offlineArticleIds} downloadingArticleId={downloadingArticleId} onDownloadArticle={handleDownloadArticle} layout={layout} />;
            }
        };

        return (
            <>
               {currentCategory === 'For You' && <Hero article={allArticles[0]} onReadMore={() => handleReadMore(allArticles[0])}/>}
               <div className={`${currentCategory === 'For You' ? 'mt-8' : ''}`}>
                   {renderCategoryContent()}
               </div>
                {settings.showMahama360 && currentCategory === 'For You' && <Mahama360 articles={allArticles.slice(7, 10)} />}
                {settings.showNowStreaming && currentCategory === 'For You' && <SponsoredBanners />}
            </>
        )
    };

    return (
        <div className="min-h-screen">
            {isCategoryLoading && <CategoryLoadingOverlay />}
            {activeArticle && <ScrollProgressBar />}
            <Header
                onMenuClick={() => openModal('categoryExplorer')}
                onSearchClick={() => openModal('search')}
                onSettingsClick={handleOpenSettings}
                onProfileClick={handleOpenProfile}
                onLogoClick={handleLogoClick}
                isAuthenticated={isAuthenticated}
                onLoginClick={() => setActiveModal('login')}
                onLogout={handleLogout}
                user={currentUser}
            />

            <main className="pt-20">
                {!activeMovie && (
                    <>
                        {isHomePage && <NewsTicker headlines={allArticles.slice(0, 5).map(a => a.title)} />}
                        <div className="sticky top-20 z-30">
                            <FilterBar categories={categories} currentCategory={currentCategory} currentSubCategory={currentSubCategory} onSelectCategory={handleSelectCategory} onSelectSubCategory={handleSelectSubCategory} onGenerateBriefing={() => openModal('briefing')} subscriptionTier={settings.subscriptionTier} />
                        </div>
                    </>
                )}
                 
                {newArticlesQueue.length > 0 && isHomePage && (
                     <div className="fixed top-40 left-1/2 -translate-x-1/2 z-40">
                         <button onClick={loadNewArticles} className="px-4 py-2 bg-deep-red text-white font-semibold rounded-full shadow-lg animate-bounce">
                             {newArticlesQueue.length} New Article{newArticlesQueue.length > 1 ? 's' : ''}
                         </button>
                     </div>
                )}
                
                <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${activeMovie ? 'max-w-full' : ''}`}>
                    <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                        <div className={`${activeMovie ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
                            {renderMainContent()}
                        </div>

                        {!activeMovie && 
                            <RightAside 
                                trendingArticles={allArticles.slice(1, 6)} 
                                onArticleClick={handleReadMore} 
                                activeArticle={activeArticle} 
                                settings={settings} 
                                onGoPremium={() => setActiveModal('subscribe')} 
                                weatherData={weatherData} 
                                isWeatherLoading={isWeatherLoading}
                                isSettingsOpen={isSettingsOpen}
                                isProfileOpen={isProfileOpen}
                                user={currentUser}
                            />
                        }
                    </div>
                </div>
            </main>

            {isHomePage && <Footer onInfoPageClick={(page) => navigateTo('info', page)} />}
            
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
            <SearchModal isOpen={activeModal === 'search'} onClose={closeModal} articles={allArticles} onArticleSelect={handleReadMore} settings={settings}/>
            <CategoryExplorerPage isOpen={activeModal === 'categoryExplorer'} onClose={closeModal} categories={categories} onCategorySelect={(cat) => handleSelectCategory(cat)} onSubCategorySelect={(sub) => {handleSelectSubCategory(sub); closeModal();}} onBookmarksClick={() => openModal('bookmarks')} onOfflineClick={() => openModal('offline')} onSettingsClick={handleOpenSettings} />
            <BookmarksModal isOpen={activeModal === 'bookmarks'} onClose={closeModal} bookmarkedArticles={bookmarkedArticles} onToggleBookmark={toggleBookmark} onReadArticle={handleReadMore} />
            <OfflineModal isOpen={activeModal === 'offline'} onClose={closeModal} offlineArticles={offlineArticles} onDeleteArticle={handleDeleteOfflineArticle} onReadArticle={handleReadMore}/>
            <LoginModal isOpen={activeModal === 'login'} onClose={closeModal} onLogin={handleLogin} />
            <SubscriptionModal isOpen={activeModal === 'subscribe'} onClose={closeModal} onSubscribe={handleSubscribe} />
            <PaymentModal isOpen={activeModal === 'payment'} onClose={closeModal} onSuccess={handlePaymentSuccess} plan={selectedPlan} />
            <NewsBriefingModal isOpen={activeModal === 'briefing'} onClose={closeModal} settings={settings} articles={allArticles} onPlayBriefing={(briefing) => setAudioPlayerState({ article: briefing })} />
            <LiveConversationModal isOpen={activeModal === 'live'} onClose={closeModal} />
            <TextToSpeechModal isOpen={!!ttsModalArticle} article={ttsModalArticle} settings={settings} onClose={() => setTtsModalArticle(null)} onPlay={(originalArticle, translatedText, voice) => setAudioPlayerState({ article: {...originalArticle, content: translatedText}, voiceOverride: voice })} />
            <TrailerModal isOpen={!!activeTrailer} onClose={() => setActiveTrailer(null)} trailerUrl={activeTrailer} />

            <AudioPlayer state={audioPlayerState} onStateChange={setAudioPlayerState} voice={settings.ttsVoice} />
            {isHomePage && <FloatingActionButton onClick={() => openModal('live')} />}
        </div>
    );
};

export default App;
