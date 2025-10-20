import React, { useState, useEffect, useRef } from 'react';
import type { Article, AiTtsVoice, AudioPlayerState } from '../types';
import { decode, decodeAudioData } from '../utils/audio';
import { textToSpeech } from '../utils/ai';

import CloseIcon from './icons/CloseIcon';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import NextIcon from './icons/NextIcon';
import PreviousIcon from './icons/PreviousIcon';
import LoadingSpinner from './icons/LoadingSpinner';

interface AudioPlayerProps {
  state: AudioPlayerState | null;
  onStateChange: (state: AudioPlayerState | null) => void;
  voice: AiTtsVoice;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ state, onStateChange, voice }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState('');
  
  const audioContextRef = useRef<AudioContext>();
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const startedAtRef = useRef(0);
  const pausedAtRef = useRef(0);
  
  const article = state?.article;
  const playlist = state?.playlist;
  const voiceOverride = state?.voiceOverride;
  const currentTrackIndex = playlist?.findIndex(a => a.id === article?.id) ?? -1;
  const voiceToUse = voiceOverride || voice;

  // Initialize AudioContext
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    return () => {
      sourceRef.current?.stop(0);
    };
  }, []);

  // Generate audio when article changes
  useEffect(() => {
    if (article) {
      const generateAndPlay = async () => {
        setIsGenerating(true);
        setError('');
        setProgress(0);
        pausedAtRef.current = 0;
        
        if (sourceRef.current) {
          sourceRef.current.onended = null;
          sourceRef.current.stop(0);
        }

        try {
          const textToGenerate = article.id === -1 ? article.content : `Article title: ${article.title}. By ${article.author}. ${article.content}`;
          const b64 = await textToSpeech(textToGenerate, voiceToUse);
          const audioBuffer = await decodeAudioData(decode(b64), audioContextRef.current!, 24000, 1);
          audioBufferRef.current = audioBuffer;
          setIsGenerating(false);
          play(0); // Autoplay
        } catch (e: any) {
          setError('Failed to generate audio.');
          console.error(e);
          setIsGenerating(false);
        }
      };
      generateAndPlay();
    }
  }, [article, voiceToUse]);
  
  const handleClose = () => onStateChange(null);

  const handleNext = () => {
      if(playlist && currentTrackIndex < playlist.length - 1) {
          onStateChange({ article: playlist[currentTrackIndex + 1], playlist });
      }
  };

  const handlePrevious = () => {
       if(playlist && currentTrackIndex > 0) {
          onStateChange({ article: playlist[currentTrackIndex - 1], playlist });
      }
  };

  const play = (offset: number) => {
    if (!audioBufferRef.current || !audioContextRef.current) return;
    
    if (sourceRef.current) {
        sourceRef.current.onended = null;
        sourceRef.current.stop(0);
    }
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.playbackRate.value = playbackRate;
    
    startedAtRef.current = audioContextRef.current.currentTime - offset;
    source.start(0, offset);
    
    source.onended = () => {
      if (isPlaying && audioBufferRef.current && Math.abs(pausedAtRef.current - audioBufferRef.current.duration) > 0.1) {
        if (playlist && currentTrackIndex < playlist.length - 1) {
            handleNext();
        } else {
            handleClose();
        }
      }
    };
    
    sourceRef.current = source;
    setIsPlaying(true);
  };
  
  const pause = () => {
    if (!sourceRef.current || !audioContextRef.current) return;
    pausedAtRef.current = audioContextRef.current.currentTime - startedAtRef.current;
    sourceRef.current.stop(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play(pausedAtRef.current);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
        if (isPlaying && audioContextRef.current && audioBufferRef.current && sourceRef.current) {
            const elapsedTime = (audioContextRef.current.currentTime - startedAtRef.current) * sourceRef.current.playbackRate.value;
            if(audioBufferRef.current.duration > 0) {
              setProgress((elapsedTime / audioBufferRef.current.duration) * 100);
            }
        }
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, playbackRate]);

  if (!article) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <div className="bg-white/90 dark:bg-navy/90 backdrop-blur-sm rounded-t-lg shadow-2xl p-4 flex items-center gap-4 border-t border-slate-200 dark:border-slate-700">
          <img src={article.imageUrl} alt={article.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
          <div className="flex-grow min-w-0">
            <p className="font-bold text-slate-800 dark:text-white truncate">{error ? error : isGenerating ? "Generating Audio..." : article.title}</p>
            <p className="text-sm text-slate-500 truncate">
                {article.author}
                {playlist && playlist.length > 1 && ` (Track ${currentTrackIndex + 1} of ${playlist.length})`}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-slate-700 dark:text-slate-200">
            <button onClick={handlePrevious} title="Previous" disabled={isGenerating || !playlist || currentTrackIndex === 0} className="disabled:opacity-30"><PreviousIcon className="w-6 h-6"/></button>
            <button onClick={handlePlayPause} disabled={isGenerating} className="w-12 h-12 flex items-center justify-center bg-deep-red text-white rounded-full flex-shrink-0 disabled:bg-slate-400">
              {isGenerating ? <LoadingSpinner/> : isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
            </button>
            <button onClick={handleNext} title="Next" disabled={isGenerating || !playlist || currentTrackIndex === playlist.length - 1} className="disabled:opacity-30"><NextIcon className="w-6 h-6"/></button>
          </div>
           <div className="w-32 sm:w-48 hidden md:block">
            <input
              type="range"
              value={progress || 0}
              disabled={true}
              className="w-full h-1 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer range-sm"
              style={{ background: `linear-gradient(to right, #b91c1c ${progress}%, #e5e7eb ${progress}%)` }}
            />
          </div>
          <div className="hidden sm:block">
            <select value={playbackRate} onChange={e => setPlaybackRate(Number(e.target.value))} disabled={isGenerating} className="bg-transparent font-semibold text-sm rounded-md p-1">
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
            </select>
          </div>
          <button onClick={handleClose} className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white">
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;