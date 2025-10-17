import React from 'react';
import type { Article } from '../types';
import CloseIcon from './icons/CloseIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import ChildIcon from './icons/ChildIcon';

interface ExplainSimplyModalProps {
  article: Article | null;
  explanation: string;
  isLoading: boolean;
  error: string;
  onClose: () => void;
}

const ExplainSimplyModal: React.FC<ExplainSimplyModalProps> = ({ article, explanation, isLoading, error, onClose }) => {
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
          <div className="flex items-center gap-3 text-deep-red dark:text-gold mb-4">
            <ChildIcon className="w-8 h-8"/>
            <h3 className="font-bold text-2xl">Explained Simply</h3>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <LoadingSpinner />
                <span>Generating simple explanation...</span>
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {explanation && !isLoading && <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{explanation}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplainSimplyModal;
