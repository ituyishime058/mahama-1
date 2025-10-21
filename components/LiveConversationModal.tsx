

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob as GenaiBlob } from "@google/genai";
import CloseIcon from './icons/CloseIcon';
import MicIcon from './icons/MicIcon';
import { encode, decode, decodeAudioData } from '../utils/audio';
import WaveformIcon from './icons/WaveformIcon';

interface LiveConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TranscriptionEntry = {
    speaker: 'user' | 'model';
    text: string;
};

const LiveConversationModal: React.FC<LiveConversationModalProps> = ({ isOpen, onClose }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<TranscriptionEntry[]>([]);
  const [interimUserTranscript, setInterimUserTranscript] = useState('');

  const inputAudioContextRef = useRef<AudioContext>();
  const outputAudioContextRef = useRef<AudioContext>();
  const mediaStreamRef = useRef<MediaStream>();
  const scriptProcessorRef = useRef<ScriptProcessorNode>();
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  const currentInputTranscription = useRef('');
  const currentOutputTranscription = useRef('');

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcription, interimUserTranscript]);

  const stopSession = useCallback(() => {
    sessionPromiseRef.current?.then(s => s?.close());
    
    if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = undefined;
    }
    if (scriptProcessorRef.current) {
        scriptProcessorRef.current.disconnect();
        scriptProcessorRef.current = undefined;
    }
     if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
        inputAudioContextRef.current.close();
    }
    if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
        outputAudioContextRef.current.close();
    }
    
    setIsListening(false);
    setIsConnecting(false);
    sessionPromiseRef.current = null;
  }, []);

  const handleClose = () => {
    stopSession();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
        stopSession();
    }
    return () => {
        stopSession();
    };
  }, [isOpen, stopSession]);

  const startSession = async () => {
    setIsConnecting(true);
    setError(null);
    setTranscription([]);
    setInterimUserTranscript('');
    currentInputTranscription.current = '';
    currentOutputTranscription.current = '';
    nextStartTimeRef.current = 0;
    sourcesRef.current.clear();

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        sessionPromiseRef.current = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                inputAudioTranscription: {},
                outputAudioTranscription: {},
                systemInstruction: 'You are a helpful and friendly news assistant for Mahama News Hub. You are a world-class AI. Keep your answers concise and informative.',
            },
            callbacks: {
                onopen: () => {
                    if (!inputAudioContextRef.current || inputAudioContextRef.current.state === 'closed') return;
                    setIsConnecting(false);
                    setIsListening(true);
                    
                    const source = inputAudioContextRef.current.createMediaStreamSource(stream);
                    scriptProcessorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                    
                    scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                        const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                        const l = inputData.length;
                        const int16 = new Int16Array(l);
                        for (let i = 0; i < l; i++) {
                            int16[i] = inputData[i] * 32768;
                        }
                        const pcmBlob: GenaiBlob = {
                            data: encode(new Uint8Array(int16.buffer)),
                            mimeType: 'audio/pcm;rate=16000',
                        };
                        
                        sessionPromiseRef.current?.then((activeSession) => {
                            if (activeSession) {
                                activeSession.sendRealtimeInput({ media: pcmBlob });
                            }
                        });
                    };
                    source.connect(scriptProcessorRef.current);
                    scriptProcessorRef.current.connect(inputAudioContextRef.current.destination);
                },
                onmessage: async (message: LiveServerMessage) => {
                    if (message.serverContent?.inputTranscription) {
                        const newText = currentInputTranscription.current + message.serverContent.inputTranscription.text;
                        if (message.serverContent.inputTranscription.isFinal) {
                            currentInputTranscription.current = newText;
                        }
                        setInterimUserTranscript(newText);
                    }
                    if (message.serverContent?.outputTranscription) {
                        currentOutputTranscription.current += message.serverContent.outputTranscription.text;
                    }
                    if (message.serverContent?.turnComplete) {
                        const userInput = currentInputTranscription.current.trim();
                        const modelOutput = currentOutputTranscription.current.trim();
                        setInterimUserTranscript('');
                        
                        setTranscription(prev => {
                            const newHistory = [...prev];
                            if (userInput) newHistory.push({ speaker: 'user', text: userInput });
                            if (modelOutput) newHistory.push({ speaker: 'model', text: modelOutput });
                            return newHistory;
                        });

                        currentInputTranscription.current = '';
                        currentOutputTranscription.current = '';
                    }

                    const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                    if (base64Audio && outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
                        const outputContext = outputAudioContextRef.current;
                        nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputContext.currentTime);
                        
                        const audioBuffer = await decodeAudioData(decode(base64Audio), outputContext, 24000, 1);
                        const source = outputContext.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(outputContext.destination);
                        
                        source.addEventListener('ended', () => sourcesRef.current.delete(source));
                        source.start(nextStartTimeRef.current);
                        nextStartTimeRef.current += audioBuffer.duration;
                        sourcesRef.current.add(source);
                    }
                    if(message.serverContent?.interrupted) {
                         for (const source of sourcesRef.current.values()) {
                            source.stop(0);
                         }
                        sourcesRef.current.clear();
                        nextStartTimeRef.current = 0;
                    }
                },
                onerror: (e: ErrorEvent) => {
                    console.error('Session error:', e);
                    setError('An error occurred during the session.');
                    stopSession();
                },
                onclose: (e: CloseEvent) => {
                    stopSession();
                },
            },
        });

    } catch (err) {
        console.error('Failed to start session:', err);
        setError('Could not access microphone. Please check your permissions.');
        setIsConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={handleClose}>
        <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col transform transition-all duration-300" style={{ height: 'clamp(400px, 80vh, 600px)' }} onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between flex-shrink-0">
                <h2 className="text-xl font-bold">Live Conversation</h2>
                <button onClick={handleClose}><CloseIcon /></button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {transcription.map((entry, index) => (
                    <div key={index} className={`flex ${entry.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${entry.speaker === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                            {entry.text}
                        </div>
                    </div>
                ))}
                {interimUserTranscript && (
                    <div className="flex justify-end">
                        <div className="max-w-[80%] p-3 rounded-lg bg-blue-500 text-white opacity-70">
                            {interimUserTranscript}
                            <span className="inline-block w-2 h-4 bg-white animate-blink ml-1"></span>
                        </div>
                    </div>
                )}
                <div ref={transcriptEndRef} />
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center flex-shrink-0">
                {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
                {!isListening ? (
                    <button onClick={startSession} disabled={isConnecting} className="w-20 h-20 bg-deep-red rounded-full text-white flex items-center justify-center transition-transform hover:scale-105 disabled:bg-slate-400">
                        {isConnecting ? <WaveformIcon isAnimating={true} /> : <MicIcon className="w-8 h-8" />}
                    </button>
                ) : (
                    <button onClick={stopSession} className="w-20 h-20 bg-slate-500 rounded-full text-white flex items-center justify-center">
                       <WaveformIcon isAnimating={true} />
                    </button>
                )}
                 <p className="text-sm text-slate-500 mt-3 h-5">
                    {isConnecting ? "Connecting..." : isListening ? "Listening... (Talk now)" : "Start a conversation with our AI"}
                </p>
            </div>
        </div>
    </div>
  );
};

export default LiveConversationModal;