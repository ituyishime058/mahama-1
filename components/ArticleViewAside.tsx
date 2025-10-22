import React from 'react';
import type { Article, Settings, KeyConcept, TimelineEvent } from '../types';
import ArticleCompanion from './ArticleCompanion';
import SubscriptionCard from './SubscriptionCard';
import TrendingNews from './TrendingNews';
import ThisDayInHistory from './ThisDayInHistory';
import CommunityPoll from './CommunityPoll';
import InteractiveAd from './InteractiveAd';

interface ArticleViewAsideProps {
  article: Article;
  allArticles: Article[];
  settings: Settings;
  onArticleClick: (article: Article) => void;
  onGoPremium: () => void;
  keyConcepts: KeyConcept[];
  conceptsLoading: boolean;
  timelineEvents: TimelineEvent[];
  timelineLoading: boolean;
}

const ArticleViewAside: React.FC<ArticleViewAsideProps> = (props) => {
  const { article, allArticles, onArticleClick, settings, onGoPremium } = props;
  const trendingArticles = allArticles.filter(a => a.id !== article.id).slice(0, 5);
  
  return (
    <div className="space-y-8 animate-fade-in-up">
      <ArticleCompanion {...props} />
      {settings.subscriptionTier === 'Free' && <SubscriptionCard onClick={onGoPremium} />}
      <TrendingNews articles={trendingArticles} onArticleClick={onArticleClick} />
      <ThisDayInHistory settings={settings} />
      <CommunityPoll />
      {settings.subscriptionTier === 'Free' && <InteractiveAd />}
    </div>
  );
};

export default ArticleViewAside;
