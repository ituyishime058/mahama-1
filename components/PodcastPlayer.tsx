import React, { useState, useEffect, useRef } from 'react';
import type { Podcast } from '../types';
import CloseIcon from './icons/CloseIcon';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import ForwardIcon from './icons/ForwardIcon';
import BackwardIcon from './icons/BackwardIcon';

interface PodcastPlayerProps {
  activePodcast: Podcast | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ activePodcast, isPlaying, onPlayPause, onClose }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Audio play failed", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (activePodcast && audioRef.current) {
        audioRef.current.src = activePodcast.audioUrl;
        if(isPlaying) {
             audioRef.current.play().catch(e => console.error("Audio play failed", e));
        }
    }
  }, [activePodcast]);
  
  useEffect(() => {
    if(audioRef.current) {
        audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);


  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      if (duration) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current?.duration) {
      const seekTime = (Number(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
    }
  };

  const skip = (amount: number) => {
    if(audioRef.current) {
      audioRef.current.currentTime += amount;
    }
  };

  if (!activePodcast) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <div className="bg-white/90 dark:bg-navy/90 backdrop-blur-sm rounded-t-lg shadow-2xl p-4 flex items-center gap-4 border-t border-slate-200 dark:border-slate-700">
          <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={onPlayPause} hidden />
          <img src={activePodcast.imageUrl} alt={activePodcast.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
          <div className="flex-grow min-w-0">
            <p className="font-bold text-slate-800 dark:text-white truncate">{activePodcast.title}</p>
            <p className="text-sm text-slate-500 truncate">{activePodcast.author}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-slate-700 dark:text-slate-200">
            <button onClick={() => skip(-15)} title="Skip 15s back"><BackwardIcon className="w-6 h-6"/></button>
            <button onClick={onPlayPause} className="w-12 h-12 flex items-center justify-center bg-deep-red text-white rounded-full flex-shrink-0">
              {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
            </button>
            <button onClick={() => skip(15)} title="Skip 15s forward"><ForwardIcon className="w-6 h-6"/></button>
          </div>
           <div className="w-32 sm:w-48 hidden md:block">
            <input
              type="range"
              value={progress || 0}
              onChange={handleSeek}
              className="w-full h-1 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer range-sm"
              style={{
                background: `linear-gradient(to right, #b91c1c ${progress}%, #e5e7eb ${progress}%)`
              }}
            />
          </div>
          <div className="hidden sm:block">
            <select value={playbackRate} onChange={e => setPlaybackRate(Number(e.target.value))} className="bg-transparent font-semibold text-sm rounded-md p-1">
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
            </select>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white">
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;