import React, { useEffect, useState, useRef } from 'react';
import type { Article, Settings, ChatMessage } from '../types';
import { generateAuthorResponse } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import SendIcon from './icons/SendIcon';

interface AskAuthorModalProps {
  isOpen: boolean;
  article: Article | null;
  settings: Settings;
  onClose: () => void;
}

const AskAuthorModal: React.FC<AskAuthorModalProps> = ({ isOpen, article, settings, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMessages([]);
        setInput('');
        setIsLoading(false);
        setError('');
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article || !input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input, id: Date.now() };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);
    setError('');

    const modelMessage: ChatMessage = { role: 'model', content: '', id: Date.now() + 1 };
    setMessages(prev => [...prev, modelMessage]);

    try {
      const stream = await generateAuthorResponse(article, input, messages, settings);
      for await (const chunk of stream) {
        setMessages(prev => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg && lastMsg.role === 'model') {
                lastMsg.content += chunk;
                return [...prev.slice(0, -1), lastMsg];
            }
            return prev;
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate response.');
       setMessages(prev => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg && lastMsg.role === 'model') {
                lastMsg.content = "Sorry, an error occurred. Please try again.";
                return [...prev.slice(0, -1), lastMsg];
            }
            return prev;
        });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !article) return null;

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
                <img src={`https://i.pravatar.cc/150?u=${article.author.replace(/\s+/g, '')}`} alt={article.author} className="w-10 h-10 rounded-full" />
                <div>
                    <h3 className="font-bold text-2xl">Ask {article.author}</h3>
                    <p className="text-sm text-slate-500 mt-1">Chat with an AI persona of the author.</p>
                </div>
            </div>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto space-y-4">
            {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-deep-red text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
                        {msg.content}
                    </div>
                </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'model' && (
                <div className="flex justify-start">
                    <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700">
                        <span className="inline-block w-2 h-4 bg-slate-500 dark:bg-slate-300 animate-blink"></span>
                    </div>
                </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div ref={chatEndRef}></div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
            <div className="relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., What was the biggest challenge..."
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
  );
};

export default AskAuthorModal;