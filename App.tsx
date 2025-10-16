import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality, Type } from "@google/genai";
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import Hero from './components/Hero';
import GlobalHighlights from './components/GlobalHighlights';
import NewsMap from './components/NewsMap';
import Mahama360 from './components/Mahama360';
import Footer from './components/Footer';
import AIModal from './components/AIModal';
import FilterBar from './components/FilterBar';
import DataViz from './components/DataViz';
import PodcastHub from './components/PodcastHub';
import SearchModal from './components/SearchModal';
import RightAside from './components/RightAside';
import BookmarksModal from './components/BookmarksModal';
import CategoryMenu from './components/CategoryMenu';
import StockTicker from './components/StockTicker';
import ScrollProgressBar from './components/ScrollProgressBar';
import ArticlePage from './components/ArticlePage'; // New Import
import { articles, tickerHeadlines, categories, featuredArticle, trendingArticles, mahama360Articles, podcasts } from './constants';
import type { Article } from './types';
import { decode, decodeAudioData } from './utils/audio';

// Initialize the Gemini AI model
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const App: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode
  const [allArticles, setAllArticles] = useState(articles);

  // AI Modal State
  const [activeModal, setActiveModal] = useState<{ article: Article; mode: 'summary' | 'explanation' } | null>(null);
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanationError, setExplanationError] = useState('');
  const [relatedArticles, setRelatedArticles] = useState<string[]>([]);
  const [isFetchingRelated, setIsFetchingRelated] = useState(false);

  // Bookmarks State
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<number[]>([]);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  
  // Article Page State
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>([]);
  const [isFetchingTakeaways, setIsFetchingTakeaways] = useState(false);


  // AI Text-to-Speech State
  const [audioState, setAudioState] = useState<{
    playingArticleId: number | null;
    isGenerating: boolean;
    audioContext: AudioContext | null;
    audioSource: AudioBufferSourceNode | null;
  }>({
    playingArticleId: null,
    isGenerating: false,
    audioContext: null,
    audioSource: null,
  });
  
  // Podcast Player State
  const [playingPodcastId, setPlayingPodcastId] = useState<number | null>(null);

  // UI State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  // Search State
  const [searchResults, setSearchResults] = useState<{ text: string; sources: any[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Filtering State
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredArticles = allArticles.filter(article => activeCategory === 'All' || article.category === activeCategory);

  // --- EFFECTS ---

  // Dark mode handler
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem('mahamaNewsBookmarks');
      if (storedBookmarks) {
        setBookmarkedArticleIds(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage", error);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('mahamaNewsBookmarks', JSON.stringify(bookmarkedArticleIds));
  }, [bookmarkedArticleIds]);
  
  // Simulated real-time news feed
  useEffect(() => {
    const interval = setInterval(() => {
      setAllArticles(prevArticles => [...prevArticles].sort(() => 0.5 - Math.random()));
    }, 30000); // Shuffle articles every 30 seconds
    return () => clearInterval(interval);
  }, []);
  
  // Scroll to top when switching to article page
  useEffect(() => {
    if (readingArticle) {
        window.scrollTo(0, 0);
    }
  }, [readingArticle]);

  // --- HANDLER FUNCTIONS ---

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleFontSizeChange = (size: 'sm' | 'md' | 'lg') => {
    const html = document.documentElement;
    html.classList.remove('text-sm', 'text-base', 'text-lg');
    if (size === 'sm') html.classList.add('text-sm');
    else if (size === 'lg') html.classList.add('text-lg');
    else html.classList.add('text-base');
  };

  const handleToggleBookmark = (articleId: number) => {
    setBookmarkedArticleIds(prev =>
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };
  
  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setReadingArticle(null); // Go back to homepage if a category is selected from the menu
    setIsCategoryMenuOpen(false);
  };
  
  const handlePodcastPlay = (podcastId: number) => {
    setPlayingPodcastId(prevId => prevId === podcastId ? null : podcastId);
  }

  const handleReadArticle = (article: Article) => {
    setReadingArticle(article);
  };

  const stopCurrentAudio = useCallback(() => {
    if (audioState.audioSource) {
      audioState.audioSource.stop();
    }
    setAudioState(prev => ({ ...prev, playingArticleId: null, isGenerating: false, audioSource: null }));
  }, [audioState.audioSource]);
  
  const closeModal = () => {
    setActiveModal(null);
    setSummary('');
    setSummaryError('');
    setExplanation('');
    setExplanationError('');
    setRelatedArticles([]);
  };

  const handleGoHome = () => {
    setReadingArticle(null);
    stopCurrentAudio();
  };

  // AI Related Articles Logic
  const fetchRelatedArticles = async (article: Article) => {
    setIsFetchingRelated(true);
    setRelatedArticles([]);
    try {
      const prompt = `Based on the following news article, generate 3 related but distinct news headlines that a reader might also be interested in. Do not repeat the original title. Article Title: "${article.title}". Article Excerpt: "${article.excerpt}"`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headlines: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        },
      });
      const resultJson = JSON.parse(response.text);
      setRelatedArticles(resultJson.headlines || []);
    } catch (error) {
      console.error("Error fetching related articles:", error);
    } finally {
      setIsFetchingRelated(false);
    }
  };
  
  // AI Key Takeaways Logic
  const fetchKeyTakeaways = async (article: Article) => {
    setIsFetchingTakeaways(true);
    setKeyTakeaways([]);
    try {
      const prompt = `Analyze this news article and provide a bulleted list of 3-4 key takeaways. Focus on the most important facts and conclusions. Content: "${article.content || article.excerpt}"`;
       const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              takeaways: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        },
      });
      const resultJson = JSON.parse(response.text);
      setKeyTakeaways(resultJson.takeaways || []);
    } catch (error) {
      console.error("Error fetching key takeaways:", error);
    } finally {
      setIsFetchingTakeaways(false);
    }
  };


  // AI Summarizer Logic
  const handleSummarize = async (article: Article) => {
    setActiveModal({ article, mode: 'summary' });
    setIsSummarizing(true);
    setSummary('');
    setSummaryError('');
    fetchRelatedArticles(article);
    try {
      const prompt = `Summarize this news article content concisely in 2-3 sentences, focusing on the key points. Content: "${article.content || article.excerpt}"`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      setSummary(response.text);
    } catch (error) {
      console.error("Summarization error:", error);
      setSummaryError("Failed to generate summary. Please try again.");
    } finally {
      setIsSummarizing(false);
    }
  };
  
  // AI "Explain Simply" Logic
  const handleExplainSimply = async (article: Article) => {
    setActiveModal({ article, mode: 'explanation' });
    setIsExplaining(true);
    setExplanation('');
    setExplanationError('');
    fetchRelatedArticles(article);
    try {
      const prompt = `Explain the key points of this article like I'm five years old. Be simple, clear, and engaging, using short sentences and easy words. Content: "${article.content || article.excerpt}"`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      setExplanation(response.text);
    } catch (error) {
      console.error("Explanation error:", error);
      setExplanationError("Failed to generate explanation. Please try again.");
    } finally {
      setIsExplaining(false);
    }
  };

  // AI Text-to-Speech Logic
  const handleTextToSpeech = async (article: Article) => {
    if (audioState.playingArticleId === article.id) {
      stopCurrentAudio();
      return;
    }

    stopCurrentAudio();
    setAudioState(prev => ({...prev, isGenerating: true, playingArticleId: article.id}));
    
    try {
      const textToSpeak = `${article.title}. ${article.content || article.excerpt}`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: textToSpeak }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error("No audio data received.");

      const audioContext = audioState.audioContext || new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();

      source.onended = () => {
         setAudioState(prev => prev.playingArticleId === article.id ? { ...prev, playingArticleId: null, audioSource: null } : prev);
      };
      
      setAudioState(prev => ({ ...prev, isGenerating: false, audioContext, audioSource: source }));
      
    } catch (error) {
      console.error("Text-to-speech error:", error);
      stopCurrentAudio();
    }
  };
  
  // AI Search Logic
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsSearching(true);
    setSearchResults(null);
    setSearchError('');
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Based on the latest news and information from today, answer this question: "${query}"`,
        config: {
          tools: [{googleSearch: {}}],
        },
      });
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setSearchResults({ text: response.text, sources });
    } catch (error) {
      console.error("Search error:", error);
      setSearchError("Failed to perform search. Please check your query and try again.");
    } finally {
      setIsSearching(false);
    }
  };

  if (readingArticle) {
    return (
       <div className="bg-slate-100 dark:bg-navy text-slate-800 dark:text-slate-200 font-sans antialiased text-base">
          <Header 
            isDarkMode={isDarkMode} 
            onSearchClick={() => setIsSearchOpen(true)}
            onMenuClick={() => setIsCategoryMenuOpen(true)}
            onLogoClick={handleGoHome}
          />
          <ArticlePage 
            article={readingArticle}
            relatedArticles={allArticles.filter(a => a.category === readingArticle.category && a.id !== readingArticle.id).slice(0, 4)}
            onSummarize={handleSummarize}
            onExplainSimply={handleExplainSimply}
            onTextToSpeech={handleTextToSpeech}
            audioState={{ playingArticleId: audioState.playingArticleId, isGenerating: audioState.isGenerating }}
            isBookmarked={bookmarkedArticleIds.includes(readingArticle.id)}
            onToggleBookmark={() => handleToggleBookmark(readingArticle.id)}
            onFetchKeyTakeaways={fetchKeyTakeaways}
            keyTakeaways={keyTakeaways}
            isFetchingTakeaways={isFetchingTakeaways}
          />
          <Footer />
          {/* Modals that can be triggered from the article page */}
           <AIModal 
              modalState={activeModal}
              summary={summary}
              explanation={explanation}
              isLoading={isSummarizing || isExplaining}
              error={summaryError || explanationError}
              relatedArticles={relatedArticles}
              isFetchingRelated={isFetchingRelated}
              onClose={closeModal}
            />
            <SearchModal 
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onSearch={handleSearch}
              results={searchResults}
              isLoading={isSearching}
              error={searchError}
            />
             <CategoryMenu
              isOpen={isCategoryMenuOpen}
              onClose={() => setIsCategoryMenuOpen(false)}
              categories={categories}
              onCategorySelect={handleCategorySelect}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              onFontSizeChange={handleFontSizeChange}
              onBookmarksClick={() => {
                setIsCategoryMenuOpen(false);
                setIsBookmarksOpen(true);
              }}
            />
             <BookmarksModal
              isOpen={isBookmarksOpen}
              onClose={() => setIsBookmarksOpen(false)}
              bookmarkedArticles={allArticles.filter(article => bookmarkedArticleIds.includes(article.id))}
              onToggleBookmark={handleToggleBookmark}
            />
        </div>
    );
  }

  return (
    <div className="bg-slate-100 dark:bg-navy text-slate-800 dark:text-slate-200 font-sans antialiased text-base">
      <ScrollProgressBar />
      <Header 
        isDarkMode={isDarkMode} 
        onSearchClick={() => setIsSearchOpen(true)}
        onMenuClick={() => setIsCategoryMenuOpen(true)}
        onLogoClick={handleGoHome}
      />
      <NewsTicker headlines={tickerHeadlines} />
      <StockTicker />
      
      <main className="pt-36">
        <Hero article={featuredArticle} onReadMore={() => handleReadArticle(featuredArticle)} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <FilterBar categories={categories} activeCategory={activeCategory} onFilterChange={setActiveCategory} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
               <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
                  {activeCategory === 'All' ? 'Global Highlights' : activeCategory}
               </h2>
               <GlobalHighlights 
                  articles={filteredArticles} 
                  onSummarize={handleSummarize}
                  onExplainSimply={handleExplainSimply}
                  onTextToSpeech={handleTextToSpeech}
                  onReadMore={handleReadArticle}
                  audioState={{ playingArticleId: audioState.playingArticleId, isGenerating: audioState.isGenerating }}
                  bookmarkedArticleIds={bookmarkedArticleIds}
                  onToggleBookmark={handleToggleBookmark}
                />
            </div>
            
            <RightAside trendingArticles={trendingArticles} onArticleClick={handleReadArticle}/>
            
          </div>

          <NewsMap articles={allArticles} onArticleClick={handleReadArticle}/>
          <DataViz />
          <Mahama360 articles={mahama360Articles} />
          <PodcastHub 
            podcasts={podcasts}
            playingPodcastId={playingPodcastId}
            onPlay={handlePodcastPlay}
          />

          <div className="mt-12">
            <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
              Mahama Investigates
            </h2>
             <GlobalHighlights 
                articles={articles.filter(a => a.category === 'Mahama Investigates')} 
                onSummarize={handleSummarize}
                onExplainSimply={handleExplainSimply}
                onTextToSpeech={handleTextToSpeech}
                onReadMore={handleReadArticle}
                audioState={{ playingArticleId: audioState.playingArticleId, isGenerating: audioState.isGenerating }}
                bookmarkedArticleIds={bookmarkedArticleIds}
                onToggleBookmark={handleToggleBookmark}
              />
          </div>

        </div>
      </main>

      <Footer />

      <AIModal 
        modalState={activeModal}
        summary={summary}
        explanation={explanation}
        isLoading={isSummarizing || isExplaining}
        error={summaryError || explanationError}
        relatedArticles={relatedArticles}
        isFetchingRelated={isFetchingRelated}
        onClose={closeModal}
      />
      
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
        results={searchResults}
        isLoading={isSearching}
        error={searchError}
      />
      
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={allArticles.filter(article => bookmarkedArticleIds.includes(article.id))}
        onToggleBookmark={handleToggleBookmark}
      />

      <CategoryMenu
        isOpen={isCategoryMenuOpen}
        onClose={() => setIsCategoryMenuOpen(false)}
        categories={categories}
        onCategorySelect={handleCategorySelect}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onFontSizeChange={handleFontSizeChange}
        onBookmarksClick={() => {
          setIsCategoryMenuOpen(false);
          setIsBookmarksOpen(true);
        }}
      />

    </div>
  );
};

export default App;
