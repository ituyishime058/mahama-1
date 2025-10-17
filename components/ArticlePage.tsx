import React from 'react';
import type { Article } from '../types';
import RightAside from './RightAside';
import FloatingActionbar from './FloatingActionbar';
import KeyTakeaways from './KeyTakeaways';
import SentimentIndicator from './SentimentIndicator';
import ArticleCard from './ArticleCard';

interface ArticlePageProps {
  article: Article;
  allArticles: Article[];
  trendingArticles: Article[];
  onClose: () => void;
  onArticleClick: (article: Article) => void;
  onSummarize: (article: Article, mode: 'summary' | 'explanation') => void;
  onExplainSimply: (article: Article, mode: 'summary' | 'explanation') => void;
  onTextToSpeech: (article: Article) => void;
  audioState: {
    playingArticleId: number | null;
    isGenerating: boolean;
  };
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  keyTakeaways: string[];
  isFetchingTakeaways: boolean;
  sentiment: 'positive' | 'negative' | 'neutral' | null;
  isFetchingSentiment: boolean;
}

const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  allArticles,
  trendingArticles,
  onClose,
  onArticleClick,
  onSummarize,
  onExplainSimply,
  onTextToSpeech,
  audioState,
  isBookmarked,
  onToggleBookmark,
  keyTakeaways,
  isFetchingTakeaways,
  sentiment,
  isFetchingSentiment,
}) => {
  const relatedContent = allArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="animate-fade-in">
      <header className="relative h-80 md:h-96">
        <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12 text-white">
            <p className="font-semibold uppercase tracking-widest text-gold text-sm">{article.category}</p>
            <h1 className="text-3xl md:text-5xl font-extrabold !leading-tight tracking-tight mt-1 max-w-4xl">
              {article.title}
            </h1>
        </div>
      </header>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-[-4rem] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800/50 p-6 md:p-8 rounded-lg shadow-xl">
            <div className="flex">
                <FloatingActionbar 
                    article={article}
                    onSummarize={onSummarize}
                    onExplainSimply={onExplainSimply}
                    onTextToSpeech={onTextToSpeech}
                    audioState={audioState}
                    isBookmarked={isBookmarked}
                    onToggleBookmark={onToggleBookmark}
                />
                <article className="prose prose-slate dark:prose-invert max-w-none w-full lg:pl-20">
                    <div className="flex items-center gap-4 mb-8 text-sm">
                        <div>
                            <p className="font-bold">By {article.author}</p>
                            <p className="text-slate-500">{article.date}</p>
                        </div>
                    </div>
                    <p className="lead">{article.excerpt}</p>
                    
                    <SentimentIndicator sentiment={sentiment} isLoading={isFetchingSentiment} />

                    <p>{article.content || "Full content is not available for this article."}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>

                    <KeyTakeaways takeaways={keyTakeaways} isLoading={isFetchingTakeaways} />
                    
                    <p>Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
                </article>
            </div>
          </div>
          <RightAside trendingArticles={trendingArticles} onArticleClick={onArticleClick} />
        </div>
      </div>
      
      {relatedContent.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
           <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
                Related Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedContent.map(related => (
                    <ArticleCard 
                        key={related.id}
                        article={related}
                        onReadMore={onArticleClick}
                        // Dummy props for features not needed in this context
                        onSummarize={() => {}}
                        onExplainSimply={() => {}}
                        onTextToSpeech={() => {}}
                        audioState={{playingArticleId: null, isGenerating: false}}
                        isBookmarked={false}
                        onToggleBookmark={() => {}}
                        offlineArticleIds={[]}
                        downloadingArticleId={null}
                        onDownloadArticle={() => {}}
                    />
                ))}
            </div>
        </div>
      )}

      <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
          .prose { line-height: 1.7; }
          .prose .lead { font-size: 1.25em; font-weight: 600; color: #475569; }
          .dark .prose .lead { color: #94a3b8; }
        `}</style>
    </div>
  );
};

export default ArticlePage;
