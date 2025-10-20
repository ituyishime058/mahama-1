import React from 'react';
import type { Article, Settings, WeatherData } from '../types';
import TrendingNews from './TrendingNews';
import InteractiveAd from './InteractiveAd';
import CommunityPoll from './CommunityPoll';
import WeatherWidget from './WeatherWidget';
import SubscriptionCard from './SubscriptionCard';
import ArticleCompanion from './ArticleCompanion';
import KeyConcepts from './KeyConcepts';
import ThisDayInHistory from './ThisDayInHistory';

interface RightAsideProps {
  trendingArticles: Article[];
  onArticleClick: (article: Article) => void;
  activeArticle: Article | null;
  settings: Settings;
  onGoPremium: () => void;
  weatherData: WeatherData | null;
  isWeatherLoading: boolean;
}

const RightAside: React.FC<RightAsideProps> = ({ trendingArticles, onArticleClick, activeArticle, settings, onGoPremium, weatherData, isWeatherLoading }) => {
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
                <ThisDayInHistory />
                <WeatherWidget weatherData={weatherData} isLoading={isWeatherLoading} />
                <CommunityPoll />
                {settings.subscriptionTier === 'Free' && <InteractiveAd />}
              </>
            )}
      </div>
    </div>
  );
};

export default RightAside;