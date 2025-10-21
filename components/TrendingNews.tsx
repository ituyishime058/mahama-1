import React from 'react';
import type { Article } from '../types';
import ChevronRightIcon from './icons/ChevronRightIcon';
import { useTranslation } from '../hooks/useTranslation';

interface TrendingNewsProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

const TrendingNews: React.FC<TrendingNewsProps> = ({ articles, onArticleClick }) => {
  const { t } = useTranslation();
  return (
    <aside className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-extrabold mb-4 border-l-4 border-gold pl-3">
        {t('trendingNow')}
      </h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <a 
            key={article.id} 
            href="#" 
            onClick={(e) => { e.preventDefault(); onArticleClick(article); }}
            className="group flex items-center gap-4 p-2 rounded-lg transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-700/50"
          >
            <img src={article.imageUrl} alt="" className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase text-deep-red">{article.category}</p>
              <h4 className="font-semibold leading-tight group-hover:underline text-sm">
                {article.title}
              </h4>
            </div>
          </a>
        ))}
      </div>
       <button className="w-full mt-4 text-sm font-semibold text-deep-red dark:text-gold hover:underline flex items-center justify-center gap-1">
        <span>{t('viewAllTrending')}</span>
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </aside>
  );
};

export default TrendingNews;