import React from 'react';
import type { Article, Settings } from '../types';
import TrendingNews from './TrendingNews';
import InteractiveAd from './InteractiveAd';
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
    <div className="lg:col-span-1">
      <div className="lg:sticky top-28 space-y-8">
            {activeArticle ? (
              <>
                <ArticleCompanion article={activeArticle} settings={settings} />
                <KeyConcepts article={activeArticle} settings={settings} />
              </>
            ) : (
              <>
                {settings.subscriptionTier === 'Free' && <SubscriptionCard onClick={onGoPremium} />}
                <TrendingNews articles={trendingArticles} onArticleClick={onArticleClick} />
                <WeatherWidget />
                <CommunityPoll />
                {settings.subscriptionTier === 'Free' && <InteractiveAd />}
              </>
            )}
      </div>
    </div>
  );
};

export default RightAside;
