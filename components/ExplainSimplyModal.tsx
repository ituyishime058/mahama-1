
import React, { useEffect, useState } from 'react';
import type { Article, Settings } from '../types';
import { explainSimply } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import ChildIcon from './icons/ChildIcon';

interface ExplainSimplyModalProps {
  isOpen: boolean;
  article: Article | null;
  settings: Settings;
  onClose: () => void;
}

const ExplainSimplyModal: React.FC<ExplainSimplyModalProps> = ({ isOpen, article, settings, onClose }) => {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (article && isOpen) {
      const getExplanation = async () => {
        setIsLoading(true);
        setError('');
        setExplanation('');
        try {
          const stream = await explainSimply(article, settings);
          for await (const chunk of stream) {
            setExplanation(prev => prev + chunk);
          }
        } catch (err: any) {
          setError(err.message || 'Failed to generate explanation.');
        } finally {
          setIsLoading(false);
        }
      };
      getExplanation();
    }
  }, [article, isOpen, settings]);
  
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
          <div className="flex items-center gap-3 text-deep-red dark:text-gold mb-4">
            <ChildIcon className="w-8 h-8"/>
            <h3 className="font-bold text-2xl">Explained Simply</h3>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            {error && <p className="text-red-500">{error}</p>}
             <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap min-h-[5rem]">
                {explanation}
                {isLoading && <span className="inline-block w-2 h-5 bg-slate-600 dark:bg-slate-300 animate-blink ml-1"></span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplainSimplyModal;
