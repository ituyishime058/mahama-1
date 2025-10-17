import React from 'react';
import TrendingUpIcon from './icons/TrendingUpIcon';
import TrendingDownIcon from './icons/TrendingDownIcon';
import MinusIcon from './icons/MinusIcon';
import type { Article } from '../types';

interface SentimentIndicatorProps {
  sentiment?: Article['sentiment'];
}

const SentimentIndicator: React.FC<SentimentIndicatorProps> = ({ sentiment }) => {
  if (!sentiment) return null;

  const sentimentConfig = {
    Positive: {
      icon: <TrendingUpIcon className="w-4 h-4" />,
      text: 'Positive',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    },
    Neutral: {
      icon: <MinusIcon className="w-4 h-4" />,
      text: 'Neutral',
      className: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
    },
    Negative: {
      icon: <TrendingDownIcon className="w-4 h-4" />,
      text: 'Negative',
      className: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    },
  };

  const config = sentimentConfig[sentiment];

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.className}`}>
      {config.icon}
      <span>{config.text}</span>
    </div>
  );
};

export default SentimentIndicator;
