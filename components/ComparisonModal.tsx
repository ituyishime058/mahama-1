import React, { useEffect, useState, useMemo } from 'react';
import type { Article, Settings } from '../types';
import { compareArticles } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import CompareIcon from './icons/CompareIcon';
import SparklesIcon from './icons/SparklesIcon';
import { useTranslation } from '../hooks/useTranslation';

interface ComparisonModalProps {
  isOpen: boolean;
  articles: Article[];
  settings: Settings;
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, articles, settings, onClose }) => {
  const [comparison, setComparison] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (articles.length === 2 && isOpen) {
      const getComparison = async () => {
        setIsLoading(true);
        setError('');
        setComparison('');
        try {
          const stream = await compareArticles(articles[0], articles[1], settings);
          for await (const chunk of stream) {
            setComparison(prev => prev + chunk);
          }
        } catch (err: any) {
          setError(err.message || 'Failed to generate comparison.');
        } finally {
          setIsLoading(false);
        }
      };
      getComparison();
    }
  }, [articles, isOpen, settings]);

  const formattedContent = useMemo(() => comparison
    .replace(/## (.*)/g, '<h2 class="text-xl font-bold text-deep-red dark:text-gold my-4">$1</h2>')
    .replace(/\* \*(.*?)\* \*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />'), [comparison]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 animate-slide-up flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ height: 'clamp(500px, 90vh, 800px)' }}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
            <CloseIcon />
          </button>
          <div className="flex items-center gap-3">
            <CompareIcon className="w-8 h-8 text-deep-red dark:text-gold"/>
            <h3 className="font-bold text-2xl">{t('comparisonTitle')}</h3>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 md:col-span-3 p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-4">
                {articles.map(article => (
                    <div key={article.id}>
                        <h4 className="font-bold">{article.title}</h4>
                        <p className="text-sm text-slate-500 line-clamp-3">{article.excerpt}</p>
                    </div>
                ))}
            </div>

            <div className="md:col-span-3 p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold mb-3"><SparklesIcon className="text-gold w-5 h-5"/> AI Analysis</h3>
                {error && <p className="text-red-500">{error}</p>}
                <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: formattedContent }} />
                {isLoading && <span className="inline-block w-2 h-5 bg-slate-600 dark:bg-slate-300 animate-blink ml-1"></span>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;