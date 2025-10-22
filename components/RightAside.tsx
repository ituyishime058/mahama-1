import React from 'react';
import type { Article, Settings, WeatherData, User, KeyConcept, TimelineEvent } from '../types';
import TrendingNews from './TrendingNews';
import InteractiveAd from './InteractiveAd';
import CommunityPoll from './CommunityPoll';
import WeatherWidget from './WeatherWidget';
import SubscriptionCard from './SubscriptionCard';
import ThisDayInHistory from './ThisDayInHistory';
import SettingsCompanion from './SettingsCompanion';
import ArticleViewAside from './ArticleViewAside';

interface RightAsideProps {
  trendingArticles: Article[];
  allArticles: Article[];
  onArticleClick: (article: Article) => void;
  activeArticle: Article | null;
  settings: Settings;
  onGoPremium: () => void;
  weatherData: WeatherData | null;
  isWeatherLoading: boolean;
  isSettingsOpen: boolean;
  user: User;
  keyConcepts: KeyConcept[];
  conceptsLoading: boolean;
  timelineEvents: TimelineEvent[];
  timelineLoading: boolean;
}

const HomeAside: React.FC<Pick<RightAsideProps, 'trendingArticles' | 'onArticleClick' | 'settings' | 'onGoPremium' | 'weatherData' | 'isWeatherLoading'>> = ({
    trendingArticles,
    onArticleClick,
    settings,
    onGoPremium,
    weatherData,
    isWeatherLoading,
}) => (
    <div className="space-y-8 animate-fade-in-up">
        {settings.subscriptionTier === 'Free' && <SubscriptionCard onClick={onGoPremium} />}
        <TrendingNews articles={trendingArticles} onArticleClick={onArticleClick} />
        <ThisDayInHistory settings={settings} />
        <WeatherWidget weatherData={weatherData} isLoading={isWeatherLoading} />
        <CommunityPoll />
        {settings.subscriptionTier === 'Free' && <InteractiveAd />}
    </div>
);


const RightAside: React.FC<RightAsideProps> = (props) => {
  const { 
      activeArticle, 
      isSettingsOpen, 
      allArticles,
      settings,
      onArticleClick,
      onGoPremium,
      keyConcepts,
      conceptsLoading,
      timelineEvents,
      timelineLoading
    } = props;

  const renderAsideContent = () => {
        if (activeArticle) {
            return (
                <ArticleViewAside
                    article={activeArticle}
                    allArticles={allArticles}
                    settings={settings}
                    onArticleClick={onArticleClick}
                    onGoPremium={onGoPremium}
                    keyConcepts={keyConcepts}
                    conceptsLoading={conceptsLoading}
                    timelineEvents={timelineEvents}
                    timelineLoading={timelineLoading}
                />
            );
        }
        if (isSettingsOpen) {
            return <SettingsCompanion />;
        }
        // Default homepage aside
        return <HomeAside {...props} />;
    }

  return (
    <div className="md:col-span-1 mt-8 md:mt-0">
      <div className="md:sticky top-28">
        {renderAsideContent()}
      </div>
    </div>
  );
};

export default RightAside;