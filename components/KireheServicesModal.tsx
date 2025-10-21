import React, { useEffect, useState, useRef } from 'react';
import type { ChatMessage } from '../types';
import { getKireheInfo } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import SendIcon from './icons/SendIcon';
import KireheServicesIcon from './icons/KireheServicesIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import { useTranslation } from '../hooks/useTranslation';

interface KireheServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KireheServicesModal: React.FC<KireheServicesModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
        setMessages([{ role: 'model', content: t('kireheWelcome'), id: Date.now() }]);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            () => {
                setError(t('kireheGeolocation'));
            }
        );
    } else {
      setTimeout(() => {
        setMessages([]);
        setInput('');
        setIsLoading(false);
        setError('');
        setLocation(null);
      }, 300);
    }
  }, [isOpen, t]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent | string) => {
    if (typeof e !== 'string') e.preventDefault();
    const question = (typeof e === 'string') ? e : input;
    if (!question.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: question, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    if (typeof e !== 'string') setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await getKireheInfo(question, location);
      const modelMessage: ChatMessage = { role: 'model', content: response, id: Date.now() + 1 };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err: any) {
      setError(err.message || 'Failed to get information.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const starterPrompts = [t('kirehePrompt1'), t('kirehePrompt2'), t('kirehePrompt3')];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 animate-slide-up flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ height: 'clamp(500px, 80vh, 700px)' }}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
                <CloseIcon />
            </button>
            <div className="flex items-center gap-3">
                <KireheServicesIcon className="w-8 h-8 text-deep-red dark:text-gold" />
                <div>
                    <h3 className="font-bold text-2xl">{t('kireheServices')}</h3>
                    <p className="text-sm text-slate-500 mt-1">{t('kireheServicesDesc')}</p>
                </div>
            </div>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto space-y-4">
            {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-lg text-sm prose dark:prose-invert max-w-none ${msg.role === 'user' ? 'bg-deep-red text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
                        <p dangerouslySetInnerHTML={{__html: msg.content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>')}}></p>
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700">
                        <span className="inline-block w-2 h-4 bg-slate-500 dark:bg-slate-300 animate-blink"></span>
                    </div>
                </div>
            )}
            <div ref={chatEndRef}></div>
        </div>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
            {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {starterPrompts.map(prompt => (
                        <button key={prompt} onClick={() => handleSubmit(prompt)} className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-full text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                            {prompt}
                        </button>
                    ))}
                </div>
            )}
            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('kireheAskPlaceholder')}
                    disabled={isLoading}
                    className="w-full p-3 pr-12 bg-slate-100 dark:bg-slate-700 rounded-full border-transparent focus:ring-2 focus:ring-deep-red"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-deep-red text-white rounded-full flex items-center justify-center disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-colors"
                >
                    <SendIcon className="w-5 h-5" />
                </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default KireheServicesModal;