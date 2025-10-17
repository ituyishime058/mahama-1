import React, { useState, useEffect } from 'react';
import type { Article, ReadingLens, SubscriptionTier } from '../types';
import SummarizeIcon from './icons/SummarizeIcon';
import BrainIcon from './icons/BrainIcon';
import ReadAloudIcon from './icons/ReadAloudIcon';
import TranslateIcon from './icons/TranslateIcon';
import QuizIcon from './icons/QuizIcon';
import BalanceIcon from './icons/BalanceIcon';
import InfoIcon from './icons/InfoIcon';
import AnalysisIcon from './icons/AnalysisIcon';
import MagicWandIcon from './icons/MagicWandIcon';
import CrownIcon from './icons/CrownIcon'; // Premium feature icon
import AuthorIcon from './icons/AuthorIcon';

interface FloatingActionbarProps {
  article: Article;
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
  onTextToSpeech: (article: Article) => void;
  onTranslate: (article: Article) => void;
  onQuiz: (article: Article) => void;
  onCounterpoint: (article: Article) => void;
  onBehindTheNews: (article: Article) => void;
  onExpertAnalysis: (article: Article) => void;
  onAskAuthor: (article: Article) => void;
  showCounterpoint: boolean;
  isZenMode: boolean;
  activeLens: ReadingLens;
  onSetLens: (lens: ReadingLens) => void;
  subscriptionTier: SubscriptionTier;
  onPremiumClick: () => void;
}

const FloatingActionbar: React.FC<FloatingActionbarProps> = ({
  article,
  onSummarize,
  onExplainSimply,
  onTextToSpeech,
  onTranslate,
  onQuiz,
  onCounterpoint,
  onBehindTheNews,
  onExpertAnalysis,
  onAskAuthor,
  showCounterpoint,
  isZenMode,
  activeLens,
  onSetLens,
  subscriptionTier,
  onPremiumClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isPremium = subscriptionTier === 'Premium';

  const handlePremiumFeature = (action: (article: Article) => void) => {
      if (isPremium) {
          action(article);
      } else {
          onPremiumClick();
      }
  };

  const ActionButton: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string; isActive?: boolean; isPremiumFeature?: boolean; }> = ({ onClick, icon, label, isActive, isPremiumFeature = false }) => (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg w-20 text-xs font-semibold transition-colors duration-200 ${
        isActive ? 'text-deep-red dark:text-gold' : 'text-slate-700 dark:text-slate-300'
      } hover:bg-slate-100 dark:hover:bg-slate-700/50`}
    >
      {isPremiumFeature && !isPremium && (
          <div className="absolute top-1 right-1 bg-gold text-white rounded-full p-0.5">
              <CrownIcon className="w-3 h-3"/>
          </div>
      )}
      <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
        isActive ? 'bg-red-100 dark:bg-gold/20' : 'bg-slate-200 dark:bg-slate-800'
      } group-hover:bg-red-100 dark:group-hover:bg-gold/20 text-slate-600 dark:text-slate-300 group-hover:text-deep-red dark:group-hover:text-gold`}>
        {icon}
      </div>
      <span className="truncate">{label}</span>
    </button>
  );

  const lenses: ReadingLens[] = ['None', 'Simplify', 'DefineTerms'];

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
      }`}
    >
      <div className="bg-white/80 dark:bg-navy/80 backdrop-blur-md rounded-full shadow-2xl p-2 flex items-center gap-1 border border-slate-200 dark:border-slate-700">
        {isZenMode ? (
            <div className="flex items-center gap-1 px-2">
                <div className="flex items-center gap-2 mr-2">
                    <MagicWandIcon className="w-5 h-5 text-deep-red dark:text-gold" />
                    <span className="font-semibold text-sm">Lens:</span>
                </div>
                {lenses.map(lens => (
                     <button key={lens} onClick={() => onSetLens(lens)} className={`px-3 py-1.5 rounded-full text-sm font-semibold ${activeLens === lens ? 'bg-deep-red text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                        {lens === 'DefineTerms' ? 'Define' : lens}
                     </button>
                ))}
            </div>
        ) : (
          <>
            <ActionButton onClick={() => onSummarize(article)} icon={<SummarizeIcon className="w-5 h-5" />} label="Summarize" />
            <ActionButton onClick={() => onExplainSimply(article)} icon={<BrainIcon className="w-5 h-5" />} label="Explain" />
            <ActionButton onClick={() => handlePremiumFeature(onBehindTheNews)} icon={<InfoIcon className="w-5 h-5" />} label="Context" isPremiumFeature={true}/>
            <ActionButton onClick={() => handlePremiumFeature(onExpertAnalysis)} icon={<AnalysisIcon className="w-5 h-5" />} label="Analyze" isPremiumFeature={true}/>
            <ActionButton onClick={() => handlePremiumFeature(onAskAuthor)} icon={<AuthorIcon className="w-5 h-5" />} label="Ask Author" isPremiumFeature={true}/>
            <ActionButton onClick={() => onTextToSpeech(article)} icon={<ReadAloudIcon className="w-5 h-5" />} label="Listen" />
            <ActionButton onClick={() => onTranslate(article)} icon={<TranslateIcon className="w-5 h-5" />} label="Translate" />
            {showCounterpoint && <ActionButton onClick={() => onCounterpoint(article)} icon={<BalanceIcon className="w-5 h-5" />} label="Counterpoint" />}
          </>
        )}
      </div>
    </div>
  );
};

export default FloatingActionbar;