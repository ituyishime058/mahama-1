import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Article, AiSearchResult, Settings } from '../types';
import { getAutocompleteSuggestions, performAiSearch } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import SearchIcon from './icons/SearchIcon';
import SparklesIcon from './icons/SparklesIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onArticleSelect: (article: Article) => void;
  settings: Settings;
}

type SearchStatus = 'idle' | 'loading' | 'results' | 'error';
const smartQueries = ["What is the latest on fusion energy?", "Summarize the G7 summit", "Geopolitical tensions in Asia", "Future of AI in finance"];

const LoadingDots = () => (
  <div className="flex space-x-2 justify-center items-center">
    <span className="sr-only">Loading...</span>
    <div className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
    <div className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
    <div className="h-2 w-2 bg-slate-500 rounded-full animate-bounce"></div>
  </div>
);

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, articles, onArticleSelect, settings }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [results, setResults] = useState<AiSearchResult | null>(null);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  // FIX: Replace NodeJS.Timeout with a browser-compatible type.
  // `setTimeout` in the browser returns a number, not a Timeout object.
  // Using ReturnType<typeof setTimeout> is a robust way to get the correct type.
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      // Reset state when closed
      setTimeout(() => {
        setQuery('');
        setSuggestions([]);
        setStatus('idle');
        setResults(null);
        setError('');
      }, 300); // Wait for closing animation
    }
  }, [isOpen, onClose]);
  
  const handleSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setQuery(searchTerm);
    setSuggestions([]);
    setStatus('loading');
    try {
        const searchResult = await performAiSearch(searchTerm, articles, settings);
        setResults(searchResult);
        setStatus('results');
    } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
        setStatus('error');
    }
  }, [articles, settings]);

  const handleAutocomplete = useCallback(async (currentQuery: string) => {
    if (currentQuery.length < 3) {
        setSuggestions([]);
        return;
    }
    try {
        const result = await getAutocompleteSuggestions(currentQuery, settings);
        setSuggestions(result);
    } catch (err) {
        console.error("Autocomplete failed:", err);
    }
  }, [settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
        handleAutocomplete(value);
    }, 300);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    handleSearch(suggestion);
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <LoadingDots />
            <p className="mt-4 font-semibold">AI is searching...</p>
          </div>
        );
      case 'results':
        if (!results) return null;
        const relatedArticles = articles.filter(a => results.relatedArticleIds.includes(a.id));
        return (
          <div className="p-6 space-y-8 animate-fade-in">
            {results.summary && (
              <section>
                <h3 className="flex items-center gap-2 font-bold mb-3 text-lg"><SparklesIcon className="w-5 h-5 text-gold"/> AI Answer</h3>
                <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: results.summary.replace(/\n/g, '<br />') }}/>
              </section>
            )}
            {relatedArticles.length > 0 && (
              <section>
                <h3 className="flex items-center gap-2 font-bold mb-3 text-lg"><DocumentTextIcon className="w-5 h-5"/> Top Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map(article => (
                    <button key={article.id} onClick={() => onArticleSelect(article)} className="w-full flex items-start text-left gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <img src={article.imageUrl} alt={article.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                      <div>
                        <p className="font-semibold">{article.title}</p>
                        <p className="text-sm text-deep-red dark:text-gold">{article.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
            {results.suggestedQuestions.length > 0 && (
              <section>
                <h3 className="flex items-center gap-2 font-bold mb-3 text-lg"><QuestionMarkCircleIcon className="w-5 h-5"/> Explore Further</h3>
                <div className="flex flex-wrap gap-2">
                  {results.suggestedQuestions.map(q => (
                    <button key={q} onClick={() => handleSearch(q)} className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-full text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                      {q}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        );
      case 'error':
        return (
          <div className="p-8 text-center text-red-500">
            <h3 className="font-semibold">Search Failed</h3>
            <p>{error}</p>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="p-6 space-y-6">
            <h3 className="flex items-center gap-2 font-bold"><SparklesIcon className="w-5 h-5 text-gold"/> Smart Queries</h3>
            <div className="flex flex-wrap gap-2">
                {smartQueries.map(topic => (
                    <button key={topic} onClick={() => handleSearch(topic)} className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-full text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                        {topic}
                    </button>
                ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[80] bg-slate-100/80 dark:bg-navy/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        className={`w-full h-full transform transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="flex items-center h-20 gap-4">
             {status !== 'idle' && (
                <button onClick={() => setStatus('idle')} className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    <ChevronLeftIcon />
                </button>
             )}
             <div className="relative w-full">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }}>
                    <input 
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="Ask me anything..."
                        className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-800 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-deep-red dark:focus:ring-gold"
                    />
                </form>
                 {suggestions.length > 0 && (
                    <ul className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                        {suggestions.map(s => (
                            <li key={s}>
                                <button onClick={() => handleSuggestionClick(s)} className="w-full text-left p-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    {s}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
             </div>
             <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white"><CloseIcon /></button>
          </div>

          <div className="mt-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;