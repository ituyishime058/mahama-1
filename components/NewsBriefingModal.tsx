
import React, { useEffect, useState } from 'react';
import type { Article, Settings } from '../types';
import { generateNewsBriefing } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import BriefingIcon from './icons/BriefingIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import PlayCircleIcon from './icons/PlayCircleIcon';

interface NewsBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  articles: Article[];
  onPlayBriefing: (briefingArticle: Article) => void;
}

const NewsBriefingModal: React.FC<NewsBriefingModalProps> = ({ isOpen, onClose, settings, articles, onPlayBriefing }) => {
  const [briefingScript, setBriefingScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const generateBriefing = async () => {
        setIsLoading(true);
        setError('');
        setBriefingScript('');

        // Filter top 5 articles based on user preferences or just top articles
        const preferredArticles = articles
            .filter(a => settings.contentPreferences.length > 0 ? settings.contentPreferences.includes(a.category) : true)
            .slice(0, 5);

        if (preferredArticles.length === 0) {
            setError("No articles found for your preferred topics to generate a briefing.");
            setIsLoading(false);
            return;
        }

        try {
          const script = await generateNewsBriefing(preferredArticles, settings);
          setBriefingScript(script);
        } catch (err: any) {
          setError(err.message || 'Failed to generate briefing.');
        } finally {
          setIsLoading(false);
        }
      };
      generateBriefing();
    }
  }, [isOpen, articles, settings]);

  const handlePlay = () => {
      if (!briefingScript) return;
      
      const briefingArticle: Article = {
          id: -1, // Special ID for the briefing
          title: "Your Daily News Briefing",
          author: "Mahama News AI",
          content: briefingScript,
          category: "Briefing",
          date: new Date().toLocaleDateString(),
          excerpt: "A summary of today's top stories, generated just for you.",
          imageUrl: 'https://picsum.photos/seed/briefing/400/400',
          keyTakeaways: [],
          // FIX: Added missing properties to conform to the Article type.
          region: 'Global',
          sentiment: 'Neutral',
      };
      onPlayBriefing(briefingArticle);
      onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 animate-slide-up flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ minHeight: '300px' }}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
                <CloseIcon />
            </button>
            <div className="flex items-center gap-3">
                <BriefingIcon className="w-8 h-8 text-deep-red dark:text-gold"/>
                <h3 className="font-bold text-2xl">AI News Briefing</h3>
            </div>
        </div>
        <div className="p-6 flex-grow flex flex-col items-center justify-center">
            {isLoading && (
                <>
                    <LoadingSpinner className="w-12 h-12 text-deep-red"/>
                    <p className="mt-4 text-lg font-semibold">Generating your personalized briefing...</p>
                    <p className="text-slate-500">This may take a moment.</p>
                </>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!isLoading && !error && briefingScript && (
                <div className="text-center">
                    <h4 className="text-xl font-bold">Your Briefing is Ready!</h4>
                    <p className="text-slate-600 dark:text-slate-400 my-4">Listen to a summary of today's top stories based on your interests.</p>
                    <button onClick={handlePlay} className="flex items-center gap-3 mx-auto px-6 py-3 bg-deep-red text-white font-bold rounded-full text-lg transform hover:scale-105 transition-transform">
                        <PlayCircleIcon className="w-8 h-8"/>
                        Play Now
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default NewsBriefingModal;
