import React, { useState, useEffect, useRef } from 'react';
import type { Article } from '../types';
import CloseIcon from './icons/CloseIcon';
import SummarizeIcon from './icons/SummarizeIcon';
import BrainIcon from './icons/BrainIcon';
import TextToSpeechIcon from './icons/TextToSpeechIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import PauseIcon from './icons/PauseIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import ShareIcon from './icons/ShareIcon';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
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

const ArticleModal: React.FC<ArticleModalProps> = ({ 
    article, 
    onClose,
    onSummarize,
    onExplainSimply,
    onTextToSpeech,
    audioState,
    isBookmarked,
    onToggleBookmark
}) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const content = contentRef.current;
    if (content) {
      const scrollTop = content.scrollTop;
      const scrollHeight = content.scrollHeight - content.clientHeight;
      const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollPercentage(scrolled);
    }
  };

  useEffect(() => {
    const contentElement = contentRef.current;
    if (article) {
      contentElement?.addEventListener('scroll', handleScroll);
    }
    return () => {
      contentElement?.removeEventListener('scroll', handleScroll);
    };
  }, [article]);

  useEffect(() => {
      // Reset scroll position when modal opens
      if (article) {
        setScrollPercentage(0);
        if(contentRef.current) contentRef.current.scrollTop = 0;
      }
  }, [article])

  if (!article) return null;

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
          // Fallback for browsers that don't support the Web Share API
          alert('Sharing is not supported on your browser, but you can copy the link!');
      }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
        <div 
            className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl bg-white dark:bg-slate-800 md:rounded-lg shadow-xl flex flex-col transform transition-all duration-300"
            onClick={e => e.stopPropagation()}
        >
            {/* Reading Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 z-20">
              <div 
                className="h-1 bg-gradient-to-r from-gold to-deep-red transition-all duration-100 ease-linear"
                style={{ width: `${scrollPercentage}%` }}
              />
            </div>

            <button onClick={onClose} aria-label="Close article" className="absolute top-4 right-4 text-white bg-black/30 rounded-full p-2 z-20">
                <CloseIcon />
            </button>
        
            <div ref={contentRef} className="flex-grow overflow-y-auto">
                <header className="relative h-64 md:h-80">
                    <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                        <p className="font-semibold uppercase tracking-widest text-gold text-sm">{article.category}</p>
                        <h1 className="text-2xl md:text-4xl font-extrabold !leading-tight tracking-tight mt-1">
                          {article.title}
                        </h1>
                    </div>
                </header>

                <div className="p-6 md:p-8 flex gap-8">
                    <aside className="hidden md:block w-1/4 lg:w-1/5 sticky top-8 self-start">
                        <div className="space-y-2">
                             <p className="text-sm font-bold">{article.author}</p>
                             <p className="text-xs text-slate-500">{article.date}</p>
                             <div className="pt-4 space-y-2">
                                <button onClick={() => onSummarize(article)} title="Summarize" className="w-full flex items-center gap-2 p-2 rounded-md text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <SummarizeIcon className="w-5 h-5"/> AI Summary
                                </button>
                                <button onClick={() => onExplainSimply(article)} title="Explain Simply" className="w-full flex items-center gap-2 p-2 rounded-md text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <BrainIcon className="w-5 h-5"/> Explain Simply
                                </button>
                                 <button onClick={() => onTextToSpeech(article)} title="Listen to article" className="w-full flex items-center gap-2 p-2 rounded-md text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    {renderTTSButton()} {isAudioPlaying ? 'Stop' : 'Listen'}
                                </button>
                                <button onClick={onToggleBookmark} title="Bookmark article" className="w-full flex items-center gap-2 p-2 rounded-md text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <BookmarkIcon filled={isBookmarked} className="w-5 h-5"/> Bookmark
                                </button>
                                <button onClick={handleShare} title="Share article" className="w-full flex items-center gap-2 p-2 rounded-md text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <ShareIcon className="w-5 h-5"/> Share
                                </button>
                             </div>
                        </div>
                    </aside>
                    <article className="prose prose-slate dark:prose-invert max-w-none w-full md:w-3/4 lg:w-4/5">
                        <p className="lead">{article.excerpt}</p>
                        <p>{article.content || "Full content is not available for this article."}</p>
                        {/* Example of more content */}
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
                        <p>Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
                    </article>
                </div>
            </div>
        </div>
        <style>{`
          .prose { line-height: 1.7; }
          .prose .lead { font-size: 1.25em; color: #475569; }
          .dark .prose .lead { color: #94a3b8; }
        `}</style>
    </div>
  );
};

export default ArticleModal;
