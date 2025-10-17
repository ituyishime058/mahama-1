import React from 'react';
import type { Article } from '../types';
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
}

const RightAside: React.FC<RightAsideProps> = ({ trendingArticles, onArticleClick, activeArticle }) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-28 space-y-8">
        {activeArticle ? (
          <>
            <ArticleCompanion article={activeArticle} />
            <KeyConcepts article={activeArticle} />
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