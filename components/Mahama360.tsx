

import React from 'react';
import type { Article } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import FireIcon from './icons/FireIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface Mahama360Props {
  articles: Article[];
  onArticleClick?: (article: Article) => void;
}

const Card: React.FC<{ article: Article, onArticleClick?: (article: Article) => void }> = ({ article, onArticleClick }) => (
    <div 
        className="group relative rounded-lg overflow-hidden shadow-lg h-80"
        onClick={() => onArticleClick?.(article)}
    >
        <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-end p-6 text-white">
            <h3 className="text-xl font-bold leading-tight drop-shadow-md">{article.title}</h3>
            <p className="text-sm opacity-80 mt-1">{article.author}</p>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-sm font-semibold">
                <span>Read More</span>
                <ArrowRightIcon className="w-4 h-4" />
            </div>
        </div>
    </div>
);


const Mahama360: React.FC<Mahama360Props> = ({ articles, onArticleClick }) => {
  const { t } = useTranslation();

  if (!articles || articles.length === 0) return null;
  
  const [first, ...rest] = articles;

  return (
    <section className="my-16">
        <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold mb-2 tracking-tighter inline-block relative">
                Mahama 360°
                <FireIcon className="absolute -top-2 -right-8 w-8 h-8 text-deep-red transform rotate-12" />
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">{t('mahama360Desc')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card article={first} onArticleClick={onArticleClick} />
            </div>
            <div className="space-y-6">
                {rest.slice(0, 2).map(article => (
                    <div 
                        key={article.id}
                        className="group relative rounded-lg overflow-hidden shadow-md h-full cursor-pointer"
                        onClick={() => onArticleClick?.(article)}
                    >
                        <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                         <div className="relative h-full flex flex-col justify-end p-4 text-white">
                             <h4 className="font-bold leading-tight">{article.title}</h4>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Mahama360;