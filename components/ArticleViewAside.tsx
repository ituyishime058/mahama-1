import React from 'react';
import type { Article, Settings, KeyConcept, TimelineEvent } from '../types';
import ArticleCompanion from './ArticleCompanion';
import AiRecommendations from './AiRecommendations';
import SubscriptionCard from './SubscriptionCard';
import TrendingNews from './TrendingNews';

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

const ArticleViewAside: React.FC<ArticleViewAsideProps> = ({
  article,
  allArticles,
  settings,
  onArticleClick,
  onGoPremium,
  keyConcepts,
  conceptsLoading,
  timelineEvents,
  timelineLoading,
}) => {
  const trendingArticles = allArticles.filter(a => a.id !== article.id).slice(0, 5);
  
  return (
    <div className="space-y-8 animate-fade-in-up">
      <ArticleCompanion
        article={article}
        settings={settings}
        keyConcepts={keyConcepts}
        conceptsLoading={conceptsLoading}
        timelineEvents={timelineEvents}
        timelineLoading={timelineLoading}
      />
      <AiRecommendations
        currentArticle={article}
        allArticles={allArticles}
        onArticleClick={onArticleClick}
        settings={settings}
      />
      {settings.subscriptionTier === 'Free' && <SubscriptionCard onClick={onGoPremium} />}
      <TrendingNews articles={trendingArticles} onArticleClick={onArticleClick} />
    </div>
  );
};

export default ArticleViewAside;