import React, { useState, useEffect } from 'react';
import type { Article } from '../types';
import ReadAloudIcon from './icons/ReadAloudIcon';
import SummarizeIcon from './icons/SummarizeIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import { useTranslation } from '../hooks/useTranslation';
import ImageIcon from './icons/ImageIcon';

interface ArticleHeaderProps {
    article: Article; // This can now be the translated article object
    onClose: () => void;
    onTextToSpeech: () => void;
    onSummarize: () => void;
    isBookmarked: boolean;
    onToggleBookmark: () => void;
    onAnalyzeImage: () => void;
}

const PrimaryActionButton: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string; }> = ({ onClick, icon, label }) => (
    <button onClick={onClick} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold transition-colors">
        {icon}
        {label}
    </button>
);

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, onClose, onTextToSpeech, onSummarize, isBookmarked, onToggleBookmark, onAnalyzeImage }) => {
    const { t } = useTranslation();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const imageScale = 1 + scrollY / 2000;
    const contentOpacity = Math.max(0, 1 - scrollY / 350);
    const contentScale = Math.max(0.95, 1 - scrollY / 1500);
    const contentTranslateY = scrollY * 0.2;

    return (
        <header className="relative -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 mb-8 text-white min-h-[70vh] max-h-[800px] flex flex-col justify-between p-4 sm:p-8 lg:p-12 rounded-b-2xl overflow-hidden animate-fade-in">
            <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                    backgroundImage: `url(${article.imageUrl})`,
                    transform: `translateY(${scrollY * 0.4}px) scale(${imageScale})` 
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/60 to-transparent"></div>

            <div className="relative z-10">
                <button onClick={onClose} className="flex items-center gap-1 text-sm font-semibold text-slate-300 hover:text-white hover:underline">
                    <ChevronLeftIcon className="w-5 h-5"/> {t('backToHome')}
                </button>
            </div>

            <div 
                className="relative z-10 animate-fade-in-up max-w-4xl mx-auto container"
                style={{
                    opacity: contentOpacity,
                    transform: `scale(${contentScale}) translateY(${contentTranslateY}px)`
                }}
            >
                <p className="font-semibold uppercase tracking-wider text-gold mb-2">{t(article.category.toLowerCase()) || article.category}</p>
                <h1 className="text-4xl md:text-6xl font-extrabold !leading-tight tracking-tight mb-4 drop-shadow-lg">
                    {article.title}
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl drop-shadow-md">
                    {article.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                    <PrimaryActionButton onClick={onTextToSpeech} icon={<ReadAloudIcon className="w-5 h-5" />} label={t('listen')} />
                    <PrimaryActionButton onClick={onSummarize} icon={<SummarizeIcon className="w-5 h-5" />} label={t('summarize')} />
                    <PrimaryActionButton onClick={onAnalyzeImage} icon={<ImageIcon className="w-5 h-5" />} label={t('analyzeImage')} />
                    <PrimaryActionButton onClick={onToggleBookmark} icon={<BookmarkIcon filled={isBookmarked} className="w-5 h-5" />} label={isBookmarked ? t('bookmarked') : t('bookmark')} />
                </div>
            </div>
        </header>
    );
};

export default ArticleHeader;