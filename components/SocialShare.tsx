import React from 'react';
import type { Article } from '../types';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import ShareIcon from './icons/ShareIcon';
import BookmarkIcon from './icons/BookmarkIcon';

interface SocialShareProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const SocialShare: React.FC<SocialShareProps> = ({ article, isBookmarked, onToggleBookmark }) => {
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
      // Fallback for browsers that don't support navigator.share
      alert('Use the other icons to share on your favorite platform!');
    }
  };
  
  const ActionButton: React.FC<{ href?: string; onClick?: () => void; title: string; children: React.ReactNode; }> = ({ href, onClick, title, children }) => {
    const commonProps = {
      title,
      className: "group relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700/50 hover:bg-deep-red dark:hover:bg-gold text-slate-600 dark:text-slate-300 hover:text-white transition-all duration-200"
    };

    if (href) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
          {children}
        </a>
      );
    }

    return (
      <button onClick={onClick} {...commonProps}>
        {children}
      </button>
    );
  }

  return (
    <aside className="absolute top-0 left-0 hidden lg:block">
        <div className="sticky top-28 space-y-4">
            <ActionButton href={shareActions.twitter} title="Share on Twitter">
                <TwitterIcon className="w-5 h-5" />
            </ActionButton>
            <ActionButton href={shareActions.facebook} title="Share on Facebook">
                <FacebookIcon className="w-5 h-5" />
            </ActionButton>
            <ActionButton onClick={onToggleBookmark} title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}>
                <BookmarkIcon filled={isBookmarked} className={`w-5 h-5 ${isBookmarked ? 'text-gold' : ''}`} />
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