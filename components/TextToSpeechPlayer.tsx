import React, { useEffect, useRef } from 'react';
import { decode, decodeAudioData } from '../utils/audio';
import CloseIcon from './icons/CloseIcon';
import ReadAloudIcon from './icons/ReadAloudIcon';
import WaveformIcon from './icons/WaveformIcon';

interface TextToSpeechPlayerProps {
  audioBase64: string | null;
  isGenerating: boolean;
  onClose: () => void;
}

const TextToSpeechPlayer: React.FC<TextToSpeechPlayerProps> = ({ audioBase64, isGenerating, onClose }) => {
  const audioContextRef = useRef<AudioContext>();
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // FIX: Add `(window as any)` to handle vendor-prefixed `webkitAudioContext` for browser compatibility.
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    
    return () => {
      if (sourceRef.current) {
        sourceRef.current.stop();
      }
      if(audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (audioBase64 && audioContextRef.current) {
      const playAudio = async () => {
        if (sourceRef.current) {
          sourceRef.current.stop();
        }
        
        const audioBuffer = await decodeAudioData(
          decode(audioBase64),
          audioContextRef.current!,
          24000,
          1
        );
        
        const source = audioContextRef.current!.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current!.destination);
        source.start();
        sourceRef.current = source;

        source.onended = () => {
          onClose(); // Automatically close when finished
        };
      };
      
      playAudio();
    }
  }, [audioBase64, onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/80 dark:bg-navy/80 backdrop-blur-sm rounded-full shadow-2xl p-3 flex items-center gap-4 border border-slate-200 dark:border-slate-700">
            <div className="text-deep-red dark:text-gold">
                {isGenerating ? <WaveformIcon isAnimating={true} /> : <ReadAloudIcon className="w-6 h-6"/>}
            </div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">
                {isGenerating ? 'Generating audio...' : 'Reading article aloud...'}
            </p>
            <button onClick={onClose} className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white">
                <CloseIcon className="w-5 h-5"/>
            </button>
        </div>
    </div>
  );
};

export default TextToSpeechPlayer;
