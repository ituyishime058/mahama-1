import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import type { Article, Settings, TimelineEvent, ReadingLens, KeyConcept } from '../types';
import { mockComments, mockArticles } from '../constants';
import { generateTags, factCheckArticle, generateKeyTakeaways, generateArticleTimeline, translateArticle, applyReadingLens, extractKeyConcepts } from '../utils/ai';

import AuthorInfo from './AuthorInfo';
import SocialShare from './SocialShare';
import KeyTakeaways from './KeyTakeaways';
import AITags from './AITags';
import FactCheck from './FactCheck';
import CommentsSection from './CommentsSection';
import ArticleProgressBar from './ArticleProgressBar';
import FloatingActionbar from './FloatingActionbar';
import RelatedArticles from './RelatedArticles';
import ArticleTimeline from './ArticleTimeline';
import TranslateIcon from './icons/TranslateIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import GlossaryPopup from './GlossaryPopup';

interface ArticlePageProps {
  article: Article;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onReadMore: (article: Article) => void;
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
  onTextToSpeech: (article: Article) => void;
  onTranslate: (article: Article) => void;
  onQuiz: (article: Article) => void;
  onCounterpoint: (article: Article) => void;
  onBehindTheNews: (article: Article) => void;
  onExpertAnalysis: (article: Article) => void;
  onAskAuthor: (article: Article) => void;
  settings: Settings;
  onPremiumClick: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ 
    article, 
    onClose, 
    isBookmarked, 
    onToggleBookmark,
    onReadMore,
    onSummarize,
    onExplainSimply,
    onTextToSpeech,
    onTranslate,
    onQuiz,
    onCounterpoint,
    onBehindTheNews,
    onExpertAnalysis,
    onAskAuthor,
    settings,
    onPremiumClick,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [factCheckResult, setFactCheckResult] = useState<{ status: string; summary: string } | null>(null);
  const [factCheckLoading, setFactCheckLoading] = useState(true);
  const [isZenMode, setIsZenMode] = useState(false);
  const [aiTakeaways, setAiTakeaways] = useState<string[]>([]);
  const [takeawaysLoading, setTakeawaysLoading] = useState(true);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [timelineLoading, setTimelineLoading] = useState(true);
  
