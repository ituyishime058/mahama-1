
import React, { useEffect, useState } from 'react';
import type { Article, Settings } from '../types';
import { summarizeArticle } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';

interface SummarizerModalProps {
  isOpen: boolean;
  article: Article | null;
  settings: Settings;
  onClose: () => void;
}

const SummarizerModal: React.FC<SummarizerModalProps> = ({ isOpen, article, settings, onClose }) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (article && isOpen) {
      const getSummary = async () => {
        setIsLoading(true);
        setError('');
        setSummary(''); 
        try {
          const stream = await summarizeArticle(article, settings);
          for await (const chunk of stream) {
            setSummary(prev => prev + chunk);
          }
        } catch (err: any) {
          setError(err.message || 'Failed to generate summary.');
        } finally {
          setIsLoading(false);
        }
      };
      getSummary();
    }
  }, [article, settings, isOpen]);

  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
            <CloseIcon />
          </button>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{article.title}</h2>
          <p className="text-sm text-slate-500 mb-4">{article.author} &bull; {article.date}</p>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <h3 className="font-bold text-lg mb-2 text-deep-red dark:text-gold">AI Summary ({settings.summaryLength})</h3>
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap min-h-[5rem]">
                {summary}
                {isLoading && <span className="inline-block w-2 h-5 bg-slate-600 dark:bg-slate-300 animate-blink ml-1"></span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizerModal;
