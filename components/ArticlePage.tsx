
import React, { useEffect, useState, useRef } from 'react';
import type { Article } from '../types';
import { mockComments } from '../constants';
import { generateTags, factCheckArticle } from '../utils/ai';

import AuthorInfo from './AuthorInfo';
import SocialShare from './SocialShare';
import KeyTakeaways from './KeyTakeaways';
import AITags from './AITags';
import FactCheck from './FactCheck';
import CommentsSection from './CommentsSection';
import ArticleProgressBar from './ArticleProgressBar';
import FloatingActionbar from './FloatingActionbar';

interface ArticlePageProps {
  article: Article;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  // ... other props for AI actions
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
  onTextToSpeech: (article: Article) => void;
  onTranslate: (article: Article) => void;
  onQuiz: (article: Article) => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ 
    article, 
    onClose, 
    isBookmarked, 
    onToggleBookmark,
    onSummarize,
    onExplainSimply,
    onTextToSpeech,
    onTranslate,
    onQuiz,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [factCheckResult, setFactCheckResult] = useState<{ status: string; summary: string } | null>(null);
  const [factCheckLoading, setFactCheckLoading] = useState(true);
  const [isZenMode, setIsZenMode] = useState(false);
  
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch AI-generated content when component mounts
    const fetchAIData = async () => {
      setTagsLoading(true);
      setFactCheckLoading(true);

      const tagsPromise = generateTags(article);
      const factCheckPromise = factCheckArticle(article);
      
      const [tagsResult, factCheckData] = await Promise.allSettled([tagsPromise, factCheckPromise]);

      if (tagsResult.status === 'fulfilled') {
        setTags(tagsResult.value);
      }
      if (factCheckData.status === 'fulfilled') {
        setFactCheckResult(factCheckData.value);
      }
      
      setTagsLoading(false);
      setFactCheckLoading(false);
    };

    fetchAIData();
  }, [article]);
  
  return (
    <div ref={articleRef} className={`transition-colors duration-300 ${isZenMode ? 'bg-slate-50 dark:bg-gray-900' : 'bg-white dark:bg-navy'}`}>
        <ArticleProgressBar targetRef={articleRef} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className={`max-w-4xl mx-auto transition-all duration-300 ${isZenMode ? 'max-w-3xl' : ''}`}>
                <div className="relative">
                    <SocialShare 
                        article={article}
                        isBookmarked={isBookmarked}
                        onToggleBookmark={() => onToggleBookmark(article.id)}
                        isZenMode={isZenMode}
                        onToggleZenMode={() => setIsZenMode(!isZenMode)}
                    />
                    
                    <main className="lg:pl-24">
                        <p className="text-deep-red dark:text-gold font-semibold uppercase tracking-wider">{article.category}</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white my-4 !leading-tight">{article.title}</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">{article.excerpt}</p>
                        
                        <AuthorInfo author={article.author} date={article.date} />

                        <figure className="my-8">
                            <img src={article.imageUrl} alt={article.title} className="w-full h-auto rounded-lg shadow-lg"/>
                            <figcaption className="text-center text-sm text-slate-500 mt-2">A representative image for the article.</figcaption>
                        </figure>
                        
                        <KeyTakeaways takeaways={article.keyTakeaways} />
                        <FactCheck result={factCheckResult} isLoading={factCheckLoading} />
                        
                        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-800 dark:text-slate-300">
                           <p>{article.content}</p>
                           {/* Add more paragraphs if content is longer */}
                        </div>

                        <AITags tags={tags} isLoading={tagsLoading} />
                    </main>

                    <CommentsSection initialComments={mockComments} />
                </div>
            </div>
        </div>
        <FloatingActionbar
            article={article}
            onSummarize={onSummarize}
            onExplainSimply={onExplainSimply}
            onTextToSpeech={onTextToSpeech}
            onTranslate={onTranslate}
            onQuiz={onQuiz}
        />
    </div>
  );
};

export default ArticlePage;