  // State for auto-translation
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);

  // State for AI Reading Lens
  const [activeLens, setActiveLens] = useState<ReadingLens>('None');
  const [modifiedContent, setModifiedContent] = useState<string | null>(null);
  const [isModifyingContent, setIsModifyingContent] = useState(false);

  // State for Interactive Glossary
  const [keyConcepts, setKeyConcepts] = useState<KeyConcept[]>([]);
  const [glossaryTerm, setGlossaryTerm] = useState<{ term: string; definition: string; position: { top: number; left: number } } | null>(null);
  
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset state and scroll to top when article changes
    window.scrollTo(0, 0);
    setTags([]);
    setFactCheckResult(null);
    setAiTakeaways([]);
    setTimelineEvents([]);
    setKeyConcepts([]);
    setGlossaryTerm(null);
    setTranslatedContent(null);
    setShowOriginal(true);
    setIsTranslating(false);
    setActiveLens('None');
    setModifiedContent(null);
    setIsModifyingContent(false);

    setTagsLoading(true);
    setFactCheckLoading(true);
    setTakeawaysLoading(true);
    setTimelineLoading(true);

    // Auto-translate if setting is enabled
    if (settings.autoTranslate && settings.preferredLanguage !== 'English') {
        const doTranslate = async () => {
            setIsTranslating(true);
            setShowOriginal(false);
            try {
                const translation = await translateArticle(article.content, settings.preferredLanguage, settings);
                setTranslatedContent(translation);
            } catch (e) {
                console.error("Auto-translation failed:", e);
                setShowOriginal(true); // Revert to original on error
            } finally {
                setIsTranslating(false);
            }
        };
        doTranslate();
    }

    const fetchAIData = async () => {
      const tagsPromise = generateTags(article, settings);
      const factCheckPromise = factCheckArticle(article, settings);
      const takeawaysPromise = generateKeyTakeaways(article, settings);
      const conceptsPromise = extractKeyConcepts(article, settings);
      
      const [tagsResult, factCheckData, takeawaysResult, conceptsResult] = await Promise.allSettled([tagsPromise, factCheckPromise, takeawaysPromise, conceptsPromise]);

      if (tagsResult.status === 'fulfilled') setTags(tagsResult.value);
      if (factCheckData.status === 'fulfilled') setFactCheckResult(factCheckData.value);
      if (takeawaysResult.status === 'fulfilled') setAiTakeaways(takeawaysResult.value);
      if (conceptsResult.status === 'fulfilled') setKeyConcepts(conceptsResult.value);
      
      setTagsLoading(false);
      setFactCheckLoading(false);
      setTakeawaysLoading(false);

      if (article.hasTimeline) {
          const timelinePromise = generateArticleTimeline(article, settings);
          const timelineResult = await Promise.resolve(timelinePromise);
          setTimelineEvents(timelineResult);
          setTimelineLoading(false);
      } else {
          setTimelineLoading(false);
      }
    };

    fetchAIData();
  }, [article, settings]);

  useEffect(() => {
    if (isZenMode) {
        setActiveLens(settings.aiReadingLens);
    } else {
        setActiveLens('None');
    }
  }, [isZenMode, settings.aiReadingLens]);

  useEffect(() => {
    const modifyContent = async () => {
        if (activeLens === 'None') {
            setModifiedContent(null);
            return;
        }
        setIsModifyingContent(true);
        try {
            const result = await applyReadingLens(article.content, activeLens, settings);
            setModifiedContent(result);
        } catch (e) {
            console.error("Failed to apply reading lens", e);
            // Optionally show an error to the user
        } finally {
            setIsModifyingContent(false);
        }
    };
    modifyContent();
  }, [activeLens, article.content, settings]);
  
  const contentToDisplay = modifiedContent ?? (showOriginal || !translatedContent ? article.content : translatedContent);

  const processedContent = useMemo(() => {
    if (!settings.interactiveGlossary || keyConcepts.length === 0) {
      return contentToDisplay;
    }
    const terms = keyConcepts.map(c => c.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).sort((a, b) => b.length - a.length);
    const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
    
    return contentToDisplay.replace(regex, (match) => {
      const originalTerm = keyConcepts.find(c => c.term.toLowerCase() === match.toLowerCase())?.term || match;
      return `<button class="interactive-term" data-term="${originalTerm}">${match}</button>`;
    });
  }, [contentToDisplay, keyConcepts, settings.interactiveGlossary]);

  const handleArticleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('interactive-term')) {
      e.preventDefault();
      const term = target.dataset.term;
      if (term) {
        const concept = keyConcepts.find(c => c.term === term);
        if (concept) {
          const rect = target.getBoundingClientRect();
          setGlossaryTerm({
            term: concept.term,
            definition: concept.description,
            position: {
              top: rect.bottom + window.scrollY + 8,
              left: rect.left + window.scrollX,
            }
          });
        }
      }
    }
  }, [keyConcepts]);
  
  return (
    <div ref={articleRef} className={`transition-colors duration-300 ${isZenMode ? 'bg-slate-50 dark:bg-gray-900' : 'bg-transparent'}`}>
        <style>{`
          .interactive-term {
            color: #b91c1c; /* deep-red */
            font-weight: 600;
            border-bottom: 2px dotted #d97706; /* gold */
            cursor: pointer;
            background: transparent;
            padding: 0;
            display: inline;
            border-radius: 0;
          }
          .dark .interactive-term {
            color: #d97706; /* gold */
            border-bottom-color: #b91c1c; /* deep-red */
          }
        `}</style>
        <ArticleProgressBar targetRef={articleRef} />
        <button onClick={onClose} className="mb-4 text-sm font-semibold text-deep-red dark:text-gold hover:underline">
            &larr; Back to Home
        </button>
        <div className={`transition-all duration-300 ${isZenMode ? '' : 'max-w-4xl'}`}>
            <div className="relative">
                <SocialShare 
                    article={article}
                    isBookmarked={isBookmarked}
                    onToggleBookmark={() => onToggleBookmark(article.id)}
                    isZenMode={isZenMode}
                    onToggleZenMode={() => setIsZenMode(!isZenMode)}
                />
                
                <main className={!isZenMode ? 'lg:pl-24' : ''}>
                    <p className="text-deep-red dark:text-gold font-semibold uppercase tracking-wider">{article.category}</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white my-4 !leading-tight">{article.title}</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">{article.excerpt}</p>
                    
                    <AuthorInfo author={article.author} date={article.date} content={article.content} />

                    {translatedContent && (
                        <div className="my-4 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-md flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                {isTranslating ? <>
                                    <LoadingSpinner/> Translating to {settings.preferredLanguage}...
                                </> : <>
                                    <TranslateIcon className="w-5 h-5"/> Translated to {settings.preferredLanguage}
                                </>}
                            </div>
                            <button onClick={() => setShowOriginal(!showOriginal)} className="font-semibold text-sm text-deep-red dark:text-gold hover:underline">
                                {showOriginal ? 'Show Translation' : 'Show Original'}
                            </button>
                        </div>
                    )}

                    {!isZenMode && (
                         <figure className="my-8">
                            <img src={article.imageUrl} alt={article.title} className="w-full h-auto rounded-lg shadow-lg"/>
                            <figcaption className="text-center text-sm text-slate-500 mt-2">A representative image for the article.</figcaption>
                        </figure>
                    )}
                   
                    <KeyTakeaways takeaways={aiTakeaways} isLoading={takeawaysLoading} />
                    <FactCheck result={factCheckResult} isLoading={factCheckLoading} />
                    
                     {isModifyingContent && (
                        <div className="flex justify-center items-center my-8 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                            <LoadingSpinner className="w-6 h-6 mr-3"/>
                            <span>Applying AI Reading Lens...</span>
                        </div>
                    )}
                    <div onClick={handleArticleClick}>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-800 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: processedContent.replace(/\n/g, '<br />') }} />
                    </div>
                    
                    {article.hasTimeline && <ArticleTimeline events={timelineEvents} isLoading={timelineLoading} />}

                    <AITags tags={tags} isLoading={tagsLoading} />
                </main>

                <CommentsSection initialComments={mockComments} />
                
                <RelatedArticles currentArticle={article} allArticles={mockArticles} onArticleClick={onReadMore} settings={settings} />
            </div>
        </div>
        {glossaryTerm && (
          <GlossaryPopup 
            term={glossaryTerm.term}
            definition={glossaryTerm.definition}
            position={glossaryTerm.position}
            onClose={() => setGlossaryTerm(null)}
          />
        )}
        <FloatingActionbar
            article={article}
            onSummarize={onSummarize}
            onExplainSimply={onExplainSimply}
            onTextToSpeech={onTextToSpeech}
            onTranslate={onTranslate}
            onQuiz={onQuiz}
            onCounterpoint={onCounterpoint}
            onBehindTheNews={onBehindTheNews}
            onExpertAnalysis={onExpertAnalysis}
            onAskAuthor={onAskAuthor}
            showCounterpoint={settings.showCounterpoint}
            isZenMode={isZenMode}
            activeLens={activeLens}
            onSetLens={setActiveLens}
            subscriptionTier={settings.subscriptionTier}
            onPremiumClick={onPremiumClick}
        />
    </div>
  );
};

export default ArticlePage;