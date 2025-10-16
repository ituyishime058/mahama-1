import React from 'react';
import type { Article } from '../types';
import ArticleCard from './ArticleCard';

interface GlobalHighlightsProps {
  articles: Article[];
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
  onTextToSpeech: (article: Article) => void;
  audioState: {
    playingArticleId: number | null;
    isGenerating: boolean;
  };
  bookmarkedArticleIds: number[];
  onToggleBookmark: (articleId: number) => void;
}

const GlobalHighlights: React.FC<GlobalHighlightsProps> = ({ 
  articles, 
  onSummarize, 
  onExplainSimply, 
  onTextToSpeech, 
  audioState,
  bookmarkedArticleIds,
  onToggleBookmark
}) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map(article => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            onSummarize={onSummarize}
            onExplainSimply={onExplainSimply}
            onTextToSpeech={onTextToSpeech}
            isAudioPlaying={audioState.playingArticleId === article.id}
            isAudioLoading={audioState.isGenerating && audioState.playingArticleId === article.id}
            isBookmarked={bookmarkedArticleIds.includes(article.id)}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>
    </section>
  );
};

export default GlobalHighlights;