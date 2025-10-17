import React, { useRef } from 'react';
import type { Article } from '../types';
import RightAside from './RightAside';
import ArticleCard from './ArticleCard';
import ArticleProgressBar from './ArticleProgressBar';
import SocialShare from './SocialShare';
import AuthorInfo from './AuthorInfo';
import CommentsSection from './CommentsSection';

interface ArticlePageProps {
  article: Article;
  allArticles: Article[];
  trendingArticles: Article[];
  onArticleClick: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  allArticles,
  trendingArticles,
  onArticleClick,
  isBookmarked,
  onToggleBookmark,
}) => {
  const articleContentRef = useRef<HTMLDivElement>(null);

  const relatedContent = allArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-navy animate-fade-in">
      <ArticleProgressBar targetRef={articleContentRef} />
      
      <header className="relative h-80 md:h-[500px] w-full">
        <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12 text-white">
            <p className="font-semibold uppercase tracking-widest text-gold text-sm">{article.category}</p>
            <h1 className="text-3xl md:text-5xl font-extrabold !leading-tight tracking-tight mt-1 max-w-4xl">
              {article.title}
            </h1>
        </div>
      </header>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
             <div className="relative">
                <SocialShare article={article} isBookmarked={isBookmarked} onToggleBookmark={onToggleBookmark} />
                <article ref={articleContentRef} className="prose prose-lg prose-slate dark:prose-invert max-w-none lg:pl-24">
                    <div className="flex items-center gap-4 mb-8 text-sm border-b border-slate-200 dark:border-slate-700 pb-4">
                        <div>
                            <p className="font-bold">By {article.author}</p>
                            <p className="text-slate-500 dark:text-slate-400">{article.date}</p>
                        </div>
                    </div>

                    <p className="lead">{article.excerpt}</p>
                    
                    <p>{article.content || "Full content is not available for this article."}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>

                    <blockquote>
                        "This is a pivotal moment that will define the next decade. The implications are staggering, and we are only beginning to scratch the surface."
                    </blockquote>

                    <p>Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>

                     <figure>
                        <img src="https://picsum.photos/800/500?random=55" alt="In-article visual" className="rounded-lg shadow-lg" />
                        <figcaption>A supporting image can add powerful context to a story, breaking up the text and engaging the reader visually.</figcaption>
                    </figure>

                    <p>Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.</p>
                </article>
             </div>
             <AuthorInfo article={article} />
             <CommentsSection />
          </div>
          <RightAside trendingArticles={trendingArticles} onArticleClick={onArticleClick} />
        </div>
      </div>
      
      {relatedContent.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
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
          .prose { --tw-prose-body: #334155; --tw-prose-invert-body: #cbd5e1; --tw-prose-lead: #1e293b; --tw-prose-invert-lead: #e2e8f0; --tw-prose-bullets: #b91c1c; --tw-prose-invert-bullets: #d97706; --tw-prose-quotes: #1e293b; --tw-prose-invert-quotes: #e2e8f0; }
          .prose .lead { font-size: 1.25em; line-height: 1.6; font-weight: 400; }
          .prose blockquote { border-left-color: #b91c1c; font-style: italic; font-weight: 600; font-size: 1.2em; }
          .dark .prose blockquote { border-left-color: #d97706; }
          .prose figcaption { text-align: center; font-size: 0.9em; color: #64748b; margin-top: 0.75rem; }
          .dark .prose figcaption { color: #94a3b8; }
        `}</style>
    </div>
  );
};

export default ArticlePage;