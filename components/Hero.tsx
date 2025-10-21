import React from 'react';
import type { Article } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface HeroProps {
    article: Article;
    onReadMore: () => void;
}

const Hero: React.FC<HeroProps> = ({ article, onReadMore }) => {
  const { t } = useTranslation();
  return (
    <div className="relative h-[calc(100vh-80px)] min-h-[500px] max-h-[800px] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={article.imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {article.live && (
             <div className="inline-flex items-center bg-deep-red text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                {t('live')}
            </div>
        )}
        <p className="text-gold font-semibold uppercase tracking-widest mb-2">{article.category}</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold !leading-tight tracking-tighter mb-4">
          {article.title}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300">
          {article.excerpt}
        </p>
        <div className="mt-8 flex justify-center space-x-4">
            <button className="bg-deep-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300">
                {t('watchLive')}
            </button>
            <button 
                onClick={onReadMore}
                className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300">
                {t('readMore')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;