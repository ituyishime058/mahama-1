import React, { useEffect, useState, useRef } from 'react';
import type { Article, Settings, ChatMessage } from '../types';
import { analyzeImage } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import SendIcon from './icons/SendIcon';
import SparklesIcon from './icons/SparklesIcon';

interface ImageAnalysisModalProps {
  isOpen: boolean;
  article: Article | null;
  settings: Settings;
  onClose: () => void;
}

// Utility to convert image URL to base64
const imageUrlToBase64 = async (url: string): Promise<{ base64: string; mimeType: string }> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            // remove the header from the base64 string
            const base64 = base64String.split(',')[1];
            resolve({ base64, mimeType: blob.type });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

const ImageAnalysisModal: React.FC<ImageAnalysisModalProps> = ({ isOpen, article, settings, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageBase64, setImageBase64] = useState<{ base64: string; mimeType: string } | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const suggestedQuestions = ["Describe this image in detail.", "What is the context of this image?", "Are there any notable objects or people?"];

  useEffect(() => {
    if (isOpen && article) {
      setMessages([{ role: 'model', content: 'What would you like to know about this image?', id: Date.now() }]);
      const convertImage = async () => {
        setIsLoading(true);
        try {
          const data = await imageUrlToBase64(article.imageUrl);
          setImageBase64(data);
        } catch (e) {
          setError('Could not load image for analysis.');
        } finally {
            setIsLoading(false);
        }
      };
      convertImage();
    } else {
      setTimeout(() => {
        setMessages([]);
        setInput('');
        setIsLoading(false);
        setError('');
        setImageBase64(null);
      }, 300);
    }
  }, [isOpen, article]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent | string) => {
    if (typeof e !== 'string') e.preventDefault();
    const question = (typeof e === 'string') ? e : input;
    if (!imageBase64 || !question.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: question, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    if (typeof e !== 'string') setInput('');
    setIsLoading(true);
    setError('');

    const modelMessage: ChatMessage = { role: 'model', content: '', id: Date.now() + 1 };
    setMessages(prev => [...prev, modelMessage]);

    try {
      const stream = await analyzeImage(imageBase64.base64, imageBase64.mimeType, question, messages, settings);
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
                lastMsg.content = "Sorry, an error occurred during analysis. Please try again.";
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
        className="relative w-full max-w-4xl bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 animate-slide-up flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
        style={{ height: 'clamp(500px, 90vh, 700px)' }}
      >
        <div className="w-full md:w-1/2 flex-shrink-0 bg-black">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-contain" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white z-10"><CloseIcon /></button>
                <div className="flex items-center gap-3">
                    <SparklesIcon className="w-6 h-6 text-deep-red dark:text-gold"/>
                    <h3 className="font-bold text-xl">Analyze Image</h3>
                </div>
            </div>
            
            <div className="p-4 flex-grow overflow-y-auto space-y-4">
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
            
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                {messages.length <= 1 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {suggestedQuestions.map(prompt => (
                            <button key={prompt} onClick={() => handleSubmit(prompt)} className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-full text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="relative">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about the image..." disabled={isLoading || !imageBase64} className="w-full p-3 pr-12 bg-slate-100 dark:bg-slate-700 rounded-full border-transparent focus:ring-2 focus:ring-deep-red"/>
                    <button type="submit" disabled={isLoading || !input.trim() || !imageBase64} className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-deep-red text-white rounded-full flex items-center justify-center disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-colors">
                        <SendIcon className="w-5 h-5" />
                    </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysisModal;
