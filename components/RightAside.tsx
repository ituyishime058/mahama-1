import React from 'react';
import type { Article, Settings } from '../types';
import TrendingNews from './TrendingNews';
import AdPlaceholder from './AdPlaceholder';
import CommunityPoll from './CommunityPoll';
import WeatherWidget from './WeatherWidget';
import SubscriptionCard from './SubscriptionCard';
import ArticleCompanion from './ArticleCompanion';
import KeyConcepts from './KeyConcepts';

interface RightAsideProps {
  trendingArticles: Article[];
  onArticleClick: (article: Article) => void;
  activeArticle: Article | null;
  settings: Settings;
  onGoPremium: () => void;
}

const RightAside: React.FC<RightAsideProps> = ({ trendingArticles, onArticleClick, activeArticle, settings, onGoPremium }) => {
  return (
    <div className="hidden lg:block lg:col-span-1">
      <div className="lg:sticky top-28 h-[calc(100vh-7rem)]">
        <div className="h-full overflow-y-auto space-y-8 pr-2 scrollbar-thin">
            {activeArticle ? (
              <>
                <ArticleCompanion article={activeArticle} settings={settings} />
                <KeyConcepts article={activeArticle} settings={settings} />
              </>
            ) : (
              <>
                <SubscriptionCard onClick={onGoPremium} />
                <TrendingNews articles={trendingArticles} onArticleClick={onArticleClick} />
                <WeatherWidget />
                <CommunityPoll />
                {settings.subscriptionTier === 'Free' && <AdPlaceholder />}
              </>
            )}
        </div>
         <style>{`
            .scrollbar-thin::-webkit-scrollbar {
              width: 5px;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background-color: #9ca3af;
              border-radius: 10px;
            }
            .dark .scrollbar-thin::-webkit-scrollbar-thumb {
              background-color: #4b5563;
            }
        `}</style>
      </div>
    </div>
  );
};

export default RightAside;