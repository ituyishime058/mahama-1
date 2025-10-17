
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

// Constants and Types
import { articles as initialArticles, featuredArticle, tickerHeadlines, categories, trendingArticles, mahama360Articles, podcasts } from './constants';
import type { Article } from './types';

// Components
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import Hero from './components/Hero';
import GlobalHighlights from './components/GlobalHighlights';
import RightAside from './components/RightAside';
import FilterBar from './components/FilterBar';
import LiveStream from './components/LiveStream';
import Mahama360 from './components/Mahama360';
import DataViz from './components/DataViz';
import NewsMap from './components/NewsMap';
import PodcastHub from './components/PodcastHub';
import Footer from './components/Footer';
import AIModal from './components/AIModal';
import SearchModal from './components/SearchModal';
import CategoryMenu from './components/CategoryMenu';
import ArticleModal from './components/ArticleModal';
import BookmarksModal from './components/BookmarksModal';
import OfflineModal from './components/OfflineModal';
import ScrollProgressBar from './components/ScrollProgressBar';

// Utils
import { decode, decodeAudioData } from './utils/audio';
import { getOfflineArticleIds, saveArticleForOffline, getOfflineArticles, deleteOfflineArticle } from './utils/db';

const App: React.FC = () => {
    // UI State
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // Modal States
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
    const [isOfflineOpen, setIsOfflineOpen] = useState(false);
    const [selectedArticleForModal, setSelectedArticleForModal] = useState<Article | null>(null);
    const [aiModalState, setAIModalState] = useState<{ article: Article; mode: 'summary' | 'explanation' } | null>(null);

    // Data & Loading States
    const [summary, setSummary] = useState('');
    const [explanation, setExplanation] = useState('');
    const [relatedArticles, setRelatedArticles] = useState<string[]>([]);
    const [isAILoading, setIsAILoading] = useState(false);
    const [isFetchingRelated, setIsFetchingRelated] = useState(false);
    const [aiError, setAIError] = useState('');
    
    const [searchResults, setSearchResults] = useState<{ text: string; sources: any[] } | null>(null);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
    
    // Audio State
    const [audioState, setAudioState] = useState<{ playingArticleId: number | null; isGenerating: boolean }>({ playingArticleId: null, isGenerating: false });
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

    // Bookmarks State
    const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<number[]>([]);

    // Offline State
    const [offlineArticleIds, setOfflineArticleIds] = useState<number[]>([]);
    const [offlineArticles, setOfflineArticles] = useState<Article[]>([]);
    const [downloadingArticleId, setDownloadingArticleId] = useState<number | null>(null);

    // Podcast State
    const [playingPodcastId, setPlayingPodcastId] = useState<number | null>(null);

    const ai = useRef<GoogleGenAI | null>(null);
    useEffect(() => {
        if(process.env.API_KEY) {
            ai.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
        }
    }, []);

    const allArticles = useMemo(() => [featuredArticle, ...initialArticles, ...trendingArticles, ...mahama360Articles], []);
    
    const fetchOfflineData = useCallback(async () => {
        const ids = await getOfflineArticleIds();
        setOfflineArticleIds(ids);
        if (isOfflineOpen) {
            const articles = await getOfflineArticles();
            setOfflineArticles(articles);
        }
    }, [isOfflineOpen]);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }

        const storedBookmarks = localStorage.getItem('bookmarkedArticles');
        if (storedBookmarks) {
            setBookmarkedArticleIds(JSON.parse(storedBookmarks));
        }

        fetchOfflineData();
    }, [fetchOfflineData]);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }, [isDarkMode]);

    const handleToggleDarkMode = () => setIsDarkMode(!isDarkMode);
    
    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFontSizeChange = (size: 'sm' | 'md' | 'lg') => {
        const root = document.documentElement;
        root.classList.remove('text-sm', 'text-base', 'text-lg');
        if(size === 'sm') root.classList.add('text-sm');
        else if(size === 'lg') root.classList.add('text-lg');
        else root.classList.add('text-base');
    };

    const handleAIFeature = async (article: Article, mode: 'summary' | 'explanation') => {
        if (!ai.current) {
            alert("Gemini API not initialized. Make sure API_KEY is set.");
            return;
        }
        setAIModalState({ article, mode });
        setIsAILoading(true);
        setSummary('');
        setExplanation('');
        setRelatedArticles([]);
        setAIError('');

        try {
            const prompt = mode === 'summary'
                ? `Summarize this article in 3 bullet points: "${article.title}: ${article.content}"`
                : `Explain this article like I'm 15: "${article.title}: ${article.content}"`;

            const response = await ai.current.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            mode === 'summary' ? setSummary(response.text) : setExplanation(response.text);

            setIsFetchingRelated(true);
            const relatedPrompt = `Based on the article "${article.title}", suggest 3 related news headlines.`;
            const relatedResponse = await ai.current.models.generateContent({ model: 'gemini-2.5-flash', contents: relatedPrompt });
            setRelatedArticles(relatedResponse.text.split('\n').map(s => s.replace(/^- /, '')).filter(Boolean));
        } catch (e) {
            console.error(e);
            setAIError('Failed to generate response. Please try again.');
        } finally {
            setIsAILoading(false);
            setIsFetchingRelated(false);
        }
    };
    
    const handleTextToSpeech = useCallback(async (article: Article) => {
        if (!ai.current) {
            alert("Gemini API not initialized. Make sure API_KEY is set.");
            return;
        }

        if (audioSourceRef.current) {
            audioSourceRef.current.stop();
            audioSourceRef.current = null;
            setAudioState({ playingArticleId: null, isGenerating: false });
            return;
        }

        setAudioState({ playingArticleId: article.id, isGenerating: true });
        
        try {
            const textToSpeak = `${article.title}. ${article.excerpt}. ${article.content ?? ''}`;
            const response = await ai.current.models.generateContent({
                model: 'gemini-2.5-flash-preview-tts',
                contents: [{ parts: [{ text: textToSpeak }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
                },
            });

            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
                if (!audioContextRef.current) {
                    // FIX: Cast window to any to allow access to webkitAudioContext for cross-browser compatibility.
                    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
                }
                const audioBuffer = await decodeAudioData(decode(base64Audio), audioContextRef.current, 24000, 1);
                const source = audioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContextRef.current.destination);
                source.start();
                audioSourceRef.current = source;
                setAudioState({ playingArticleId: article.id, isGenerating: false });
                source.onended = () => {
                    if (audioState.playingArticleId === article.id) {
                        setAudioState({ playingArticleId: null, isGenerating: false });
                        audioSourceRef.current = null;
                    }
                };
            }
        } catch (e) {
            console.error(e);
            alert('Failed to generate audio.');
            setAudioState({ playingArticleId: null, isGenerating: false });
        }
    }, [audioState.playingArticleId]);


    const handleSearch = async (query: string) => {
        if (!ai.current) {
            alert("Gemini API not initialized. Make sure API_KEY is set.");
            return;
        }
        if (!query.trim()) return;
        setIsSearchLoading(true);
        setSearchError('');
        setSearchResults(null);
        try {
            const response = await ai.current.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: query,
                config: { tools: [{ googleSearch: {} }] },
            });
            const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
            setSearchResults({ text: response.text, sources });
        } catch (e) {
            console.error(e);
            setSearchError('An error occurred during search. Please try again.');
        } finally {
            setIsSearchLoading(false);
        }
    };
    
    const handleToggleBookmark = (articleId: number) => {
        const newBookmarks = bookmarkedArticleIds.includes(articleId)
            ? bookmarkedArticleIds.filter(id => id !== articleId)
            : [...bookmarkedArticleIds, articleId];
        setBookmarkedArticleIds(newBookmarks);
        localStorage.setItem('bookmarkedArticles', JSON.stringify(newBookmarks));
    };
    
    const handleDownloadArticle = async (article: Article) => {
        setDownloadingArticleId(article.id);
        try {
            await saveArticleForOffline(article);
            await fetchOfflineData();
        } catch (error) {
            console.error("Failed to download article:", error);
            alert("Failed to save article for offline reading.");
        } finally {
            setDownloadingArticleId(null);
        }
    };

    const handleDeleteOfflineArticle = async (articleId: number) => {
        await deleteOfflineArticle(articleId);
        await fetchOfflineData();
    };

    const bookmarkedArticles = allArticles.filter(article => bookmarkedArticleIds.includes(article.id));
    const filteredArticles = selectedCategory === 'All'
        ? initialArticles
        : initialArticles.filter(article => article.category === selectedCategory);
    
    return (
        <div className="bg-slate-100 dark:bg-navy text-slate-900 dark:text-white font-sans selection:bg-gold/30">
            <ScrollProgressBar />
            <Header
                isDarkMode={isDarkMode}
                onSearchClick={() => setIsSearchOpen(true)}
                onMenuClick={() => setIsMenuOpen(true)}
                onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            <NewsTicker headlines={tickerHeadlines} />
            
            <main className="pt-[120px]">
                <Hero article={featuredArticle} onReadMore={() => setSelectedArticleForModal(featuredArticle)} />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <FilterBar categories={categories} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-16">
                            <GlobalHighlights 
                                articles={filteredArticles}
                                onSummarize={(article) => handleAIFeature(article, 'summary')}
                                onExplainSimply={(article) => handleAIFeature(article, 'explanation')}
                                onTextToSpeech={handleTextToSpeech}
                                onReadMore={setSelectedArticleForModal}
                                audioState={audioState}
                                bookmarkedArticleIds={bookmarkedArticleIds}
                                onToggleBookmark={handleToggleBookmark}
                                offlineArticleIds={offlineArticleIds}
                                downloadingArticleId={downloadingArticleId}
                                onDownloadArticle={handleDownloadArticle}
                            />
                            <LiveStream />
                            <Mahama360 articles={mahama360Articles} />
                            <NewsMap articles={allArticles} onArticleClick={setSelectedArticleForModal} />
                            <DataViz />
                            <PodcastHub podcasts={podcasts} playingPodcastId={playingPodcastId} onPlay={setPlayingPodcastId}/>
                        </div>
                        <RightAside trendingArticles={trendingArticles} onArticleClick={setSelectedArticleForModal} />
                    </div>
                </div>
            </main>

            <Footer />

            {/* Modals */}
            <CategoryMenu 
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                categories={categories}
                onCategorySelect={handleSelectCategory}
                isDarkMode={isDarkMode}
                toggleDarkMode={handleToggleDarkMode}
                onFontSizeChange={handleFontSizeChange}
                onBookmarksClick={() => { setIsMenuOpen(false); setIsBookmarksOpen(true); }}
                onOfflineClick={() => { setIsMenuOpen(false); setIsOfflineOpen(true); fetchOfflineData(); }}
            />
            <SearchModal 
                isOpen={isSearchOpen} 
                onClose={() => setIsSearchOpen(false)}
                onSearch={handleSearch}
                results={searchResults}
                isLoading={isSearchLoading}
                error={searchError}
            />
            <AIModal 
                modalState={aiModalState}
                summary={summary}
                explanation={explanation}
                isLoading={isAILoading}
                error={aiError}
                relatedArticles={relatedArticles}
                isFetchingRelated={isFetchingRelated}
                onClose={() => setAIModalState(null)}
            />
            <ArticleModal 
                article={selectedArticleForModal}
                onClose={() => setSelectedArticleForModal(null)}
                onSummarize={(article) => handleAIFeature(article, 'summary')}
                onExplainSimply={(article) => handleAIFeature(article, 'explanation')}
                onTextToSpeech={handleTextToSpeech}
                audioState={audioState}
                isBookmarked={selectedArticleForModal ? bookmarkedArticleIds.includes(selectedArticleForModal.id) : false}
                onToggleBookmark={() => selectedArticleForModal && handleToggleBookmark(selectedArticleForModal.id)}
            />
            <BookmarksModal
                isOpen={isBookmarksOpen}
                onClose={() => setIsBookmarksOpen(false)}
                bookmarkedArticles={bookmarkedArticles}
                onToggleBookmark={handleToggleBookmark}
            />
            <OfflineModal
                isOpen={isOfflineOpen}
                onClose={() => setIsOfflineOpen(false)}
                offlineArticles={offlineArticles}
                onDeleteArticle={handleDeleteOfflineArticle}
                onReadArticle={setSelectedArticleForModal}
            />
        </div>
    );
};

export default App;