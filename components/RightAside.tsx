import React from 'react';
import type { Article, Settings, WeatherData, User, KeyConcept, TimelineEvent } from '../types';
import TrendingNews from './TrendingNews';
import InteractiveAd from './InteractiveAd';
import CommunityPoll from './CommunityPoll';
import WeatherWidget from './WeatherWidget';
import SubscriptionCard from './SubscriptionCard';
import ArticleCompanion from './ArticleCompanion';
import ThisDayInHistory from './ThisDayInHistory';
import SettingsCompanion from './SettingsCompanion';
import ProfileCompanion from './ProfileCompanion';

interface RightAsideProps {
  trendingArticles: Article[];
  onArticleClick: (article: Article) => void;
  activeArticle: Article | null;
  settings: Settings;
  onGoPremium: () => void;
  weatherData: WeatherData | null;
  isWeatherLoading: boolean;
  isSettingsOpen: boolean;
  isProfileOpen: boolean;
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
        <ThisDayInHistory />
        <WeatherWidget weatherData={weatherData} isLoading={isWeatherLoading} />
        <CommunityPoll />
        {settings.subscriptionTier === 'Free' && <InteractiveAd />}
    </div>
);


const RightAside: React.FC<RightAsideProps> = (props) => {
  const { 
      activeArticle, 
      isSettingsOpen, 
      isProfileOpen, 
      settings, 
      user, 
      keyConcepts, 
      conceptsLoading, 
      timelineEvents, 
      timelineLoading 
    } = props;

  const renderAsideContent = () => {
        if (activeArticle) {
            return (
                <ArticleCompanion 
                    article={activeArticle} 
                    settings={settings}
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
        if (isProfileOpen) {
            return <ProfileCompanion user={user} />;
        }
        // Default homepage aside
        return <HomeAside {...props} />;
    }

  return (
    <div className="lg:col-span-1 mt-8 lg:mt-0">
      <div className="lg:sticky top-28">
        {renderAsideContent()}
      </div>
    </div>
  );
};

export default RightAside;