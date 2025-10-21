import React from 'react';
import type { Article } from '../types';
import ReadAloudIcon from './icons/ReadAloudIcon';
import SummarizeIcon from './icons/SummarizeIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import { useTranslation } from '../hooks/useTranslation';

interface ArticleHeaderProps {
    article: Article;
    onClose: () => void;
    onTextToSpeech: (article: Article) => void;
    onSummarize: (article: Article) => void;
    isBookmarked: boolean;
    onToggleBookmark: () => void;
}

const PrimaryActionButton: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string; }> = ({ onClick, icon, label }) => (
    <button onClick={onClick} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold transition-colors">
        {icon}
        {label}
    </button>
);

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, onClose, onTextToSpeech, onSummarize, isBookmarked, onToggleBookmark }) => {
    const { t } = useTranslation();
    return (
        <header className="relative -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 mb-8 text-white min-h-[60vh] max-h-[700px] flex flex-col justify-between p-4 sm:p-8 lg:p-12 rounded-b-2xl overflow-hidden animate-fade-in">
            <div 
                className="absolute inset-0 bg-cover bg-center animate-hero-bg-parallax" 
                style={{ backgroundImage: `url(${article.imageUrl})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/60 to-transparent"></div>

            <div className="relative z-10">
                <button onClick={onClose} className="flex items-center gap-1 text-sm font-semibold text-slate-300 hover:text-white hover:underline">
                    <ChevronLeftIcon className="w-5 h-5"/> {t('backToHome')}
                </button>
            </div>

            <div className="relative z-10 animate-fade-in-up max-w-4xl mx-auto container">
                <p className="font-semibold uppercase tracking-wider text-gold mb-2">{article.category}</p>
                <h1 className="text-4xl md:text-6xl font-extrabold !leading-tight tracking-tight mb-4 drop-shadow-lg">
                    {article.title}
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl drop-shadow-md">
                    {article.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                    <PrimaryActionButton onClick={() => onTextToSpeech(article)} icon={<ReadAloudIcon className="w-5 h-5" />} label={t('listen')} />
                    <PrimaryActionButton onClick={() => onSummarize(article)} icon={<SummarizeIcon className="w-5 h-5" />} label={t('summarize')} />
                    <PrimaryActionButton onClick={onToggleBookmark} icon={<BookmarkIcon filled={isBookmarked} className="w-5 h-5" />} label={isBookmarked ? t('bookmarked') : t('bookmark')} />
                </div>
            </div>
        </header>
    );
};

export default ArticleHeader;