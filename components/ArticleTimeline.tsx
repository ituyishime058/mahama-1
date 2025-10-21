import React from 'react';
import type { TimelineEvent } from '../types';
import TimelineIcon from './icons/TimelineIcon';
import { useTranslation } from '../hooks/useTranslation';

interface ArticleTimelineProps {
  events: TimelineEvent[];
  isLoading: boolean;
}

const ArticleTimeline: React.FC<ArticleTimelineProps> = ({ events, isLoading }) => {
  const { t } = useTranslation();
  if (isLoading) {
    return (
        <div className="my-8 p-4 space-y-8 animate-pulse">
             <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2 mb-6"></div>
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4">
                    <div className="w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                        <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                    </div>
                </div>
            ))}
        </div>
    );
  }

  if (events.length === 0) {
     return null;
  }

  return (
    <div className="my-8">
       <h3 className="text-2xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
        {t('historicalTimeline')}
      </h3>
      <div className="relative border-l-4 border-slate-200 dark:border-slate-700 ml-4">
        {events.map((event, index) => (
          <div key={index} className="mb-8 pl-8 relative">
            <div className="absolute -left-[18px] top-1 bg-gold w-8 h-8 rounded-full flex items-center justify-center text-white border-4 border-white dark:border-slate-800">
              <TimelineIcon className="w-4 h-4" />
            </div>
            <p className="font-bold text-lg text-deep-red dark:text-gold">{event.year}</p>
            <p className="text-slate-700 dark:text-slate-300">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleTimeline;