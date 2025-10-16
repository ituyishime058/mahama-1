import React from 'react';
import type { Article } from '../types';

interface TrendingNewsProps {
  articles: Article[];
}

const TrendingNews: React.FC<TrendingNewsProps> = ({ articles }) => {
  return (
    <aside className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-extrabold mb-4 border-l-4 border-gold pl-3">
        Trending Now
      </h2>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={article.id} className="flex items-start space-x-4 group pt-4 border-t border-slate-200 dark:border-slate-700 first:border-t-0 first:pt-0">
            <span className="text-3xl font-bold text-slate-300 dark:text-slate-600 group-hover:text-gold transition-colors duration-200">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase text-deep-red">{article.category}</p>
              <h4 className="font-semibold leading-tight group-hover:underline">
                <a href="#">{article.title}</a>
              </h4>
               <p className="text-xs text-slate-500 mt-1">{article.date}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default TrendingNews;