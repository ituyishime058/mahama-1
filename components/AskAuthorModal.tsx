import React, { useEffect, useState } from 'react';
import type { Article, Settings } from '../types';
import { generateAuthorResponse } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import AuthorIcon from './icons/AuthorIcon';
import SendIcon from './icons/SendIcon';

interface AskAuthorModalProps {
  isOpen: boolean;
  article: Article | null;
  settings: Settings;
  onClose: () => void;
}

const AskAuthorModal: React.FC<AskAuthorModalProps> = ({ isOpen, article, settings, onClose }) => {
  const [response, setResponse] = useState('');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasAsked, setHasAsked] = useState(false);

  useEffect(() => {
    if (!isOpen) {
        setResponse('');
        setQuestion('');
        setHasAsked(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article || !question.trim()) return;

    setIsLoading(true);
    setHasAsked(true);
    setError('');
    setResponse('');
    try {
      const stream = await generateAuthorResponse(article, question, settings);
      for await (const chunk of stream) {
        setResponse(prev => prev + chunk);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate response.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 animate-slide-up flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ height: 'clamp(400px, 80vh, 600px)' }}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
                <CloseIcon />
            </button>
            <div className="flex items-center gap-3">
                <AuthorIcon className="w-8 h-8 text-deep-red dark:text-gold"/>
                <h3 className="font-bold text-2xl">Ask the Author</h3>
            </div>
            <p className="text-sm text-slate-500 mt-1">Pose a question to an AI persona of {article.author}.</p>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
          {hasAsked && (
            <div className="mb-4">
                <p className="font-semibold text-sm">Your question:</p>
                <p className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">{question}</p>
            </div>
          )}
          
          <p className="font-semibold text-sm mb-2">{article.author}'s AI response:</p>
          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 min-h-[5rem]">
            {error && <p className="text-red-500">{error}</p>}
            <p>{response}</p>
            {isLoading && <span className="inline-block w-2 h-5 bg-slate-600 dark:bg-slate-300 animate-blink ml-1"></span>}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="relative">
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., What was the biggest challenge in your research?"
                disabled={isLoading}
                className="w-full p-3 pr-12 bg-slate-100 dark:bg-slate-700 rounded-full border-transparent focus:ring-2 focus:ring-deep-red"
            />
            <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-deep-red text-white rounded-full flex items-center justify-center disabled:bg-slate-400 dark:disabled:bg-slate-600"
            >
                <SendIcon className="w-5 h-5" />
            </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AskAuthorModal;