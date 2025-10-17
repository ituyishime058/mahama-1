
import React, { useState, useEffect } from 'react';
import type { Article, Settings } from '../types';
import CloseIcon from './icons/CloseIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import TranslateIcon from './icons/TranslateIcon';
import { translateArticle } from '../utils/ai';
import { LANGUAGES } from '../constants';

interface TranslationModalProps {
  isOpen: boolean;
  article: Article | null;
  settings: Settings;
  onClose: () => void;
}

const TranslationModal: React.FC<TranslationModalProps> = ({ isOpen, article, settings, onClose }) => {
  const [targetLanguage, setTargetLanguage] = useState(settings.preferredLanguage);
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
        setTargetLanguage(settings.preferredLanguage);
    }
  }, [isOpen, settings.preferredLanguage]);

  useEffect(() => {
    if (isOpen && article) {
        const handleTranslate = async () => {
        if (!article) return;
        setIsLoading(true);
        setError('');
        setTranslatedText('');
        try {
            const textToTranslate = `Title: ${article.title}\n\n${article.content}`;
            const result = await translateArticle(textToTranslate, targetLanguage, settings);
            setTranslatedText(result);
        } catch (err: any) {
            setError(err.message || 'Failed to translate.');
        } finally {
            setIsLoading(false);
        }
        };
        handleTranslate();
    }
  }, [article, targetLanguage, isOpen, settings]);
  
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col transform transition-all duration-300"
        style={{ height: 'clamp(400px, 80vh, 700px)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
            <CloseIcon />
          </button>
          <div className="flex items-center gap-3">
            <TranslateIcon className="w-7 h-7 text-deep-red dark:text-gold" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Translate Article</h2>
          </div>
          <div className="mt-4">
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-slate-300 dark:border-slate-600"
            >
              {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-6">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <LoadingSpinner className="mx-auto w-8 h-8"/>
                <p>Translating to {targetLanguage}...</p>
              </div>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {translatedText && (
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{translatedText}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationModal;
