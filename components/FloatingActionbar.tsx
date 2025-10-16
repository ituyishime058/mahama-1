import React, { useState, useEffect } from 'react';
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
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
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
    onToggleBookmark
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              url: window.location.href,
          }).catch(console.error);
      } else {
          alert('Sharing is not supported on your browser.');
      }
  };
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="bg-white/80 dark:bg-navy/80 backdrop-blur-sm p-2 rounded-t-lg shadow-lg max-w-md mx-auto flex justify-around items-center border border-b-0 border-slate-200 dark:border-slate-700">
                <button onClick={() => onSummarize(article)} title="AI Summary" className="flex flex-col items-center p-2 rounded-md text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <SummarizeIcon className="w-6 h-6"/> <span className="mt-1">Summary</span>
                </button>
                <button onClick={() => onExplainSimply(article)} title="Explain Simply" className="flex flex-col items-center p-2 rounded-md text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <BrainIcon className="w-6 h-6"/> <span className="mt-1">Explain</span>
                </button>
                 <button onClick={() => onTextToSpeech(article)} title="Listen to article" className="flex flex-col items-center p-2 rounded-md text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <div className="w-6 h-6 flex items-center justify-center">{renderTTSButton()}</div>
                    <span className="mt-1">{isAudioPlaying ? 'Stop' : 'Listen'}</span>
                </button>
                <button onClick={onToggleBookmark} title="Bookmark article" className="flex flex-col items-center p-2 rounded-md text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <BookmarkIcon filled={isBookmarked} className="w-6 h-6"/> <span className="mt-1">Bookmark</span>
                </button>
                <button onClick={handleShare} title="Share article" className="flex flex-col items-center p-2 rounded-md text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <ShareIcon className="w-6 h-6"/> <span className="mt-1">Share</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default FloatingActionbar;
