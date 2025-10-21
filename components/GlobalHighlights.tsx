import React from 'react';
import type { Article } from '../types';
import ArticleCard from './ArticleCard';
import { useTranslation } from '../hooks/useTranslation';

interface GlobalHighlightsProps {
  articles: Article[];
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
  onTextToSpeech: (article: Article) => void;
  onReadMore: (article: Article) => void;
  audioState: {
    playingArticleId: number | null;
    isGenerating: boolean;
  };
  bookmarkedArticleIds: number[];
  onToggleBookmark: (articleId: number) => void;
  offlineArticleIds: number[];
  downloadingArticleId: number | null;
  onDownloadArticle: (article: Article) => void;
  comparisonList: number[];
  onAddToCompare: (articleId: number) => void;
  layout?: 'default' | 'grid';
}

const GlobalHighlights: React.FC<GlobalHighlightsProps> = ({ 
  articles, 
  onSummarize, 
  onExplainSimply, 
  onTextToSpeech,
  onReadMore, 
  audioState,
  bookmarkedArticleIds,
  onToggleBookmark,
  offlineArticleIds,
  downloadingArticleId,
  onDownloadArticle,
  comparisonList,
  onAddToCompare,
  layout = 'default'
}) => {
  const { t } = useTranslation();
  if (!articles || articles.length === 0) {
    return (
      <section className="text-center py-10">
        <h2 className="text-2xl font-bold">{t('noArticles')}</h2>
        <p>{t('checkPreferences')}</p>
      </section>
    );
  }

  if (layout === 'grid') {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 9).map(article => (
           <ArticleCard 
            key={article.id} 
            article={article} 
            onSummarize={onSummarize}
            onExplainSimply={onExplainSimply}
            onTextToSpeech={onTextToSpeech}
            onReadMore={onReadMore}
            audioState={audioState}
            isBookmarked={bookmarkedArticleIds.includes(article.id)}
            onToggleBookmark={onToggleBookmark}
            offlineArticleIds={offlineArticleIds}
            downloadingArticleId={downloadingArticleId}
            onDownloadArticle={onDownloadArticle}
            comparisonList={comparisonList}
            onAddToCompare={onAddToCompare}
            layout="grid"
          />
        ))}
      </section>
    );
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1, 5); 
  
  return (
    <section className="space-y-8">
      {featuredArticle && (
        <ArticleCard 
          featured={true}
          article={featuredArticle} 
          onSummarize={onSummarize}
          onExplainSimply={onExplainSimply}
          onTextToSpeech={onTextToSpeech}
          onReadMore={onReadMore}
          audioState={audioState}
          isBookmarked={bookmarkedArticleIds.includes(featuredArticle.id)}
          onToggleBookmark={onToggleBookmark}
          offlineArticleIds={offlineArticleIds}
          downloadingArticleId={downloadingArticleId}
          onDownloadArticle={onDownloadArticle}
          comparisonList={comparisonList}
          onAddToCompare={onAddToCompare}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {otherArticles.map(article => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            onSummarize={onSummarize}
            onExplainSimply={onExplainSimply}
            onTextToSpeech={onTextToSpeech}
            onReadMore={onReadMore}
            audioState={audioState}
            isBookmarked={bookmarkedArticleIds.includes(article.id)}
            onToggleBookmark={onToggleBookmark}
            offlineArticleIds={offlineArticleIds}
            downloadingArticleId={downloadingArticleId}
            onDownloadArticle={onDownloadArticle}
            comparisonList={comparisonList}
            onAddToCompare={onAddToCompare}
          />
        ))}
      </div>
    </section>
  );
};

export default GlobalHighlights;