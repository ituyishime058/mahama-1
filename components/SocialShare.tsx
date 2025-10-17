
import React, { useState } from 'react';
import type { Article } from '../types';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import ShareIcon from './icons/ShareIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import GlassesIcon from './icons/GlassesIcon';
import CopyLinkIcon from './icons/CopyLinkIcon';

interface SocialShareProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  isZenMode: boolean;
  onToggleZenMode: () => void;
}

const SocialShare: React.FC<SocialShareProps> = ({ article, isBookmarked, onToggleBookmark, isZenMode, onToggleZenMode }) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const pageUrl = window.location.href;

  const shareActions = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(article.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: pageUrl,
      }).catch(console.error);
    } else {
      handleCopyLink();
    }
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000);
    });
  };

  const ActionButton: React.FC<{ href?: string; onClick?: () => void; title: string; children: React.ReactNode; isActive?: boolean; }> = ({ href, onClick, title, children, isActive = false }) => {
    const commonClasses = `group relative flex items-center justify-center w-12 h-12 rounded-full text-slate-600 dark:text-slate-300 hover:text-white transition-all duration-200 ${
      isActive
        ? 'bg-deep-red dark:bg-gold text-white'
        : 'bg-slate-100 dark:bg-slate-700/50 hover:bg-deep-red dark:hover:bg-gold'
    }`;

    if (href) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" title={title} className={commonClasses}>
          {children}
        </a>
      );
    }

    return (
      <button onClick={onClick} title={title} className={commonClasses}>
        {children}
      </button>
    );
  }

  return (
    <aside className="absolute top-0 left-0 hidden lg:block">
        <div className="sticky top-28 space-y-4">
            <ActionButton onClick={onToggleZenMode} title={isZenMode ? 'Exit Zen Mode' : 'Enter Zen Mode'} isActive={isZenMode}>
                <GlassesIcon className="w-5 h-5" />
            </ActionButton>
            <ActionButton onClick={onToggleBookmark} title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'} isActive={isBookmarked}>
                <BookmarkIcon filled={isBookmarked} className={`w-5 h-5 ${isBookmarked ? 'text-white' : ''}`} />
            </ActionButton>
             <ActionButton onClick={handleCopyLink} title="Copy Link">
                <div className="relative w-5 h-5 flex items-center justify-center">
                    <span className={`transition-opacity duration-300 ${isLinkCopied ? 'opacity-0' : 'opacity-100'}`}><CopyLinkIcon className="w-5 h-5"/></span>
                    <span className={`absolute transition-opacity duration-300 font-bold text-xs ${isLinkCopied ? 'opacity-100' : 'opacity-0'}`}>Copied!</span>
                </div>
            </ActionButton>
            <ActionButton href={shareActions.twitter} title="Share on Twitter">
                <TwitterIcon className="w-5 h-5" />
            </ActionButton>
            <ActionButton href={shareActions.facebook} title="Share on Facebook">
                <FacebookIcon className="w-5 h-5" />
            </ActionButton>
            {navigator.share && (
                <ActionButton onClick={handleNativeShare} title="More Sharing Options">
                    <ShareIcon />
                </ActionButton>
            )}
        </div>
    </aside>
  );
};

export default SocialShare;
