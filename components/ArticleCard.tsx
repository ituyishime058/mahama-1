import React from 'react';
import type { Article } from '../types';
import SummarizeIcon from './icons/SummarizeIcon';
import BrainIcon from './icons/BrainIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import DownloadIcon from './icons/DownloadIcon';
import CheckIcon from './icons/CheckIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import SentimentIndicator from './SentimentIndicator';
import TextToSpeechIcon from './icons/TextToSpeechIcon';
import CompareIcon from './icons/CompareIcon';
import { useTranslation } from '../hooks/useTranslation';

interface ArticleCardProps {
  article: Article;
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
  onTextToSpeech: (article: Article) => void;
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
  comparisonList: number[];
  onAddToCompare: (articleId: number) => void;
  featured?: boolean;
  layout?: 'default' | 'grid';
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSummarize,
  onExplainSimply,
  onTextToSpeech,
  onReadMore,
  audioState,
  isBookmarked,
  onToggleBookmark,
  offlineArticleIds,
  downloadingArticleId,
  onDownloadArticle,
  comparisonList,
  onAddToCompare,
  featured = false,
  layout = 'default',
}) => {
  const isOffline = offlineArticleIds.includes(article.id);
  const isDownloading = downloadingArticleId === article.id;
  const { t } = useTranslation();
  const isInCompare = comparisonList.includes(article.id);

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    onReadMore(article);
  };

  const ActionButton: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string; disabled?: boolean; isActive?: boolean; }> = ({ onClick, icon, label, disabled, isActive }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isActive ? 'text-deep-red dark:text-gold' : 'text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const isGridLayout = layout === 'grid';

  return (
    <article className={`group bg-white dark:bg-slate-800/50 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 dark:hover:shadow-gold/10 flex flex-col ${featured ? 'lg:flex-row' : ''}`}>
      <div className={`${featured ? 'lg:w-1/2' : ''} relative overflow-hidden`}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${featured ? 'h-full' : isGridLayout ? 'h-48' : 'h-64'}`}
        />
        <div className="absolute top-2 left-2 bg-deep-red text-white text-xs font-bold px-2 py-1 rounded">{article.category}</div>
      </div>
      <div className={`flex flex-col flex-grow ${featured ? 'lg:w-1/2' : ''} p-4 sm:p-6`}>
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs sm:text-sm text-slate-500">{article.author} &bull; {article.date}</p>
            {!isGridLayout && <SentimentIndicator sentiment={article.sentiment} />}
          </div>
          <h3 className={`font-extrabold leading-tight mb-2 sm:mb-3 ${featured ? 'text-3xl' : isGridLayout ? 'text-lg' : 'text-2xl'}`}>
            <a href="#" onClick={handleReadMore} className="group-hover:text-deep-red dark:group-hover:text-gold transition-colors duration-300 line-clamp-3">{article.title}</a>
          </h3>
          <p className={`text-slate-600 dark:text-slate-400 mb-4 ${isGridLayout ? 'text-sm line-clamp-2' : ''}`}>{article.excerpt}</p>
        </div>

        <div className={`border-t border-slate-200 dark:border-slate-700 pt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 ${isGridLayout ? 'flex-col items-start' : ''}`}>
          <div className={`flex items-center gap-4 flex-wrap ${isGridLayout ? 'order-2 w-full justify-start' : ''}`}>
            <ActionButton onClick={() => onSummarize(article)} icon={<SummarizeIcon className="w-5 h-5" />} label={t('summarize')} />
            <ActionButton onClick={() => onExplainSimply(article)} icon={<BrainIcon className="w-5 h-5" />} label={t('explain')} />
            <ActionButton onClick={() => onTextToSpeech(article)} icon={<TextToSpeechIcon className="w-5 h-5" />} label={t('listen')} />
            <ActionButton 
                onClick={() => onAddToCompare(article.id)} 
                icon={<CompareIcon className="w-5 h-5" />} 
                label={isInCompare ? t('removeFromCompare') : t('compare')}
                isActive={isInCompare}
                disabled={!isInCompare && comparisonList.length >= 2}
            />
          </div>
          <div className={`flex items-center gap-2 ${isGridLayout ? 'order-1 self-end mb-2' : ''}`}>
            <button onClick={() => onToggleBookmark(article.id)} title={isBookmarked ? t('removeBookmark') : t('bookmark')}>
              <BookmarkIcon filled={isBookmarked} className={`w-5 h-5 transition-colors ${isBookmarked ? 'text-deep-red' : 'text-slate-400 hover:text-deep-red'}`} />
            </button>
            <button
              onClick={() => onDownloadArticle(article)}
              disabled={isOffline || isDownloading}
              title={isOffline ? t('articleSavedForOffline') : t('saveForOffline')}
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