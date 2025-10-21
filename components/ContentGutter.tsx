import React, { useState } from 'react';
import type { Article, ReadingLens } from '../types';

import BookmarkIcon from './icons/BookmarkIcon';
import GlassesIcon from './icons/GlassesIcon';
import CopyLinkIcon from './icons/CopyLinkIcon';
import TwitterIcon from './icons/TwitterIcon';
import ShareIcon from './icons/ShareIcon';
import MagicWandIcon from './icons/MagicWandIcon';
import CompareIcon from './icons/CompareIcon';
import { useTranslation } from '../hooks/useTranslation';

interface ContentGutterProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  isZenMode: boolean;
  onToggleZenMode: () => void;
  activeLens: ReadingLens;
  onSetLens: (lens: ReadingLens) => void;
  comparisonList: number[];
  onAddToCompare: (articleId: number) => void;
}

const ActionButton: React.FC<{ onClick?: () => void; title: string; children: React.ReactNode; isActive?: boolean; href?: string; disabled?: boolean; }> = ({ onClick, title, children, isActive = false, href, disabled = false }) => {
    const commonClasses = `group relative flex items-center justify-center w-12 h-12 rounded-full text-slate-600 dark:text-slate-300 transition-all duration-200 ${
      isActive
        ? 'bg-deep-red dark:bg-gold text-white'
        : 'bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
    
    const content = (
        <>
            {children}
            <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {title}
            </span>
        </>
    );

    if (href) {
        return <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses}>{content}</a>;
    }

    return <button onClick={onClick} title={title} className={commonClasses} disabled={disabled}>{content}</button>;
}

const ContentGutter: React.FC<ContentGutterProps> = ({ article, isBookmarked, onToggleBookmark, isZenMode, onToggleZenMode, activeLens, onSetLens, comparisonList, onAddToCompare }) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const pageUrl = window.location.href;
  const { t } = useTranslation();
  const isInCompare = comparisonList.includes(article.id);

  const shareActions = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(article.title)}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000);
    });
  };

  return (
    <aside className="absolute top-0 -left-24 hidden lg:block animate-fade-in-up">
        <div className="sticky top-40 space-y-4 flex flex-col items-center">
            <ActionButton onClick={onToggleBookmark} title={isBookmarked ? t('removeBookmark') : t('bookmark')} isActive={isBookmarked}>
                <BookmarkIcon filled={isBookmarked} className={`w-5 h-5 ${isBookmarked ? 'text-white' : ''}`} />
            </ActionButton>
            
            <ActionButton 
              onClick={() => onAddToCompare(article.id)} 
              title={isInCompare ? t('removeFromCompare') : t('addToCompare')}
              isActive={isInCompare}
              disabled={!isInCompare && comparisonList.length >= 2}
            >
              <CompareIcon className="w-5 h-5" />
            </ActionButton>

            <ActionButton onClick={onToggleZenMode} title={isZenMode ? t('exitZenMode') : t('zenMode')} isActive={isZenMode}>
                <GlassesIcon className="w-5 h-5" />
            </ActionButton>

            {isZenMode && (
                 <div className="p-2 bg-slate-100 dark:bg-slate-700/50 rounded-full space-y-2">
                    <ActionButton onClick={() => onSetLens('None')} title={t('normalView')} isActive={activeLens === 'None'}>
                        <MagicWandIcon className="w-5 h-5" />
                    </ActionButton>
                     <ActionButton onClick={() => onSetLens('Simplify')} title={t('simplifyText')} isActive={activeLens === 'Simplify'}>
                        <span className="font-bold text-lg">A</span>
                    </ActionButton>
                     <ActionButton onClick={() => onSetLens('DefineTerms')} title={t('defineTerms')} isActive={activeLens === 'DefineTerms'}>
                        <span className="font-bold text-lg">A+</span>
                    </ActionButton>
                </div>
            )}
            
            <div className="w-8 h-px bg-slate-200 dark:bg-slate-700"></div>

            <ActionButton onClick={handleCopyLink} title={isLinkCopied ? t('copied') : t('copyLink')}>
                <CopyLinkIcon className="w-5 h-5"/>
            </ActionButton>

            <ActionButton href={shareActions.twitter} title={t('shareOnTwitter')}>
                <TwitterIcon className="w-5 h-5" />
            </ActionButton>

            {navigator.share && (
                <ActionButton onClick={() => navigator.share({ title: article.title, url: pageUrl })} title={t('moreOptions')}>
                    <ShareIcon />
                </ActionButton>
            )}
        </div>
    </aside>
  );
};

export default ContentGutter;