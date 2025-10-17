import React, { useState, useEffect } from 'react';
import CloseIcon from './icons/CloseIcon';
import SearchIcon from './icons/SearchIcon';
import LoadingSpinner from './icons/LoadingSpinner';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  results: { text: string; sources: any[] } | null;
  isLoading: boolean;
  error: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch, results, isLoading, error }) => {
  const [query, setQuery] = useState('');
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsRendered(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  if (!isRendered) {
    return null;
  }

  return (
    <div 
        className={`fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[15vh] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        onTransitionEnd={handleAnimationEnd}
    >
      <div 
        className={`relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close search" className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white z-10">
          <CloseIcon />
        </button>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="relative mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about the latest news..."
              className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-deep-red dark:focus:ring-gold"
              autoFocus
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon />
            </div>
          </form>

          <div className="min-h-[200px] max-h-[50vh] overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col items-center justify-center pt-10 text-slate-600 dark:text-slate-400">
                <LoadingSpinner />
                <span className="mt-2">Searching the web...</span>
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {results && !isLoading && (
              <div>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{results.text}</p>
                {results.sources.length > 0 && (
                  <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
                    <h4 className="font-bold text-sm mb-2 text-slate-600 dark:text-slate-400">Sources:</h4>
                    <ul className="space-y-2">
                      {results.sources.map((source, index) => (
                        <li key={source.web?.uri || index}>
                          <a 
                            href={source.web?.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate block"
                          >
                            {source.web?.title || source.web?.uri}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
             {!isLoading && !results && !error && (
                <div className="flex flex-col items-center justify-center pt-10 text-center text-slate-500">
                    <h3 className="text-lg font-semibold">Live Search</h3>
                    <p className="max-w-md">Get up-to-the-minute answers grounded in Google Search. Try "Who won the latest tech award?" or "What are the current economic trends?"</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;