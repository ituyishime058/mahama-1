

import React, { useState, useEffect, useRef } from 'react';
import { generateAnchorVideo } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import VideoCameraIcon from './icons/VideoCameraIcon';
import { useTranslation } from '../hooks/useTranslation';

interface AiAnchorVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  script: string | null;
}

const loadingMessages = [
    'videoLoadingMessage1',
    'videoLoadingMessage2',

    'videoLoadingMessage3',
    'videoLoadingMessage4',
    'videoLoadingMessage5',
];

const AiAnchorVideoModal: React.FC<AiAnchorVideoModalProps> = ({ isOpen, onClose, script }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const messageIntervalRef = useRef<number | undefined>();
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen && script) {
      const generate = async () => {
        setIsLoading(true);
        setError('');
        setVideoUrl(null);
        setLoadingMessage(loadingMessages[0]);

        messageIntervalRef.current = window.setInterval(() => {
            setLoadingMessage(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                return loadingMessages[(currentIndex + 1) % loadingMessages.length];
            });
        }, 7000);

        try {
          const url = await generateAnchorVideo(script);
          setVideoUrl(`${url}&key=${process.env.API_KEY}`);
        } catch (err: any) {
          if (err.message.includes("Requested entity was not found.")) {
             setError("API key error. Please re-select your key and try again.");
             // In a real app, you'd trigger a state reset in the parent to re-prompt for the key.
          } else {
             setError(t('videoError'));
          }
          console.error(err);
        } finally {
          setIsLoading(false);
          clearInterval(messageIntervalRef.current);
        }
      };
      generate();
    }
    
    return () => {
        clearInterval(messageIntervalRef.current);
    }
  }, [isOpen, script, t]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-3xl bg-navy rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 animate-slide-up flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <VideoCameraIcon className="w-6 h-6 text-deep-red"/>
                <h3 className="font-bold text-xl text-white">{t('aiAnchorVideo')}</h3>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white"><CloseIcon /></button>
        </div>

        <div className="aspect-video bg-black flex items-center justify-center">
            {isLoading ? (
                <div className="text-center text-white">
                    <LoadingSpinner className="w-12 h-12 mx-auto text-deep-red" />
                    <p className="mt-4 font-semibold">{t(loadingMessage)}</p>
                    <p className="text-sm text-slate-400 mt-1">{t('generatingVideoDesc')}</p>
                </div>
            ) : error ? (
                <p className="text-red-400 p-4 text-center">{error}</p>
            ) : videoUrl ? (
                <video src={videoUrl} controls autoPlay className="w-full h-full" />
            ) : null}
        </div>
      </div>
    </div>
  );
};

export default AiAnchorVideoModal;
