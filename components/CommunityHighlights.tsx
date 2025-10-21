import React from 'react';
import type { CommunityHighlight } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import UsersIcon from './icons/UsersIcon';
import { useTranslation } from '../hooks/useTranslation';

interface CommunityHighlightsProps {
  highlights: CommunityHighlight[];
  isLoading: boolean;
}

const CommunityHighlights: React.FC<CommunityHighlightsProps> = ({ highlights, isLoading }) => {
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <div className="mt-12 lg:pl-24 animate-pulse">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4 mb-6"></div>
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mt-4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (highlights.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 lg:pl-24">
      <h3 className="text-2xl font-extrabold mb-6 border-l-4 border-deep-red pl-4 flex items-center gap-2">
        <SparklesIcon className="text-gold"/> {t('communityHighlights')}
      </h3>
      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
            <UsersIcon className="w-5 h-5"/>
            <span>{t('aiSummaryOfConversation')}</span>
        </div>
        <div className="space-y-4">
          {highlights.map((highlight, index) => (
            <div key={index}>
              <h4 className="font-bold text-slate-800 dark:text-white">{highlight.viewpoint}</h4>
              <p className="text-slate-600 dark:text-slate-400">"{highlight.summary}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityHighlights;