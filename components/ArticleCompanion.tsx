import React, { useState, useRef, useEffect } from 'react';
import type { Article, ChatMessage, Settings, KeyConcept, TimelineEvent } from '../types';
import { askAboutArticle } from '../utils/ai';
import SendIcon from './icons/SendIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import KeyIcon from './icons/KeyIcon';
import TimelineIcon from './icons/TimelineIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import KeyConcepts from './KeyConcepts';
import ArticleTimeline from './ArticleTimeline';
import { useTranslation } from '../hooks/useTranslation';

interface ArticleCompanionProps {
  article: Article;
  settings: Settings;
  keyConcepts: KeyConcept[];
  conceptsLoading: boolean;
  timelineEvents: TimelineEvent[];
  timelineLoading: boolean;
}

const ChatPanel: React.FC<{ article: Article; settings: Settings }> = ({ article, settings }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
  
    useEffect(() => {
      setMessages([]);
    }, [article]);
  
    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent | string) => {
        if (typeof e !== 'string') e.preventDefault();
        const question = (typeof e === 'string') ? e : input;
        if (!question.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: question, id: Date.now() };
        const currentMessages = [...messages, userMessage];
        setMessages(currentMessages);

        if (typeof e !== 'string') setInput('');
        setIsLoading(true);
        
        const modelMessage: ChatMessage = { role: 'model', content: '', id: Date.now() + 1 };
        setMessages(prev => [...prev, modelMessage]);

        try {
            const stream = await askAboutArticle(article, question, messages, settings);
            for await (const chunk of stream) {
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage && lastMessage.role === 'model') {
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
                if (lastMessage && lastMessage.role === 'model') {
                    lastMessage.content = "Sorry, I couldn't get an answer. Please try again.";
                    return [...prev.slice(0, -1), lastMessage];
                }
                return prev;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const suggestedQuestions = [
        t('suggestedQuestion1'),
        `Who is ${article.author}?`,
        t('suggestedQuestion3'),
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-sm">
                    <p className="font-semibold mb-2">{t('askAnything')}</p>
                    <div className="flex flex-col items-start gap-1">
                        {suggestedQuestions.map(q => (
                            <button key={q} onClick={() => handleSubmit(q)} className="text-xs text-deep-red dark:text-gold hover:underline text-left">
                                &rarr; {q}
                            </button>
                        ))}
                    </div>
                </div>
                {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-deep-red text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
                    {msg.content}
                    {isLoading && msg.role === 'model' && msg.content.length === 0 && (
                        <span className="inline-block w-2 h-4 bg-slate-500 dark:bg-slate-300 animate-blink ml-1"></span>
                    )}
                    </div>
                </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('askAQuestion')}
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
    );
};

const ArticleCompanion: React.FC<ArticleCompanionProps> = (props) => {
    const { article } = props;
    const [activeTab, setActiveTab] = useState('Chat');

    const tabs = [
        { name: 'Chat', icon: ChatBubbleIcon },
        { name: 'Concepts', icon: KeyIcon },
    ];
    
    if (article.hasTimeline) {
        tabs.push({ name: 'Timeline', icon: TimelineIcon });
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Concepts':
                return <KeyConcepts {...props} />;
            case 'Timeline':
                return <div className="p-4 h-full overflow-y-auto"><ArticleTimeline events={props.timelineEvents} isLoading={props.timelineLoading} /></div>;
            case 'Chat':
            default:
                return <ChatPanel article={props.article} settings={props.settings} />;
        }
    };
    
    return (
        <aside className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md flex flex-col h-[70vh] max-h-[600px]">
            <div className="p-2 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                <div className="flex justify-around items-center">
                    {tabs.map(tab => (
                        <button 
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 rounded-md font-semibold text-sm transition-colors ${activeTab === tab.name ? 'text-deep-red dark:text-gold bg-red-50 dark:bg-gold/10' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}
                        >
                            <tab.icon className="w-5 h-5"/>
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-grow overflow-hidden">
                {renderTabContent()}
            </div>
        </aside>
    );
};

export default ArticleCompanion;