import React from 'react';
import type { Article } from '../types';
import ArticleCard from './ArticleCard';

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
  onDownloadArticle
}) => {
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);
  
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
          />
        ))}
      </div>
    </section>
  );
};

export default GlobalHighlights;
