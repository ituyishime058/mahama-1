import React, { useState, useEffect } from 'react';
import type { Article } from '../types';
import CloseIcon from './icons/CloseIcon';
import BookmarkIcon from './icons/BookmarkIcon';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onToggleBookmark: (articleId: number) => void;
  onReadArticle: (article: Article) => void;
}

const BookmarksModal: React.FC<BookmarksModalProps> = ({ isOpen, onClose, bookmarkedArticles, onToggleBookmark, onReadArticle }) => {
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

  if (!isRendered) {
    return null;
  }
  
  const handleReadClick = (e: React.MouseEvent, article: Article) => {
    e.preventDefault();
    onReadArticle(article);
    onClose();
  };
  
  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      onTransitionEnd={handleAnimationEnd}
    >
      <div 
        className={`relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ height: 'clamp(300px, 80vh, 700px)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <button onClick={onClose} aria-label="Close bookmarks" className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
            <CloseIcon />
          </button>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Bookmarks</h2>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6">
          {bookmarkedArticles.length > 0 ? (
            <div className="space-y-4">
              {bookmarkedArticles.map(article => (
                <div key={article.id} className="flex items-start space-x-4">
                  <img src={article.imageUrl} alt={article.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                  <div className="flex-grow">
                    <p className="text-xs font-semibold uppercase text-deep-red">{article.category}</p>
                    <h3 className="font-semibold leading-tight hover:underline">
                       <a href="#" onClick={(e) => handleReadClick(e, article)}>{article.title}</a>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{article.author} &bull; {article.date}</p>
                  </div>
                  <button 
                    onClick={() => onToggleBookmark(article.id)} 
                    title="Remove bookmark"
                    className="p-2 text-slate-500 hover:text-deep-red dark:hover:text-gold"
                  >
                    <BookmarkIcon filled={true} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-500 dark:text-slate-400 h-full flex flex-col justify-center items-center">
                <BookmarkIcon className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-600" />
              <h3 className="font-semibold text-lg">No Bookmarks Yet</h3>
              <p>Click the bookmark icon on any article to save it for later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksModal;