import React, { useState, useEffect } from 'react';
import type { Article, Settings } from '../types';
import { findRelatedArticles } from '../utils/ai';
import SparklesIcon from './icons/SparklesIcon';
import { useTranslation } from '../hooks/useTranslation';

interface RelatedArticlesProps {
  currentArticle: Article;
  allArticles: Article[];
  onArticleClick: (article: Article) => void;
  settings: Settings;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticle, allArticles, onArticleClick, settings }) => {
  const [related, setRelated] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRelated = async () => {
      setIsLoading(true);
      try {
        const relatedIds = await findRelatedArticles(currentArticle, allArticles, settings);
        const relatedArticlesData = allArticles.filter(a => relatedIds.includes(a.id));
        setRelated(relatedArticlesData);
      } catch (err) {
        console.error("Failed to fetch related articles:", err);
        // Fallback to simple category matching
        const fallbackRelated = allArticles
          .filter(a => a.category === currentArticle.category && a.id !== currentArticle.id)
          .slice(0, 3);
        setRelated(fallbackRelated);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelated();
  }, [currentArticle, allArticles, settings]);

  if (isLoading) {
    return (
        <div className="mt-12 lg:pl-24">
            <h3 className="text-2xl font-extrabold mb-6 border-l-4 border-gold pl-4 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5"/>
                {t('aiPicksForYou')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[...Array(3)].map((_, i) => (
                    <div key={i}>
                        <div className="bg-slate-200 dark:bg-slate-700 h-40 rounded-lg"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mt-2 w-3/4"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mt-1 w-1/2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
  }
  
  if (related.length === 0) {
      return null;
  }

  return (
    <div className="mt-12 lg:pl-24">
      <h3 className="text-2xl font-extrabold mb-6 border-l-4 border-gold pl-4 flex items-center gap-2">
        <SparklesIcon className="w-5 h-5"/>
        {t('aiPicksForYou')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map(article => (
          <div key={article.id} className="group cursor-pointer" onClick={() => onArticleClick(article)}>
            <div className="relative overflow-hidden rounded-lg aspect-video mb-2">
              <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="text-xs font-semibold uppercase text-deep-red">{article.category}</p>
            <h4 className="font-semibold leading-tight group-hover:underline">{article.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;