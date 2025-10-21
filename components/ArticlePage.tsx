import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import type { Article, Settings, TimelineEvent, ReadingLens, KeyConcept, CommunityHighlight } from '../types';
import { mockComments, mockArticles } from '../constants';
import { applyReadingLens } from '../utils/ai';

import AuthorInfo from './AuthorInfo';
import ContentGutter from './ContentGutter';
import KeyTakeaways from './KeyTakeaways';
import AITags from './AITags';
import FactCheck from './FactCheck';
import CommentsSection from './CommentsSection';
import FloatingActionbar from './FloatingActionbar';
import RelatedArticles from './RelatedArticles';
import LoadingSpinner from './icons/LoadingSpinner';
import GlossaryPopup from './GlossaryPopup';
import CommunityHighlights from './CommunityHighlights';
import PullQuote from './PullQuote';
import ArticleTimeline from './ArticleTimeline';
import ArticleHeader from './ArticleHeader';


interface ArticlePageProps {
  article: Article;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onReadMore: (article: Article) => void;
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
  onTextToSpeech: (article: Article) => void;
  onQuiz: (article: Article) => void;
  onCounterpoint: (article: Article) => void;
  onBehindTheNews: (article: Article) => void;
  onExpertAnalysis: (article: Article) => void;
  onAskAuthor: (article: Article) => void;
  onFactCheckPage: (article: Article) => void;
  onDeepDive: (article: Article) => void;
  onInfographic: (article: Article) => void;
  settings: Settings;
  onPremiumClick: () => void;
  keyConcepts: KeyConcept[];
  timelineEvents: TimelineEvent[];
  timelineLoading: boolean;
  pullQuotes: string[];
  pullQuotesLoading: boolean;
  tags: string[];
  tagsLoading: boolean;
  factCheckResult: { status: string; summary: string } | null;
  factCheckLoading: boolean;
  aiTakeaways: string[];
  takeawaysLoading: boolean;
  communityHighlights: CommunityHighlight[];
  highlightsLoading: boolean;
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
    onQuiz,
    onCounterpoint,
    onBehindTheNews,
    onExpertAnalysis,
    onAskAuthor,
    onFactCheckPage,
    onDeepDive,
    onInfographic,
    settings,
    onPremiumClick,
    keyConcepts,
    timelineEvents,
    timelineLoading,
    pullQuotes,
    pullQuotesLoading,
    tags,
    tagsLoading,
    factCheckResult,
    factCheckLoading,
    aiTakeaways,
    takeawaysLoading,
    communityHighlights,
    highlightsLoading,
}) => {
  const [isZenMode, setIsZenMode] = useState(false);
  
  const [activeLens, setActiveLens] = useState<ReadingLens>('None');
  const [modifiedContent, setModifiedContent] = useState<string | null>(null);
  const [isModifyingContent, setIsModifyingContent] = useState(false);

  const [glossaryTerm, setGlossaryTerm] = useState<{ term: string; definition: string; position: { top: number; left: number } } | null>(null);
  
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset state on article change
    setGlossaryTerm(null);
    setActiveLens('None');
    setModifiedContent(null);
    setIsModifyingContent(false);
  }, [article]);

  useEffect(() => {
    setActiveLens(isZenMode ? settings.aiReadingLens : 'None');
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
        } finally {
            setIsModifyingContent(false);
        }
    };
    modifyContent();
  }, [activeLens, article.content, settings]);
  
  const contentToDisplay = modifiedContent ?? article.content;

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
  
  // Insert pull quotes into the article content
  const contentWithPullQuotes = useMemo(() => {
    let contentParts = processedContent.split('\n');
    if (pullQuotes.length > 0 && contentParts.length > 4) {
        const firstQuoteIndex = Math.floor(contentParts.length / 3);
        contentParts.splice(firstQuoteIndex, 0, `PULLQUOTE_0`);
    }
    if (pullQuotes.length > 1 && contentParts.length > 8) {
        const secondQuoteIndex = Math.floor(contentParts.length * 2 / 3);
        contentParts.splice(secondQuoteIndex, 0, `PULLQUOTE_1`);
    }
    return contentParts;
  }, [processedContent, pullQuotes]);

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
          .density-compact .prose {
            font-size: 0.9rem;
            line-height: 1.5;
          }
        `}</style>

        <ArticleHeader 
            article={article}
            onClose={onClose}
            isBookmarked={isBookmarked}
            onToggleBookmark={() => onToggleBookmark(article.id)}
            onTextToSpeech={onTextToSpeech}
            onSummarize={onSummarize}
        />

        <div className={`transition-all duration-300 max-w-4xl mx-auto mt-8 container sm:px-6 lg:px-8`}>
            <div className="relative">
                <ContentGutter 
                    article={article}
                    isBookmarked={isBookmarked}
                    onToggleBookmark={() => onToggleBookmark(article.id)}
                    isZenMode={isZenMode}
                    onToggleZenMode={() => setIsZenMode(!isZenMode)}
                    activeLens={activeLens}
                    onSetLens={setActiveLens}
                />
                
                <main className={!isZenMode ? 'lg:pl-24' : ''}>
                    <AuthorInfo author={article.author} date={article.date} content={article.content} />
                                       
                    <KeyTakeaways takeaways={aiTakeaways} isLoading={takeawaysLoading} />
                    <FactCheck result={factCheckResult} isLoading={factCheckLoading} />
                    
                     {isModifyingContent && (
                        <div className="flex justify-center items-center my-8 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                            <LoadingSpinner className="w-6 h-6 mr-3"/>
                            <span>Applying AI Reading Lens...</span>
                        </div>
                    )}
                    <div onClick={handleArticleClick} className="prose prose-lg dark:prose-invert max-w-none text-slate-800 dark:text-slate-300">
                      {contentWithPullQuotes.map((paragraph, index) => {
                          if (paragraph.startsWith('PULLQUOTE_')) {
                              const quoteIndex = parseInt(paragraph.split('_')[1]);
                              if (pullQuotes[quoteIndex] && !pullQuotesLoading) {
                                return <PullQuote key={`pullquote-${index}`} quote={pullQuotes[quoteIndex]} />;
                              }
                              return null;
                          }
                          return <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />;
                      })}
                    </div>

                    {article.hasTimeline && <ArticleTimeline events={timelineEvents} isLoading={timelineLoading} />}

                    <AITags tags={tags} isLoading={tagsLoading} />
                </main>
                
                <CommunityHighlights highlights={communityHighlights} isLoading={highlightsLoading} />
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
            onQuiz={onQuiz}
            onCounterpoint={onCounterpoint}
            onBehindTheNews={onBehindTheNews}
            onExpertAnalysis={onExpertAnalysis}
            onAskAuthor={onAskAuthor}
            onFactCheckPage={onFactCheckPage}
            onDeepDive={onDeepDive}
            onInfographic={onInfographic}
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