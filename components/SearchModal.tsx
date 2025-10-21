import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Article, AiSearchResult, Settings, StreamingContent } from '../types';
import { performAiSearch } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import SearchIcon from './icons/SearchIcon';
import SparklesIcon from './icons/SparklesIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon';
import MoviesTVIcon from './icons/MoviesTVIcon';
import MovieCard from './MovieCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  movies: StreamingContent[];
  onArticleSelect: (article: Article) => void;
  onMovieSelect: (movie: StreamingContent) => void;
  onWatchTrailer: (url: string) => void;
  settings: Settings;
}

type SearchStatus = 'idle' | 'loading' | 'results' | 'error';
type SearchTab = 'All' | 'Articles' | 'Movies & TV';

const smartQueries = ["Latest on fusion energy", "Future of AI in finance", "Sci-Fi movies about space", "Award-winning dramas"];

const LoadingDots: React.FC = () => (
  <div className="flex space-x-2 justify-center items-center">
    <span className="sr-only">Loading...</span>
    <div className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
    <div className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
    <div className="h-2 w-2 bg-slate-500 rounded-full animate-bounce"></div>
  </div>
);

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, articles, movies, onArticleSelect, onMovieSelect, onWatchTrailer, settings }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [activeTab, setActiveTab] = useState<SearchTab>('All');
  const [results, setResults] = useState<AiSearchResult | null>(null);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setTimeout(() => {
        setQuery('');
        setStatus('idle');
        setActiveTab('All');
        setResults(null);
        setError('');
      }, 300);
    }
  }, [isOpen]);

  const handleSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setQuery(searchTerm);
    setStatus('loading');
    setActiveTab('All');
    try {
        const searchResult = await performAiSearch(searchTerm, articles, movies, settings);
        setResults(searchResult);
        setStatus('results');
    } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
        setStatus('error');
    }
  }, [articles, movies, settings]);

  const renderContent = () => {
    if (status === 'loading') return <div className="p-12 text-center"><LoadingDots /><p className="mt-4 font-semibold">AI is searching...</p></div>;
    if (status === 'error') return <div className="p-12 text-center text-red-500"><h3 className="font-semibold">Search Failed</h3><p>{error}</p></div>;
    
    if (status === 'results' && results) {
        const relatedArticles = articles.filter(a => results.relatedArticleIds?.includes(a.id));
        const relatedMovies = movies.filter(m => results.relatedMovieIds?.includes(m.id));

        const filteredArticles = articles.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));
        const filteredMovies = movies.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));

        return (
            <div className="p-4 sm:p-6 space-y-8 animate-fade-in">
                {activeTab === 'All' && (
                    <>
                        {results.summary && (
                          <section>
                            <h3 className="flex items-center gap-2 font-bold mb-3 text-lg"><SparklesIcon className="w-5 h-5 text-gold"/> AI Answer</h3>
                            <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: results.summary.replace(/\n/g, '<br />') }}/>
                          </section>
                        )}
                        {relatedMovies.length > 0 && <MovieResults movies={relatedMovies} onMovieSelect={onMovieSelect} onWatchTrailer={onWatchTrailer} />}
                        {relatedArticles.length > 0 && <ArticleResults articles={relatedArticles} onArticleSelect={onArticleSelect} />}
                        {results.suggestedQuestions.length > 0 && <SuggestedQuestions questions={results.suggestedQuestions} onQuestionClick={handleSearch} />}
                    </>
                )}
                {activeTab === 'Articles' && <ArticleResults articles={filteredArticles} onArticleSelect={onArticleSelect} />}
                {activeTab === 'Movies & TV' && <MovieResults movies={filteredMovies} onMovieSelect={onMovieSelect} onWatchTrailer={onWatchTrailer} isFullWidth />}
            </div>
        );
    }
    
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
  };

  return (
    <div className={`fixed inset-0 z-[80] bg-slate-100/80 dark:bg-navy/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
      <div className={`w-full h-full transform transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={e => e.stopPropagation()}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex items-center h-20 gap-4">
             <div className="relative w-full">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }}>
                    <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles, movies, and more..." className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-800 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-deep-red dark:focus:ring-gold" />
                </form>
             </div>
             <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white"><CloseIcon /></button>
          </div>
          <div className="mt-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto">
            {status === 'results' && (
                <div className="p-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                    {(['All', 'Articles', 'Movies & TV'] as SearchTab[]).map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 rounded-full text-sm font-semibold ${activeTab === tab ? 'bg-deep-red text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{tab}</button>
                    ))}
                </div>
            )}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleResults: React.FC<{articles: Article[], onArticleSelect: (a: Article) => void}> = ({ articles, onArticleSelect }) => (
    <section>
        <h3 className="flex items-center gap-2 font-bold mb-3 text-lg"><DocumentTextIcon className="w-5 h-5"/> Articles</h3>
        <div className="space-y-4">
            {articles.map(article => (
                <button key={article.id} onClick={() => onArticleSelect(article)} className="w-full flex items-start text-left gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <img src={article.imageUrl} alt={article.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                    <div>
                        <p className="font-semibold line-clamp-2">{article.title}</p>
                        <p className="text-sm text-deep-red dark:text-gold">{article.category}</p>
                    </div>
                </button>
            ))}
        </div>
    </section>
);

const MovieResults: React.FC<{movies: StreamingContent[], onMovieSelect: (m: StreamingContent) => void, onWatchTrailer: (url: string) => void, isFullWidth?: boolean}> = ({ movies, onMovieSelect, onWatchTrailer, isFullWidth = false }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    if (isFullWidth) {
        return (
            <section>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movies.map(movie => <MovieCard key={movie.id} item={movie} onWatchMovie={onMovieSelect} onWatchTrailer={onWatchTrailer} />)}
                </div>
            </section>
        );
    }
    return (
        <section>
            <h3 className="flex items-center gap-2 font-bold mb-3 text-lg"><MoviesTVIcon className="w-5 h-5"/> Movies & TV</h3>
            <div className="relative">
                <div ref={scrollRef} className="flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                    {movies.map(movie => (
                        <div key={movie.id} className="w-36 sm:w-40 flex-shrink-0">
                           <MovieCard item={movie} onWatchMovie={onMovieSelect} onWatchTrailer={onWatchTrailer} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const SuggestedQuestions: React.FC<{questions: string[], onQuestionClick: (q: string) => void}> = ({ questions, onQuestionClick }) => (
    <section>
        <h3 className="flex items-center gap-2 font-bold mb-3 text-lg"><QuestionMarkCircleIcon className="w-5 h-5"/> Explore Further</h3>
        <div className="flex flex-wrap gap-2">
            {questions.map(q => (
                <button key={q} onClick={() => onQuestionClick(q)} className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-full text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                    {q}
                </button>
            ))}
        </div>
    </section>
);

export default SearchModal;