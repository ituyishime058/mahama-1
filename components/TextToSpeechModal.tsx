import React, { useState, useEffect } from 'react';
import type { Article, Settings, AiTtsVoice } from '../types';
import { translateArticle } from '../utils/ai';
import { LANGUAGE_VOICE_MAP } from '../constants';
import CloseIcon from './icons/CloseIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import LanguageIcon from './icons/LanguageIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';

interface TextToSpeechModalProps {
  isOpen: boolean;
  article: Article | null;
  settings: Settings;
  onClose: () => void;
  onPlay: (originalArticle: Article, textToSpeak: string, voice: AiTtsVoice) => void;
}

const TextToSpeechModal: React.FC<TextToSpeechModalProps> = ({ isOpen, article, settings, onClose, onPlay }) => {
  const [targetLanguage, setTargetLanguage] = useState(settings.preferredLanguage);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTargetLanguage(settings.preferredLanguage);
      setStatus('');
      setError('');
      setIsLoading(false);
    }
  }, [isOpen, settings.preferredLanguage]);
  
  if (!isOpen || !article) return null;

  const handleTranslateAndPlay = async () => {
    if (!article) return;
    setIsLoading(true);
    setError('');

    try {
      let textToSpeak = `Title: ${article.title}. By ${article.author}. ${article.content}`;
      const voice = LANGUAGE_VOICE_MAP[targetLanguage] || 'Zephyr';

      if (targetLanguage !== 'English') {
        setStatus('Translating article...');
        textToSpeak = await translateArticle(textToSpeak, targetLanguage, settings);
      }
      
      setStatus('Preparing audio...');
      onPlay(article, textToSpeak, voice);
      onClose();

    } catch (err: any) {
      setError(err.message || 'Failed to process audio request.');
      setIsLoading(false);
      setStatus('');
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-lg shadow-xl transform transition-all duration-300 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
            <CloseIcon />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <LanguageIcon className="w-7 h-7 text-deep-red dark:text-gold" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Listen to Article</h2>
          </div>
          
          <div className="space-y-4">
            <div>
                <label htmlFor="language-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select Language</label>
                <select
                id="language-select"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                disabled={isLoading}
                className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-deep-red"
                >
                {Object.keys(LANGUAGE_VOICE_MAP).map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
            </div>
            <button
                onClick={handleTranslateAndPlay}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-deep-red text-white font-bold rounded-lg text-lg transform hover:scale-105 transition-transform disabled:bg-slate-400 disabled:scale-100"
            >
                {isLoading ? <LoadingSpinner/> : <PlayCircleIcon className="w-7 h-7"/>}
                <span>{isLoading ? status : 'Listen Now'}</span>
            </button>
            {error && <p className="text-sm text-center text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeechModal;
