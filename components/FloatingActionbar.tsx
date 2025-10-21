import React, { useState, useEffect } from 'react';
import type { Article, ReadingLens, SubscriptionTier } from '../types';
import SummarizeIcon from './icons/SummarizeIcon';
import BrainIcon from './icons/BrainIcon';
import QuizIcon from './icons/QuizIcon';
import BalanceIcon from './icons/BalanceIcon';
import AnalysisIcon from './icons/AnalysisIcon';
import CrownIcon from './icons/CrownIcon';
import AuthorIcon from './icons/AuthorIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import DeepDiveIcon from './icons/DeepDiveIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import { useTranslation } from '../hooks/useTranslation';

interface FloatingActionbarProps {
  article: Article;
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
  onTextToSpeech: (article: Article) => void;
  onQuiz: (article: Article) => void;
  onCounterpoint: (article: Article) => void;
  onBehindTheNews: (article: Article) => void;
  onExpertAnalysis: (article: Article) => void;
  onAskAuthor: (article: Article) => void;
  onFactCheckPage: (article: Article) => void;
  onDeepDive: (article: Article) => void;
  onInfographic: (article: Article) => void;
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
  onQuiz,
  onCounterpoint,
  onExpertAnalysis,
  onAskAuthor,
  onFactCheckPage,
  onDeepDive,
  onInfographic,
  showCounterpoint,
  isZenMode,
  subscriptionTier,
  onPremiumClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
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

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-in-out ${
        isVisible && !isZenMode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
      }`}
    >
      <div className="bg-white/80 dark:bg-navy/80 backdrop-blur-md rounded-full shadow-2xl p-2 flex items-center gap-1 border border-slate-200 dark:border-slate-700">
        <ActionButton onClick={() => onSummarize(article)} icon={<SummarizeIcon className="w-5 h-5" />} label={t('summarize')} />
        <ActionButton onClick={() => onExplainSimply(article)} icon={<BrainIcon className="w-5 h-5" />} label={t('explain')} />
        <ActionButton onClick={() => onQuiz(article)} icon={<QuizIcon className="w-5 h-5" />} label={t('quiz')} />
        <ActionButton onClick={() => handlePremiumFeature(onAskAuthor)} icon={<AuthorIcon className="w-5 h-5" />} label={t('askAuthor')} isPremiumFeature={true}/>
        <ActionButton onClick={() => handlePremiumFeature(onExpertAnalysis)} icon={<AnalysisIcon className="w-5 h-5" />} label={t('analysis')} isPremiumFeature={true} />
        <ActionButton onClick={() => handlePremiumFeature(onDeepDive)} icon={<DeepDiveIcon className="w-5 h-5" />} label={t('deepDive')} isPremiumFeature={true} />
        {showCounterpoint && <ActionButton onClick={() => handlePremiumFeature(onCounterpoint)} icon={<BalanceIcon className="w-5 h-5" />} label={t('counterpoint')} isPremiumFeature={true} />}
        <ActionButton onClick={() => handlePremiumFeature(onFactCheckPage)} icon={<ShieldCheckIcon className="w-5 h-5" />} label={t('factCheck')} isPremiumFeature={true}/>
        <ActionButton onClick={() => handlePremiumFeature(onInfographic)} icon={<ChartBarIcon className="w-5 h-5" />} label={t('infographic')} isPremiumFeature={true} />
      </div>
    </div>
  );
};

export default FloatingActionbar;