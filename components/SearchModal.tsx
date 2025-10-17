import React, { useState, useEffect, useRef } from 'react';
import type { Article } from '../types';
import CloseIcon from './icons/CloseIcon';
import SearchIcon from './icons/SearchIcon';
import FireIcon from './icons/FireIcon';
import ClockIcon from './icons/ClockIcon';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onArticleSelect: (article: Article) => void;
}

const trendingTopics = ["Climate Change", "AI Revolution", "Global Economy", "Space Tourism", "Fast Fashion"];
const recentSearches = ["G7 Summit", "Fusion Power", "Market Analysis"];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, articles, onArticleSelect }) => {
  const [query, setQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
      
      // Handle Escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
        // Reset state when closed
        setQuery('');
        setFilteredArticles([]);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (query.length > 2) {
      const lowerCaseQuery = query.toLowerCase();
      const results = articles.filter(article => 
        article.title.toLowerCase().includes(lowerCaseQuery) ||
        article.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        article.category.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredArticles(results);
    } else {
      setFilteredArticles([]);
    }
  }, [query, articles]);

  const TopicButton: React.FC<{ text: string }> = ({ text }) => (
    <button
      onClick={() => setQuery(text)}
      className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-full text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
    >
      {text}
    </button>
  );

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
          <div className="flex items-center justify-between h-20">
             <div className="relative w-full">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for articles, topics, or keywords..."
                    className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-800 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-deep-red dark:focus:ring-gold"
                />
             </div>
             <button onClick={onClose} className="ml-4 p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white"><CloseIcon /></button>
          </div>

          <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto">
            {query.length > 2 ? (
                // Search results
                <div>
                    {filteredArticles.length > 0 ? (
                        <ul>
                            {filteredArticles.map(article => (
                                <li key={article.id}>
                                    <button onClick={() => {onArticleSelect(article)}} className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 transition-colors">
                                        <p className="font-semibold">{article.title}</p>
                                        <p className="text-sm text-deep-red dark:text-gold">{article.category}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-8 text-center text-slate-500">
                            <h3 className="font-semibold">No results found for "{query}"</h3>
                            <p>Try searching for something else.</p>
                        </div>
                    )}
                </div>
            ) : (
                // Default content
                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="flex items-center gap-2 font-bold mb-3"><ClockIcon className="w-5 h-5"/> Recent Searches</h3>
                        <div className="flex flex-wrap gap-2">
                            {recentSearches.map(topic => <TopicButton key={topic} text={topic} />)}
                        </div>
                    </div>
                     <div>
                        <h3 className="flex items-center gap-2 font-bold mb-3"><FireIcon className="w-5 h-5"/> Trending Topics</h3>
                        <div className="flex flex-wrap gap-2">
                           {trendingTopics.map(topic => <TopicButton key={topic} text={topic} />)}
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
