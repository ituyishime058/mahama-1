import React, { useState, useEffect } from 'react';
import type { Article, Settings } from '../types';
import { findRelatedArticles } from '../utils/ai';
import SparklesIcon from './icons/SparklesIcon';
import { useTranslation } from '../hooks/useTranslation';

interface AiRecommendationsProps {
  currentArticle: Article;
  allArticles: Article[];
  onArticleClick: (article: Article) => void;
  settings: Settings;
}

const AiRecommendations: React.FC<AiRecommendationsProps> = ({ currentArticle, allArticles, onArticleClick, settings }) => {
  const [recommended, setRecommended] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const recommendedIds = await findRelatedArticles(currentArticle, allArticles, settings);
        const recommendedArticles = allArticles.filter(a => recommendedIds.includes(a.id)).slice(0, 3); // Limit to 3 for the aside
        setRecommended(recommendedArticles);
      } catch (err) {
        console.error("Failed to fetch AI recommendations:", err);
        const fallback = allArticles
          .filter(a => a.category === currentArticle.category && a.id !== currentArticle.id)
          .slice(0, 3);
        setRecommended(fallback);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentArticle, allArticles, settings]);

  if (isLoading) {
    return (
      <aside className="p-6 rounded-lg shadow-md bg-white dark:bg-slate-800/50 animate-pulse">
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-md mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-md flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  if (recommended.length === 0) {
    return null;
  }

  return (
    <aside className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-extrabold mb-4 border-l-4 border-gold pl-3 flex items-center gap-2">
        <SparklesIcon className="w-5 h-5" />
        {t('aiPicksForYou')}
      </h2>
      <div className="space-y-4">
        {recommended.map((article) => (
          <a
            key={article.id}
            href="#"
            onClick={(e) => { e.preventDefault(); onArticleClick(article); }}
            className="group flex items-center gap-4 p-2 rounded-lg transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-700/50"
          >
            <img src={article.imageUrl} alt="" className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase text-deep-red">{article.category}</p>
              <h4 className="font-semibold leading-tight group-hover:underline text-sm truncate">
                {article.title}
              </h4>
            </div>
          </a>
        ))}
      </div>
    </aside>
  );
};

export default AiRecommendations;