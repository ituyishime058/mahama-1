import React, { useState, useRef, useEffect } from 'react';
import type { Article, ChatMessage, Settings } from '../types';
import { askAboutArticle } from '../utils/ai';
import SendIcon from './icons/SendIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';

interface ArticleCompanionProps {
  article: Article;
  settings: Settings;
}

const ArticleCompanion: React.FC<ArticleCompanionProps> = ({ article, settings }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset chat when article changes
    setMessages([]);
  }, [article]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    const modelResponse: ChatMessage = { role: 'model', content: '' };
    setMessages(prev => [...prev, modelResponse]);

    try {
      const stream = await askAboutArticle(article, input, messages, settings);
      for await (const chunk of stream) {
        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.role === 'model') {
                lastMessage.content += chunk;
                return [...prev.slice(0, -1), lastMessage];
            }
            return prev;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage.role === 'model') {
            lastMessage.content = "Sorry, I couldn't get an answer. Please try again.";
            return [...prev.slice(0, -1), lastMessage];
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md flex flex-col h-[60vh] max-h-[500px]">
      <h2 className="text-lg font-extrabold p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
        <ChatBubbleIcon className="w-5 h-5 text-deep-red dark:text-gold" />
        Article Companion
      </h2>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-sm">
          <p>Ask me anything about this article!</p>
        </div>
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-deep-red text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
              {msg.content}
              {isLoading && msg.role === 'model' && index === messages.length -1 && (
                 <span className="inline-block w-2 h-4 bg-slate-500 dark:bg-slate-300 animate-blink ml-1"></span>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="w-full p-3 pr-12 bg-slate-100 dark:bg-slate-700 rounded-full border-transparent focus:ring-2 focus:ring-deep-red"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-deep-red text-white rounded-full flex items-center justify-center disabled:bg-slate-400 dark:disabled:bg-slate-600"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </aside>
  );
};

export default ArticleCompanion;
