import React, { useState, useEffect } from 'react';
import type { Article } from '../types';
import CloseIcon from './icons/CloseIcon';
import LoadingSpinner from './icons/LoadingSpinner';

interface AIModalProps {
  modalState: { article: Article; mode: 'summary' | 'explanation' } | null;
  summary: string;
  explanation: string;
  isLoading: boolean;
  error: string;
  relatedArticles: string[];
  isFetchingRelated: boolean;
  onClose: () => void;
}

const AIModal: React.FC<AIModalProps> = ({ modalState, summary, explanation, isLoading, error, relatedArticles, isFetchingRelated, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [persistedModalState, setPersistedModalState] = useState(modalState);

  const isOpen = !!modalState;

  useEffect(() => {
    if (isOpen) {
      setPersistedModalState(modalState);
      setIsRendered(true);
    }
  }, [isOpen, modalState]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsRendered(false);
    }
  };
  
  if (!isRendered) {
    return null;
  }

  const { article, mode } = persistedModalState || {};
  const content = mode === 'summary' ? summary : explanation;
  const title = mode === 'summary' ? 'Quick Summary' : 'Simple Explanation';
  const loadingText = mode === 'summary' ? 'Generating summary...' : 'Generating explanation...';

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      onTransitionEnd={handleAnimationEnd}
    >
      <div 
        className={`relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        {article && (
          <div className="p-6">
            <button onClick={onClose} aria-label="Close modal" className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
              <CloseIcon />
            </button>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 pr-8">{article.title}</h2>
            <p className="text-sm text-slate-500 mb-4">{article.author} &bull; {article.date}</p>
            <div className="max-h-[60vh] overflow-y-auto pr-2">
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <h3 className="font-bold text-lg mb-2 text-deep-red dark:text-gold">{title}</h3>
                {isLoading && (
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                    <LoadingSpinner />
                    <span>{loadingText}</span>
                  </div>
                )}
                {error && <p className="text-red-500">{error}</p>}
                {content && !isLoading && <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{content}</p>}
              </div>

              {(isFetchingRelated || relatedArticles.length > 0) && (
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                  <h3 className="font-bold text-lg mb-2 text-deep-red dark:text-gold">Related Stories</h3>
                  {isFetchingRelated ? (
                    <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                      <LoadingSpinner />
                      <span>Finding related stories...</span>
                    </div>
                  ) : (
                    <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                      {relatedArticles.map((headline, index) => (
                        <li key={index}>{headline}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIModal;