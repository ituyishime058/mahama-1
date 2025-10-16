import React, { useEffect } from 'react';
import type { Article } from '../types';
import AdPlaceholder from './AdPlaceholder';
import KeyTakeaways from './KeyTakeaways';
import FloatingActionbar from './FloatingActionbar';

interface ArticlePageProps {
  article: Article;
  relatedArticles: Article[];
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
  onTextToSpeech: (article: Article) => void;
  audioState: {
    playingArticleId: number | null;
    isGenerating: boolean;
  };
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onFetchKeyTakeaways: (article: Article) => void;
  keyTakeaways: string[];
  isFetchingTakeaways: boolean;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ 
    article,
    relatedArticles,
    onSummarize,
    onExplainSimply,
    onTextToSpeech,
    audioState,
    isBookmarked,
    onToggleBookmark,
    onFetchKeyTakeaways,
    keyTakeaways,
    isFetchingTakeaways,
}) => {

  useEffect(() => {
    onFetchKeyTakeaways(article);
  }, [article, onFetchKeyTakeaways]);

  return (
    <main className="pt-20 bg-white dark:bg-slate-900">
      <header className="relative h-80 md:h-[500px] w-full">
          <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white container mx-auto">
              <p className="font-semibold uppercase tracking-widest text-gold text-sm">{article.category}</p>
              <h1 className="text-3xl md:text-5xl font-extrabold !leading-tight tracking-tight mt-2 max-w-4xl">
                {article.title}
              </h1>
              <div className="mt-4 text-sm text-slate-300">
                  <span>By {article.author}</span> &bull; <span>{article.date}</span>
              </div>
          </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main Article Content */}
          <article className="lg:col-span-2 prose prose-slate dark:prose-invert max-w-none">
            <p className="lead">{article.excerpt}</p>
            
            <KeyTakeaways takeaways={keyTakeaways} isLoading={isFetchingTakeaways} />

            <p>{article.content || "Full content is not available for this article."}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
            <p>Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
            <p>Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien. Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus nunc ullamcorper orci, fermentum bibendum enim nibh eget ipsum. Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus nunc ullamcorper orci, fermentum bibendum enim nibh eget ipsum.</p>
          </article>
          
          {/* Right Sidebar */}
          <aside className="lg:col-span-1">
             <div className="sticky top-28 space-y-8">
                <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-lg">
                  <h2 className="text-2xl font-extrabold mb-4 border-l-4 border-gold pl-3">
                    Up Next
                  </h2>
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <div key={related.id} className="group pt-4 border-t border-slate-200 dark:border-slate-700 first:border-t-0 first:pt-0">
                        <p className="text-xs font-semibold uppercase text-deep-red">{related.category}</p>
                        <h4 className="font-semibold leading-tight group-hover:underline">
                          <a href="#">{related.title}</a>
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">{related.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <AdPlaceholder />
             </div>
          </aside>
        </div>
      </div>
      
      <FloatingActionbar
         article={article}
         onSummarize={onSummarize}
         onExplainSimply={onExplainSimply}
         onTextToSpeech={onTextToSpeech}
         onToggleBookmark={onToggleBookmark}
         audioState={audioState}
         isBookmarked={isBookmarked}
      />

       <style>{`
          .prose { line-height: 1.7; }
          .prose .lead { font-size: 1.25em; color: #475569; font-weight: 600; margin-bottom: 2em;}
          .dark .prose .lead { color: #94a3b8; }
          .prose > p { margin-bottom: 1.25em; }
          .prose > h2 { margin-top: 2em; margin-bottom: 1em;}
        `}</style>
    </main>
  );
};

export default ArticlePage;
