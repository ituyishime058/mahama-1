import React from 'react';
import type { Article } from '../types';
import CloseIcon from './icons/CloseIcon';
import LoadingSpinner from './icons/LoadingSpinner';

interface SummarizerModalProps {
  article: Article | null;
  summary: string;
  isLoading: boolean;
  error: string;
  onClose: () => void;
}

const SummarizerModal: React.FC<SummarizerModalProps> = ({ article, summary, isLoading, error, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
            <CloseIcon />
          </button>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{article.title}</h2>
          <p className="text-sm text-slate-500 mb-4">{article.author} &bull; {article.date}</p>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <h3 className="font-bold text-lg mb-2 text-deep-red dark:text-gold">AI Summary</h3>
            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <LoadingSpinner />
                <span>Generating summary...</span>
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {summary && !isLoading && <p className="text-slate-700 dark:text-slate-300">{summary}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizerModal;
