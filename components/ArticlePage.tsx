import React, { useState, useEffect, useRef } from 'react';
import type { Article } from '../types';

// Components
import SocialShare from './SocialShare';
import KeyTakeaways from './KeyTakeaways';
import CommentsSection from './CommentsSection';
import TrendingNews from './TrendingNews';
import AuthorInfo from './AuthorInfo';
import ArticleProgressBar from './ArticleProgressBar';
import AITags from './AITags';
import FactCheck from './FactCheck';
import SummarizerModal from './SummarizerModal';
import ExplainSimplyModal from './ExplainSimplyModal';
import TextToSpeechPlayer from './TextToSpeechPlayer';

// Icons
import SummarizeIcon from './icons/SummarizeIcon';
import ChildIcon from './icons/ChildIcon';
import ReadAloudIcon from './icons/ReadAloudIcon';
import LoadingSpinner from './icons/LoadingSpinner';

// AI Utils
import { summarizeArticle, explainSimply, generateTextToSpeech, generateAITags, factCheckArticle } from '../utils/ai';
import SentimentIndicator from './SentimentIndicator';

interface ArticlePageProps {
  article: Article;
  allArticles: Article[];
  trendingArticles: Article[];
  onArticleClick: (article: Article) => void;
  bookmarkedArticleIds: number[];
  onToggleBookmark: (articleId: number) => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ 
  article,
  trendingArticles,
  onArticleClick,
  bookmarkedArticleIds,
  onToggleBookmark,
}) => {
  const [isZenMode, setIsZenMode] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  // AI Feature State
  const [isSummarizerOpen, setIsSummarizerOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');
  
  const [isExplainSimplyOpen, setIsExplainSimplyOpen] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [isExplainSimplyLoading, setIsExplainSimplyLoading] = useState(false);
  const [explainSimplyError, setExplainSimplyError] = useState('');

  const [ttsAudio, setTtsAudio] = useState<string | null>(null);
  const [isTtsGenerating, setIsTtsGenerating] = useState(false);
  
  const [aiTags, setAiTags] = useState<string[]>([]);
  const [areAiTagsLoading, setAreAiTagsLoading] = useState(true);

  const [factCheckResult, setFactCheckResult] = useState<{status: string, summary: string} | null>(null);
  const [isFactCheckLoading, setIsFactCheckLoading] = useState(true);

  // Reset state when article changes
  useEffect(() => {
    setIsZenMode(false);
    setAiTags([]);
    setFactCheckResult(null);
    setAreAiTagsLoading(true);
    setIsFactCheckLoading(true);

    generateAITags(article).then(tags => {
        setAiTags(tags);
        setAreAiTagsLoading(false);
    });
    
    factCheckArticle(article).then(result => {
        setFactCheckResult(result);
        setIsFactCheckLoading(false);
    });

  }, [article]);

  const handleSummarize = async () => {
    setIsSummarizerOpen(true);
    setIsSummaryLoading(true);
    setSummaryError('');
    try {
      const result = await summarizeArticle(article);
      setSummary(result);
    } catch (e) {
      setSummaryError('Failed to generate summary.');
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleExplainSimply = async () => {
    setIsExplainSimplyOpen(true);
    setIsExplainSimplyLoading(true);
    setExplainSimplyError('');
    try {
      const result = await explainSimply(article);
      setExplanation(result);
    } catch (e) {
      setExplainSimplyError('Failed to generate explanation.');
    } finally {
      setIsExplainSimplyLoading(false);
    }
  };

  const handleTextToSpeech = async () => {
    setIsTtsGenerating(true);
    const textToRead = `${article.title}. ${article.content}`;
    const audio = await generateTextToSpeech(textToRead.substring(0, 4096), 'Zephyr'); // Limiting text length for safety
    setTtsAudio(audio);
    setIsTtsGenerating(false);
  };
  
  const isBookmarked = bookmarkedArticleIds.includes(article.id);
  const handleToggleBookmark = () => onToggleBookmark(article.id);
  
  return (
    <>
      <ArticleProgressBar targetRef={articleRef} />
      <div ref={articleRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          
          <SocialShare 
            article={article} 
            isBookmarked={isBookmarked}
            onToggleBookmark={handleToggleBookmark}
            isZenMode={isZenMode}
            onToggleZenMode={() => setIsZenMode(!isZenMode)}
          />

          <article className={`lg:col-span-8 lg:col-start-3 transition-all duration-300 ${isZenMode ? 'lg:col-span-12 lg:col-start-1' : ''}`}>
            {/* Header */}
            <p className="text-gold font-semibold uppercase tracking-widest mb-2">{article.category}</p>
            <h1 className="text-3xl md:text-5xl font-extrabold !leading-tight tracking-tighter mb-4 text-slate-900 dark:text-white">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <span>By {article.author}</span>
                <span className="hidden md:inline">&bull;</span>
                <span>{article.date}</span>
                <span className="hidden md:inline">&bull;</span>
                <span>{article.readingTime} min read</span>
                {article.sentiment && <SentimentIndicator sentiment={article.sentiment} />}
            </div>

            {/* AI Action Bar */}
            <div className="flex flex-wrap gap-2 mb-8 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                <button onClick={handleSummarize} className="flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <SummarizeIcon className="w-5 h-5"/> AI Summary
                </button>
                <button onClick={handleExplainSimply} className="flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <ChildIcon className="w-5 h-5"/> Explain Simply
                </button>
                <button onClick={handleTextToSpeech} disabled={isTtsGenerating} className="flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50">
                    {isTtsGenerating ? <LoadingSpinner/> : <ReadAloudIcon className="w-5 h-5"/>} Read Aloud
                </button>
            </div>
            
            <img src={article.imageUrl} alt={article.title} className="w-full rounded-lg shadow-lg mb-8" />
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead">{article.excerpt}</p>
              
              <FactCheck result={article.factCheck || factCheckResult} isLoading={isFactCheckLoading} />
              
              {article.keyTakeaways && <KeyTakeaways takeaways={article.keyTakeaways} />}

              <AITags tags={aiTags} isLoading={areAiTagsLoading} />
              
              {article.content?.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <AuthorInfo author={article.author} date={article.date} />
            
            <CommentsSection initialComments={article.comments || []} />
          </article>
          
          <div className={`lg:col-span-3 transition-all duration-300 ${isZenMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="sticky top-28 space-y-8">
              <TrendingNews articles={trendingArticles} onArticleClick={onArticleClick} />
            </div>
          </div>
        </div>
      </div>

      {isSummarizerOpen && (
          <SummarizerModal 
            article={article}
            summary={summary}
            isLoading={isSummaryLoading}
            error={summaryError}
            onClose={() => setIsSummarizerOpen(false)}
          />
      )}
       {isExplainSimplyOpen && (
          <ExplainSimplyModal 
            article={article}
            explanation={explanation}
            isLoading={isExplainSimplyLoading}
            error={explainSimplyError}
            onClose={() => setIsExplainSimplyOpen(false)}
          />
      )}
       {(ttsAudio || isTtsGenerating) && (
        <TextToSpeechPlayer 
            audioBase64={ttsAudio}
            isGenerating={isTtsGenerating}
            onClose={() => setTtsAudio(null)}
        />
       )}
    </>
  );
};

export default ArticlePage;
