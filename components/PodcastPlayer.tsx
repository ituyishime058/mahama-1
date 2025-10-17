import React, { useState, useEffect, useRef } from 'react';
import type { Podcast } from '../types';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import CloseIcon from './icons/CloseIcon';

interface PodcastPlayerProps {
  podcast: Podcast;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ podcast, isPlaying, onPlayPause, onClose }) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const durationInSeconds = parseInt(podcast.duration.split(' ')[0]) * 60;

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= durationInSeconds) {
            clearInterval(intervalRef.current!);
            return durationInSeconds;
          }
          return newProgress;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, durationInSeconds]);

  useEffect(() => {
    setProgress(0);
  }, [podcast.id]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const progressPercentage = (progress / durationInSeconds) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] animate-slide-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 dark:bg-navy/80 backdrop-blur-sm rounded-t-lg shadow-2xl p-4 flex items-center gap-4 border-t border-slate-200 dark:border-slate-700">
          <img src={podcast.imageUrl} alt={podcast.title} className="w-16 h-16 rounded-md object-cover" />
          <div className="flex-1">
            <p className="font-bold text-slate-900 dark:text-white truncate">{podcast.title}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{`Ep. ${podcast.episode}`}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-slate-500">{formatTime(progress)}</span>
            <div className="w-48 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
              <div 
                className="bg-deep-red dark:bg-gold h-1.5 rounded-full"
                style={{ width: `${progressPercentage}%`}}
              ></div>
            </div>
            <span className="text-sm font-mono text-slate-500">{podcast.duration}</span>
          </div>
          <button onClick={onPlayPause} className="bg-deep-red text-white p-3 rounded-full">
            {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
          </button>
           <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white">
            <CloseIcon className="w-5 h-5"/>
           </button>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;