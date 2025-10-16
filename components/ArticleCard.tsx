import React from 'react';
import type { Article } from '../types';
import SummarizeIcon from './icons/SummarizeIcon';
import TextToSpeechIcon from './icons/TextToSpeechIcon';
import BrainIcon from './icons/BrainIcon';
import PauseIcon from './icons/PauseIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import BookmarkIcon from './icons/BookmarkIcon';

interface ArticleCardProps {
  article: Article;
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
  onTextToSpeech: (article: Article) => void;
  onReadMore: (article: Article) => void;
  isAudioPlaying: boolean;
  isAudioLoading: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: number) => void;
  featured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onSummarize, 
  onExplainSimply, 
  onTextToSpeech,
  onReadMore, 
  isAudioPlaying, 
  isAudioLoading,
  isBookmarked,
  onToggleBookmark,
  featured = false
}) => {
  
  const handleCardAction = (e: React.MouseEvent, action: (article: Article) => void) => {
    e.preventDefault();
    e.stopPropagation();
    action(article);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleBookmark(article.id);
  };

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onReadMore(article);
  };

  const renderTTSButton = () => {
    if (isAudioLoading) return <LoadingSpinner />;
    if (isAudioPlaying) return <PauseIcon />;
    return <TextToSpeechIcon />;
  };
  
  if (featured) {
    return (
      <div 
        onClick={handleReadMoreClick}
        className="group relative bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 flex flex-col md:flex-row ring-2 ring-transparent hover:ring-deep-red dark:hover:ring-gold cursor-pointer"
      >
        <div className="relative overflow-hidden md:w-1/2">
            <img src={article.imageUrl} alt={article.title} className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
            <div className="absolute top-0 right-0 bg-deep-red text-white text-xs font-bold px-3 py-1 m-2 rounded-full z-10">{article.category}</div>
        </div>
        <div className="p-5 flex flex-col flex-grow md:w-1/2">
          <h3 className="text-2xl font-bold mb-2 leading-tight group-hover:text-deep-red dark:group-hover:text-gold transition-colors duration-200">
            {article.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-4 flex-grow">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
            <p>{article.author} &bull; {article.date}</p>
            <div className="flex items-center space-x-1">
               <button onClick={handleBookmarkClick} title={isBookmarked ? "Remove bookmark" : "Bookmark article"} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10 relative">
                <BookmarkIcon filled={isBookmarked} />
              </button>
              <button onClick={(e) => handleCardAction(e, onSummarize)} title="Summarize with AI" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10 relative">
                  <SummarizeIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={handleReadMoreClick} className="group relative bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 flex flex-col ring-2 ring-transparent hover:ring-deep-red dark:hover:ring-gold cursor-pointer">
      <div className="relative overflow-hidden">
        <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
        <div className="absolute top-0 right-0 bg-deep-red text-white text-xs font-bold px-3 py-1 m-2 rounded-full z-10">{article.category}</div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2 leading-tight group-hover:text-deep-red dark:group-hover:text-gold transition-colors duration-200">
          {article.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 flex-grow">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
          <p>{article.author} &bull; {article.date}</p>
          <div className="flex items-center space-x-1">
             <button onClick={handleBookmarkClick} title={isBookmarked ? "Remove bookmark" : "Bookmark article"} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10 relative">
              <BookmarkIcon filled={isBookmarked} />
            </button>
            <div className="flex items-center space-x-1 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
               <button onClick={(e) => handleCardAction(e, onSummarize)} title="Summarize with AI" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10 relative">
                  <SummarizeIcon />
              </button>
              <button onClick={(e) => handleCardAction(e, onExplainSimply)} title="Explain Simply with AI" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10 relative">
                  <BrainIcon />
              </button>
              <button onClick={(e) => handleCardAction(e, onTextToSpeech)} title="Listen to article" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10 relative">
                  {renderTTSButton()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
