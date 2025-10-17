import React from 'react';
import type { Article } from '../types';
import SummarizeIcon from './icons/SummarizeIcon';
import BrainIcon from './icons/BrainIcon';
import TextToSpeechIcon from './icons/TextToSpeechIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import PauseIcon from './icons/PauseIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import ShareIcon from './icons/ShareIcon';

interface FloatingActionbarProps {
  article: Article;
  onSummarize: (article: Article, mode: 'summary' | 'explanation') => void;
  onExplainSimply: (article: Article, mode: 'summary' | 'explanation') => void;
  onTextToSpeech: (article: Article) => void;
  audioState: {
    playingArticleId: number | null;
    isGenerating: boolean;
  };
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const FloatingActionbar: React.FC<FloatingActionbarProps> = ({
  article,
  onSummarize,
  onExplainSimply,
  onTextToSpeech,
  audioState,
  isBookmarked,
  onToggleBookmark,
}) => {
  const isAudioPlaying = audioState.playingArticleId === article.id;
  const isAudioLoading = audioState.isGenerating && audioState.playingArticleId === article.id;

  const renderTTSButton = () => {
    if (isAudioLoading) return <LoadingSpinner />;
    if (isAudioPlaying) return <PauseIcon />;
    return <TextToSpeechIcon />;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href, // Or a specific article URL if available
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on your browser, but you can copy the link!');
    }
  };
  
  const ActionButton: React.FC<{ onClick: () => void; title: string; children: React.ReactNode; }> = ({ onClick, title, children }) => (
    <button onClick={onClick} title={title} className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700/50 hover:bg-deep-red dark:hover:bg-gold text-slate-600 dark:text-slate-300 hover:text-white transition-all duration-200">
      {children}
      <span className="absolute left-full ml-4 w-auto min-w-max rounded-md bg-slate-800 px-2 py-1 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
        {title}
      </span>
    </button>
  );

  return (
    <aside className="absolute top-0 left-0 hidden lg:block">
        <div className="sticky top-28 space-y-4">
            <ActionButton onClick={() => onSummarize(article, 'summary')} title="AI Summary">
                <SummarizeIcon />
            </ActionButton>
            <ActionButton onClick={() => onExplainSimply(article, 'explanation')} title="Explain Simply">
                <BrainIcon />
            </ActionButton>
            <ActionButton onClick={() => onTextToSpeech(article)} title={isAudioPlaying ? 'Stop Listening' : 'Listen to Article'}>
                {renderTTSButton()}
            </ActionButton>
            <ActionButton onClick={onToggleBookmark} title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}>
                <BookmarkIcon filled={isBookmarked} className={isBookmarked ? 'text-gold' : ''} />
            </ActionButton>
            <ActionButton onClick={handleShare} title="Share Article">
                <ShareIcon />
            </ActionButton>
        </div>
    </aside>
  );
};

export default FloatingActionbar;
