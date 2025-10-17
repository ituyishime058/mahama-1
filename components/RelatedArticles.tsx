import React, { useState, useEffect } from 'react';
import type { Article } from '../types';
import { findRelatedArticles } from '../utils/ai';
import SparklesIcon from './icons/SparklesIcon';

interface RelatedArticlesProps {
  currentArticle: Article;
  allArticles: Article[];
  onArticleClick: (article: Article) => void;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticle, allArticles, onArticleClick }) => {
  const [related, setRelated] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      setIsLoading(true);
      try {
        const relatedIds = await findRelatedArticles(currentArticle, allArticles);
        const relatedArticles = allArticles.filter(a => relatedIds.includes(a.id));
        setRelated(relatedArticles);
      } catch (error) {
        console.error("Failed to fetch related articles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRelated();
  }, [currentArticle, allArticles]);
  
  if (isLoading) {
      return (
          <div className="mt-12 lg:pl-24">
              <h3 className="text-2xl font-extrabold mb-6 border-l-4 border-deep-red pl-4 flex items-center gap-2">
                <SparklesIcon className="text-gold"/> AI-Powered Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                  <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                  <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                  <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              </div>
          </div>
      );
  }

  if (related.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 lg:pl-24">
      <h3 className="text-2xl font-extrabold mb-6 border-l-4 border-deep-red pl-4 flex items-center gap-2">
        <SparklesIcon className="text-gold"/> AI-Powered Recommendations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map(article => (
          <div key={article.id} className="group cursor-pointer" onClick={() => onArticleClick(article)}>
            <div className="overflow-hidden rounded-lg">
                <img src={article.imageUrl} alt={article.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="text-xs font-semibold uppercase text-deep-red mt-3">{article.category}</p>
            <h4 className="font-semibold leading-tight mt-1 group-hover:underline">{article.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
