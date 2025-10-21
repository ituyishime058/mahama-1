

import React, { useEffect, useState } from 'react';
import type { Article, Settings } from '../types';
import { generateNewsBriefing } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import BriefingIcon from './icons/BriefingIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import PlayCircleIcon from './icons/PlayCircleIcon';
import VideoCameraIcon from './icons/VideoCameraIcon';

interface NewsBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  articles: Article[];
  onPlayBriefing: (briefingArticle: Article) => void;
  onGenerateVideo: (script: string) => void;
}

const NewsBriefingModal: React.FC<NewsBriefingModalProps> = ({ isOpen, onClose, settings, articles, onPlayBriefing, onGenerateVideo }) => {
  const [briefingScript, setBriefingScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    if (isOpen) {
        setLocalSettings(settings); // Sync with global settings on open
    }
  }, [isOpen, settings]);

  const handleGenerate = () => {
    const generateBriefing = async () => {
      setIsLoading(true);
      setError('');
      setBriefingScript('');

      const preferredArticles = articles
          .filter(a => localSettings.contentPreferences.length > 0 ? localSettings.contentPreferences.includes(a.category) : true)
          .slice(0, 5);

      if (preferredArticles.length === 0) {
          setError("No articles found for your preferred topics to generate a briefing.");
          setIsLoading(false);
          return;
      }

      try {
        const script = await generateNewsBriefing(preferredArticles, localSettings);
        setBriefingScript(script);
      } catch (err: any) {
        setError(err.message || 'Failed to generate briefing.');
      } finally {
        setIsLoading(false);
      }
    };
    generateBriefing();
  };

  const handlePlay = () => {
      if (!briefingScript) return;
      
      const briefingArticle: Article = {
          id: -1, 
          title: "Your Daily News Briefing",
          author: "Mahama News Hub AI",
          content: briefingScript,
          category: "Briefing",
          date: new Date().toLocaleDateString(),
          excerpt: "A summary of today's top stories, generated just for you.",
          imageUrl: 'https://picsum.photos/seed/briefing/400/400',
          keyTakeaways: [],
          region: 'Global',
          sentiment: 'Neutral',
      };
      onPlayBriefing(briefingArticle);
      onClose();
  }

  const handleGenerateVideo = () => {
      if (!briefingScript) return;
      onGenerateVideo(briefingScript);
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
            {isLoading ? (
                <>
                    <LoadingSpinner className="w-12 h-12 text-deep-red"/>
                    <p className="mt-4 text-lg font-semibold">Generating your personalized briefing...</p>
                    <p className="text-slate-500">This may take a moment.</p>
                </>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : briefingScript ? (
                <div className="text-center">
                    <h4 className="text-xl font-bold">Your Briefing is Ready!</h4>
                    <p className="text-slate-600 dark:text-slate-400 my-4">Listen to a summary of today's top stories based on your interests, or watch an AI news anchor deliver your briefing.</p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={handlePlay} className="flex items-center justify-center gap-3 px-6 py-3 bg-deep-red text-white font-bold rounded-full text-lg transform hover:scale-105 transition-transform">
                            <PlayCircleIcon className="w-8 h-8"/>
                            Listen Now
                        </button>
                        <button onClick={handleGenerateVideo} className="flex items-center justify-center gap-3 px-6 py-3 bg-slate-600 text-white font-bold rounded-full text-lg transform hover:scale-105 transition-transform">
                            <VideoCameraIcon className="w-8 h-8"/>
                            Watch with AI Anchor
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center w-full max-w-sm">
                    <h4 className="text-xl font-bold">Personalize Your Briefing</h4>
                    <p className="text-slate-600 dark:text-slate-400 my-4">Choose a tone for your AI news anchor.</p>
                    <div className="mb-4">
                        <label htmlFor="persona-select" className="sr-only">AI Voice Personality</label>
                        <select
                            id="persona-select"
                            value={localSettings.aiVoicePersonality}
                            onChange={(e) => setLocalSettings(prev => ({...prev, aiVoicePersonality: e.target.value as Settings['aiVoicePersonality']}))}
                            className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600 font-semibold"
                        >
                            <option value="Friendly">Friendly & Casual</option>
                            <option value="Professional">Professional & Formal</option>
                            <option value="Witty">Witty & Engaging</option>
                        </select>
                    </div>
                     <button onClick={handleGenerate} className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-deep-red text-white font-bold rounded-lg text-lg transform hover:scale-105 transition-transform">
                        Generate Briefing
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default NewsBriefingModal;