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
  // FIX: Add settings prop to be passed to child components
  settings: Settings;
}

const RightAside: React.FC<RightAsideProps> = ({ trendingArticles, onArticleClick, activeArticle, settings }) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-28 space-y-8">
        {activeArticle ? (
          <>
            {/* FIX: Pass settings prop to ArticleCompanion */}
            <ArticleCompanion article={activeArticle} settings={settings} />
            {/* FIX: Pass settings prop to KeyConcepts */}
            <KeyConcepts article={activeArticle} settings={settings} />
          </>
        ) : (
          <>
            <SubscriptionCard />
            <TrendingNews articles={trendingArticles} onArticleClick={onArticleClick} />
            <WeatherWidget />
            <CommunityPoll />
            <AdPlaceholder />
          </>
        )}
      </div>
    </div>
  );
};

export default RightAside;
