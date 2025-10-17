import React from 'react';
import type { Article } from '../types';
import LoadingSpinner from './icons/LoadingSpinner';
import BookmarkIcon from './icons/BookmarkIcon';
import DownloadIcon from './icons/DownloadIcon';
import CheckIcon from './icons/CheckIcon';
import ClockIcon from './icons/ClockIcon';

interface ArticleCardProps {
  article: Article;
  onReadMore: (article: Article) => void;
  featured?: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: number) => void;
  offlineArticleIds: number[];
  downloadingArticleId: number | null;
  onDownloadArticle: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onReadMore,
  featured = false,
  isBookmarked,
  onToggleBookmark,
  offlineArticleIds,
  downloadingArticleId,
  onDownloadArticle
}) => {
  const isOffline = offlineArticleIds.includes(article.id);
  const isDownloading = downloadingArticleId === article.id;

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  }

  const renderDownloadButton = () => {
    if (isDownloading) return <LoadingSpinner />;
    if (isOffline) return <CheckIcon className="text-green-500" />;
    return <DownloadIcon />;
  };

  const cardContent = (
    <>
      <div className="relative overflow-hidden rounded-t-lg md:rounded-lg">
        <img src={article.imageUrl} alt={article.title} className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${featured ? 'aspect-video' : 'h-48'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
         <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            <ClockIcon className="w-3 h-3" />
            <span>{article.readingTime} min read</span>
        </div>
      </div>
      <div className={`p-5 flex flex-col flex-grow ${featured ? 'md:col-span-2' : ''}`}>
        <p className="text-xs font-semibold uppercase text-deep-red dark:text-gold">{article.category}</p>
        <h3 className={`font-bold my-1 leading-tight flex-grow group-hover:text-deep-red dark:group-hover:text-gold transition-colors duration-200 ${featured ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
          {article.title}
        </h3>
        {featured && <p className="text-slate-600 dark:text-slate-400 mb-4 mt-2 line-clamp-3">{article.excerpt}</p>}
        <p className="text-xs text-slate-500 mt-auto">{article.author} &bull; {article.date}</p>
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end">
            <div className="flex items-center space-x-1">
                <button onClick={(e) => handleButtonClick(e, () => onDownloadArticle(article))} disabled={isOffline || isDownloading} title={isOffline ? 'Saved for offline' : 'Save for offline'} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors">{renderDownloadButton()}</button>
                <button onClick={(e) => handleButtonClick(e, () => onToggleBookmark(article.id))} title="Bookmark article" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><BookmarkIcon filled={isBookmarked} className={isBookmarked ? 'text-gold' : ''}/></button>
            </div>
        </div>
      </div>
    </>
  );

  const commonClasses = "group bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden";
  
  return (
    <div onClick={() => onReadMore(article)} className={`cursor-pointer ${commonClasses} ${featured ? 'grid grid-cols-1 md:grid-cols-3 gap-x-8 items-center' : 'flex flex-col'}`}>
      {cardContent}
    </div>
  );
};

export default ArticleCard;