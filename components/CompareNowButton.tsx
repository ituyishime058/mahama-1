import React from 'react';
import type { Article } from '../types';
import CompareIcon from './icons/CompareIcon';
import CloseIcon from './icons/CloseIcon';
import { useTranslation } from '../hooks/useTranslation';

interface CompareNowButtonProps {
  articles: Article[];
  onCompare: () => void;
  onRemove: (articleId: number) => void;
  onClear: () => void;
}

const CompareNowButton: React.FC<CompareNowButtonProps> = ({ articles, onCompare, onRemove, onClear }) => {
  const { t } = useTranslation();
  const articleCount = articles.length;

  if (articleCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-up">
      <div className="flex items-center gap-2 bg-white/80 dark:bg-navy/80 backdrop-blur-md rounded-full shadow-2xl p-2 border border-slate-200 dark:border-slate-700">
        {articles.map(article => (
          <div key={article.id} className="relative group">
            <img src={article.imageUrl} alt={article.title} className="w-12 h-12 rounded-full object-cover"/>
            <button onClick={() => onRemove(article.id)} className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <CloseIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        ))}
        {articleCount < 2 && (
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600"></div>
        )}
        
        <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 mx-2"></div>

        {articleCount === 2 ? (
            <button onClick={onCompare} className="flex items-center gap-2 px-4 py-2 bg-deep-red text-white font-bold rounded-full text-sm">
                <CompareIcon className="w-5 h-5" />
                {t('compareNow')}
            </button>
        ) : (
            <p className="px-4 text-sm font-semibold text-slate-500 whitespace-nowrap">{t('comparisonPrompt')}</p>
        )}
        
        <button onClick={onClear} title={t('clearComparison')} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white">
            <CloseIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CompareNowButton;