import React from 'react';
import type { Article } from '../types';
import SummarizeIcon from './icons/SummarizeIcon';
import BrainIcon from './icons/BrainIcon';
import TextToSpeechIcon from './icons/TextToSpeechIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import DownloadIcon from './icons/DownloadIcon';
import CheckIcon from './icons/CheckIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import SentimentIndicator from './SentimentIndicator';
import TranslateIcon from './icons/TranslateIcon';

interface ArticleCardProps {
  article: Article;
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
  onTextToSpeech: (article: Article) => void;
  onTranslate: (article: Article) => void;
  onReadMore: (article: Article) => void;
  audioState: {
    playingArticleId: number | null;
    isGenerating: boolean;
  };
  isBookmarked: boolean;
  onToggleBookmark: (articleId: number) => void;
  offlineArticleIds: number[];
  downloadingArticleId: number | null;
  onDownloadArticle: (article: Article) => void;
  featured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSummarize,
  onExplainSimply,
  onTextToSpeech,
  onTranslate,
  onReadMore,
  audioState,
  isBookmarked,
  onToggleBookmark,
  offlineArticleIds,
  downloadingArticleId,
  onDownloadArticle,
  featured = false,
}) => {
  const isAudioPlaying = audioState.playingArticleId === article.id;
  const isOffline = offlineArticleIds.includes(article.id);
  const isDownloading = downloadingArticleId === article.id;

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    onReadMore(article);
  };

  const ActionButton: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string; disabled?: boolean; }> = ({ onClick, icon, label, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <article className={`bg-white dark:bg-slate-800/50 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl ${featured ? 'flex flex-col lg:flex-row' : ''}`}>
      <div className={`${featured ? 'lg:w-1/2' : ''} relative`}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className={`w-full object-cover ${featured ? 'h-full' : 'h-64'}`}
        />
        <div className="absolute top-4 left-4 bg-deep-red text-white text-xs font-bold px-2 py-1 rounded">{article.category}</div>
      </div>
      <div className={`flex flex-col ${featured ? 'lg:w-1/2' : ''} p-6 density-compact:p-4`}>
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-slate-500">{article.author} &bull; {article.date}</p>
            <SentimentIndicator sentiment={article.sentiment} />
          </div>
          <h3 className={`font-extrabold leading-tight mb-3 ${featured ? 'text-3xl' : 'text-2xl'}`}>
            <a href="#" onClick={handleReadMore} className="hover:underline">{article.title}</a>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4 density-compact:text-sm">{article.excerpt}</p>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <ActionButton onClick={() => onSummarize(article)} icon={<SummarizeIcon className="w-5 h-5" />} label="Summarize" />
            <ActionButton onClick={() => onExplainSimply(article)} icon={<BrainIcon className="w-5 h-5" />} label="Explain" />
             <ActionButton onClick={() => onTranslate(article)} icon={<TranslateIcon className="w-5 h-5" />} label="Translate" />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onToggleBookmark(article.id)} title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}>
              <BookmarkIcon filled={isBookmarked} className={`w-5 h-5 transition-colors ${isBookmarked ? 'text-deep-red' : 'text-slate-400 hover:text-deep-red'}`} />
            </button>
            <button
              onClick={() => onDownloadArticle(article)}
              disabled={isOffline || isDownloading}
              title={isOffline ? 'Article saved for offline' : 'Save for offline'}
            >
              {isDownloading ? <LoadingSpinner className="text-slate-400"/> : isOffline ? <CheckIcon className="text-green-500" /> : <DownloadIcon className="text-slate-400 hover:text-deep-red" />}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;