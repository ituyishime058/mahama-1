import React, { useEffect, useState, useMemo } from 'react';
import type { Article, Settings } from '../types';
import { generateDeepDive } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import DeepDiveIcon from './icons/DeepDiveIcon';

interface DeepDiveModalProps {
  isOpen: boolean;
  article: Article | null;
  settings: Settings;
  onClose: () => void;
}

const DeepDiveModal: React.FC<DeepDiveModalProps> = ({ isOpen, article, settings, onClose }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (article && isOpen) {
      const getDeepDive = async () => {
        setIsLoading(true);
        setError('');
        setContent('');
        try {
          const stream = await generateDeepDive(article, settings);
          for await (const chunk of stream) {
            setContent(prev => prev + chunk);
          }
        } catch (err: any) {
          setError(err.message || 'Failed to generate deep dive.');
        } finally {
          setIsLoading(false);
        }
      };
      getDeepDive();
    }
  }, [article, isOpen, settings]);
  
  const formattedContent = useMemo(() => content
    .replace(/## (.*)/g, '<h2 class="text-xl font-bold text-deep-red dark:text-gold my-4">$1</h2>')
    .replace(/\* \*(.*?)\* \*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />'), [content]);

  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 animate-slide-up flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ height: 'clamp(500px, 90vh, 800px)' }}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
                <CloseIcon />
            </button>
            <div className="flex items-center gap-3">
                <DeepDiveIcon className="w-8 h-8 text-deep-red dark:text-gold"/>
                <h3 className="font-bold text-2xl">AI Deep Dive</h3>
            </div>
            <p className="text-sm text-slate-500 mt-1">A comprehensive look at "{article.title}"</p>
        </div>
        <div className="p-6 flex-grow overflow-y-auto">
            {error && <p className="text-red-500">{error}</p>}
             <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: formattedContent }} />
            {isLoading && <span className="inline-block w-2 h-5 bg-slate-600 dark:bg-slate-300 animate-blink ml-1"></span>}
        </div>
      </div>
    </div>
  );
};

export default DeepDiveModal;
