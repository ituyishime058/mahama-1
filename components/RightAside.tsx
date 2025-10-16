import React from 'react';
import type { Article } from '../types';
import TrendingNews from './TrendingNews';
import AdPlaceholder from './AdPlaceholder';
import CommunityPoll from './CommunityPoll';
import WeatherWidget from './WeatherWidget';

interface RightAsideProps {
  trendingArticles: Article[];
  onArticleClick: (article: Article) => void;
}

const RightAside: React.FC<RightAsideProps> = ({ trendingArticles, onArticleClick }) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-28 space-y-8">
        <TrendingNews articles={trendingArticles} onArticleClick={onArticleClick} />
        <WeatherWidget />
        <CommunityPoll />
        <AdPlaceholder />
      </div>
    </div>
  );
};

export default RightAside;
