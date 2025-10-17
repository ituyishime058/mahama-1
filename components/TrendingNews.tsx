import React from 'react';
import type { Article } from '../types';

interface TrendingNewsProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

const TrendingNews: React.FC<TrendingNewsProps> = ({ articles, onArticleClick }) => {
  return (
    <aside className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-extrabold mb-4 border-l-4 border-gold pl-3">
        Trending Now
      </h2>
      <div className="space-y-2">
        {articles.map((article, index) => (
          <div 
            key={article.id} 
            className="group rounded-lg transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-700/50"
          >
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onArticleClick(article); }}
              className="flex items-start space-x-4 p-2"
            >
              <span className="text-3xl font-bold text-slate-300 dark:text-slate-600 group-hover:text-gold transition-colors duration-200">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-deep-red">{article.category}</p>
                <h4 className="font-semibold leading-tight group-hover:underline">
                  {article.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">{article.date}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default TrendingNews;