import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { mockArticles, hiddenArticles, mockPodcasts, categories, stockData, mockCurrentUser } from './constants';
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
import LiveStream from './components/LiveStream';
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
import InfoPage from './components/InfoPage';
import ProfilePage from './components/ProfilePage';


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

    // Modal states
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalArticle, setModalArticle] = useState<Article | null>(null);
    const [ttsModalArticle, setTtsModalArticle] = useState<Article | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null);


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
        if ((aiModals.includes(modal) || modal === 'settings') && !isAuthenticated) {
            setActiveModal('login');
            return;
        }

        // Handle settings page separately as it's a full-page overlay now
        if (modal === 'settings') {
            setIsSettingsOpen(true);
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

    const handleReadMore = (article: Article) => {
        setActiveArticle(article);
        setActiveMovie(null);
        setActiveModal(null);
        setIsSettingsOpen(false);
        setIsMoviesPage(false);
    };
    
    const handleWatchMovie = (movie: StreamingContent) => {
        setActiveMovie(movie);
        setActiveArticle(null);
        setActiveModal(null);
        setIsSettingsOpen(false);
        setIsMoviesPage(false);
    };

    const handleCloseContent = () => {
        setActiveArticle(null);
        setActiveMovie(null);
        setIsSettingsOpen(false);
        setIsProfileOpen(false);
        setIsMoviesPage(false);
        setCurrentCategory('For You');
        setCurrentSubCategory(null);
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

    const handlePlayBriefing = (briefingArticle: Article) => {
        setAudioPlayerState({ article: briefingArticle });
    };

    const handlePlayTranslatedAudio = (originalArticle: Article, translatedText: string, voice: AiTtsVoice) => {
        const translatedArticle: Article = {
            ...originalArticle,
            id: originalArticle.id + Math.random(), // make it unique to retrigger useEffect in player
            content: translatedText,
            title: `(Translated) ${originalArticle.title}`
        };
        setAudioPlayerState({ article: translatedArticle, voiceOverride: voice });
    };

    const handleSubscribe = (plan: 'Free' | 'Premium', priceDetails: { name: string, price: string }) => {
        if (plan === 'Premium') {
            setSelectedPlan(priceDetails);
            closeModal();
            openModal('payment');
        } else {
            closeModal();
        }
    };

    const handlePaymentSuccess = () => {
        handleSettingsChange({...settings, subscriptionTier: 'Premium' });
        if (!isAuthenticated) setIsAuthenticated(true);
        closeModal();
    };

    const filteredArticles = useMemo(() => {
        if (currentCategory === 'All' || currentCategory === 'For You') {
            return allArticles;
        }
        
        let articles = allArticles.filter(a => a.category === currentCategory);

        if (currentSubCategory) {
            articles = articles.filter(a => 
                (a.tags && a.tags.some(tag => tag.toLowerCase() === currentSubCategory.toLowerCase())) ||
                a.title.toLowerCase().includes(currentSubCategory.toLowerCase()) || 
                a.excerpt.toLowerCase().includes(currentSubCategory.toLowerCase())
            );
        }
        return articles;
    }, [currentCategory, currentSubCategory, allArticles]);

    const handleSelectCategory = (category: string) => {
        if (category === "Movies & TV") {
            setIsMoviesPage(true);
            setActiveArticle(null);
            setActiveMovie(null);
        } else {
            setIsMoviesPage(false);
        }
        setCurrentCategory(category);
        setCurrentSubCategory(null);
        handleCloseContent();
        closeModal(); // Close category explorer on selection
    };

    const handleSelectSubCategory = (subCategory: string) => {
        setCurrentSubCategory(subCategory);
        closeModal(); // Close category explorer on selection
    };
    
    const isDashboard = settings.homepageLayout === 'Dashboard';

    const renderHomePage = () => (
        <>
            {!isDashboard && <Hero article={allArticles[0]} onReadMore={() => handleReadMore(allArticles[0])} />}
            
            <div className="sticky top-20 z-30">
                <NewsTicker headlines={stockData.map(s => `${s.symbol} ${s.price.toFixed(2)} ${s.change.startsWith('+') ? '▲' : '▼'}`)} />
                <FilterBar 
                    categories={categories} 
                    currentCategory={currentCategory} 
                    currentSubCategory={currentSubCategory}
                    onSelectCategory={handleSelectCategory}
                    onSelectSubCategory={handleSelectSubCategory}
                    onGenerateBriefing={() => openModal('briefing')}
                    subscriptionTier={settings.subscriptionTier}
                />
            </div>
             <SponsoredBanners />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {newArticlesQueue.length > 0 && (
                    <div className="-mt-4 mb-8">
                        <button 
                            onClick={loadNewArticles}
                            className="w-full text-center py-3 bg-deep-red/90 hover:bg-deep-red text-white font-bold rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] animate-pulse"
                        >
                            Show {newArticlesQueue.length} New Article{newArticlesQueue.length > 1 ? 's' : ''}
                        </button>
                    </div>
                )}
                {isMoviesPage ? (
                    <MoviesTVPage onWatchMovie={handleWatchMovie} />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {isDashboard && <h1 className="text-3xl font-extrabold mb-2">Your Dashboard</h1>}
                            <GlobalHighlights
                                articles={filteredArticles}
                                onSummarize={(a) => openModal('summarize', a)}
                                onExplainSimply={(a) => openModal('explain', a)}
                                onTextToSpeech={handleOpenTtsModal}
                                onTranslate={handleOpenTtsModal}
                                onReadMore={handleReadMore}
                                audioState={{playingArticleId: audioPlayerState?.article.id ?? null, isGenerating: false}}
                                bookmarkedArticleIds={bookmarkedArticleIds}
                                onToggleBookmark={toggleBookmark}
                                offlineArticleIds={offlineArticleIds}
                                downloadingArticleId={downloadingArticleId}
                                onDownloadArticle={handleDownloadArticle}
                                layout={isDashboard ? 'grid' : 'default'}
                            />
                            <LiveStream />
                            {settings.showMahama360 && <Mahama360 articles={allArticles.slice(2, 5)} />}
                            {settings.showNewsMap && <NewsMap articles={allArticles} onArticleClick={handleReadMore} />}
                            {settings.showDataInsights && <DataDrivenInsights />}
                            <PodcastHub podcasts={mockPodcasts} />
                            {settings.showInnovationTimelines && <InnovationTimeline />}
                        </div>
                        <RightAside
                            trendingArticles={allArticles.slice(5, 10)}
                            onArticleClick={handleReadMore}
                            activeArticle={null}
                            settings={settings}
                            onGoPremium={() => openModal('subscribe')}
                            weatherData={weatherData}
                            isWeatherLoading={isWeatherLoading}
                        />
                    </div>
                )}
            </div>
        </>
    );

    const renderContentPage = () => (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {activeArticle && (
                        <ArticlePage
                            article={activeArticle}
                            onClose={handleCloseContent}
                            isBookmarked={bookmarkedArticleIds.includes(activeArticle.id)}
                            onToggleBookmark={toggleBookmark}
                            onReadMore={handleReadMore}
                            onSummarize={(a) => openModal('summarize', a)}
                            onExplainSimply={(a) => openModal('explain', a)}
                            onTextToSpeech={handleOpenTtsModal}
                            onTranslate={handleOpenTtsModal}
                            onQuiz={(a) => openModal('quiz', a)}
                            onCounterpoint={(a) => openModal('counterpoint', a)}
                            onBehindTheNews={(a) => openModal('behindTheNews', a)}
                            onExpertAnalysis={(a) => openModal('expertAnalysis', a)}
                            onAskAuthor={(a) => openModal('askAuthor', a)}
                            onFactCheckPage={(a) => openModal('factCheckPage', a)}
                            onDeepDive={(a) => openModal('deepDive', a)}
                            onInfographic={(a) => openModal('infographic', a)}
                            settings={settings}
                            onPremiumClick={() => openModal('subscribe')}
                        />
                    )}
                    {activeMovie && (
                        <MoviePlayerPage movie={activeMovie} onClose={handleCloseContent} onWatchMovie={handleWatchMovie} />
                    )}
                </div>
                <RightAside 
                    trendingArticles={allArticles.slice(5, 10)}
                    onArticleClick={handleReadMore}
                    activeArticle={activeArticle}
                    settings={settings}
                    onGoPremium={() => openModal('subscribe')}
                    weatherData={weatherData}
                    isWeatherLoading={isWeatherLoading}
                />
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50 dark:bg-navy text-slate-800 dark:text-slate-200 min-h-screen transition-colors duration-300">
            <Header
                onMenuClick={() => openModal('menu')}
                onSearchClick={() => openModal('search')}
                onSettingsClick={() => openModal('settings')}
                onProfileClick={() => setIsProfileOpen(true)}
                onLogoClick={handleCloseContent}
                isAuthenticated={isAuthenticated}
                onLoginClick={() => openModal('login')}
                onLogout={() => setIsAuthenticated(false)}
                user={currentUser}
            />
            
            <main className="pt-20">
                {activeArticle || activeMovie ? renderContentPage() : renderHomePage()}
            </main>
            
            <Footer onInfoPageClick={setActiveInfoPage} />

            {isAuthenticated && <FloatingActionButton onClick={() => openModal('live')} />}
            
            <ScrollProgressBar />
            
            {/* Full-screen overlays */}
            {isSettingsOpen && (
                 <SettingsPage 
                    settings={settings} 
                    onSettingsChange={handleSettingsChange} 
                    onClose={() => setIsSettingsOpen(false)}
                    onClearBookmarks={() => { setBookmarkedArticleIds([]); localStorage.removeItem('mahamaNewsBookmarks'); }} 
                    onClearOffline={async () => { await clearAllOfflineArticles(); setOfflineArticleIds([]); setOfflineArticles([]); }} 
                    onManageSubscription={() => openModal('subscribe')}
                />
            )}

            {isProfileOpen && (
                <ProfilePage
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                    user={currentUser}
                    onUserChange={setCurrentUser}
                    settings={settings}
                    onManageSubscription={() => openModal('subscribe')}
                    readingHistory={allArticles.slice(0, 5)}
                />
            )}
            
            {activeInfoPage === 'about' && <InfoPage isOpen={true} title="About Us" onClose={() => setActiveInfoPage(null)}><p>Mahama News Hub is a global news organization dedicated to delivering fast, accurate, and insightful reporting. We leverage cutting-edge technology to bring you closer to the stories that shape our world.</p></InfoPage>}
            {activeInfoPage === 'careers' && <InfoPage isOpen={true} title="Careers" onClose={() => setActiveInfoPage(null)}><p>Join our team of world-class journalists, engineers, and storytellers. Explore open positions and help us build the future of news.</p></InfoPage>}
            {activeInfoPage === 'contact' && <InfoPage isOpen={true} title="Contact Us" onClose={() => setActiveInfoPage(null)}><p>For general inquiries, please reach out to contact@mahamanews.com. For press inquiries, contact press@mahamanews.com.</p></InfoPage>}
            {activeInfoPage === 'advertise' && <InfoPage isOpen={true} title="Advertise" onClose={() => setActiveInfoPage(null)}><p>Partner with Mahama News Hub to reach a global audience of engaged and informed readers. Contact our sales team at advertise@mahamanews.com to learn more about our advertising solutions.</p></InfoPage>}


            {/* Modals */}
            <SummarizerModal isOpen={activeModal === 'summarize'} onClose={closeModal} article={modalArticle} settings={settings} />
            <ExplainSimplyModal isOpen={activeModal === 'explain'} onClose={closeModal} article={modalArticle} settings={settings} />
            <QuizModal isOpen={activeModal === 'quiz'} onClose={closeModal} article={modalArticle} settings={settings} />
            <CounterpointModal isOpen={activeModal === 'counterpoint'} onClose={closeModal} article={modalArticle} settings={settings} />
            <BehindTheNewsModal isOpen={activeModal === 'behindTheNews'} onClose={closeModal} article={modalArticle} settings={settings} />
            <ExpertAnalysisModal isOpen={activeModal === 'expertAnalysis'} onClose={closeModal} article={modalArticle} settings={settings} />
            <AskAuthorModal isOpen={activeModal === 'askAuthor'} onClose={closeModal} article={modalArticle} settings={settings} />
            <NewsBriefingModal isOpen={activeModal === 'briefing'} onClose={closeModal} settings={settings} articles={allArticles} onPlayBriefing={handlePlayBriefing} />
            <FactCheckPageModal isOpen={activeModal === 'factCheckPage'} onClose={closeModal} settings={settings} pageContent={modalArticle?.content || ''} />
            <DeepDiveModal isOpen={activeModal === 'deepDive'} onClose={closeModal} article={modalArticle} settings={settings} />
            <InfographicModal isOpen={activeModal === 'infographic'} onClose={closeModal} article={modalArticle} settings={settings} />
            
            <SearchModal isOpen={activeModal === 'search'} onClose={closeModal} articles={allArticles} onArticleSelect={handleReadMore} />
            <LoginModal isOpen={activeModal === 'login'} onClose={closeModal} onLogin={() => { setIsAuthenticated(true); closeModal(); }} />
            <SubscriptionModal isOpen={activeModal === 'subscribe'} onClose={closeModal} onSubscribe={handleSubscribe} />
            <PaymentModal isOpen={activeModal === 'payment'} onClose={closeModal} onSuccess={handlePaymentSuccess} plan={selectedPlan} />
            <LiveConversationModal isOpen={activeModal === 'live'} onClose={closeModal} />
            
            <CategoryExplorerPage isOpen={activeModal === 'menu'} onClose={closeModal} categories={categories} onCategorySelect={handleSelectCategory} onSubCategorySelect={handleSelectSubCategory} onBookmarksClick={() => openModal('bookmarks')} onOfflineClick={() => openModal('offline')} onSettingsClick={() => { closeModal(); openModal('settings'); }} />
            <BookmarksModal isOpen={activeModal === 'bookmarks'} onClose={closeModal} bookmarkedArticles={bookmarkedArticles} onToggleBookmark={toggleBookmark} onReadArticle={handleReadMore} />
            <OfflineModal isOpen={activeModal === 'offline'} onClose={closeModal} offlineArticles={offlineArticles} onDeleteArticle={handleDeleteOfflineArticle} onReadArticle={handleReadMore} />
            
            <TextToSpeechModal 
                isOpen={!!ttsModalArticle}
                article={ttsModalArticle}
                settings={settings}
                onClose={() => setTtsModalArticle(null)}
                onPlay={handlePlayTranslatedAudio}
            />

            <AudioPlayer state={audioPlayerState} onStateChange={setAudioPlayerState} voice={settings.ttsVoice} />
        </div>
    );
};

export default App;