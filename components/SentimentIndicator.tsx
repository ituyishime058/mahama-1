import React from 'react';
import TrendingUpIcon from './icons/TrendingUpIcon';
import TrendingDownIcon from './icons/TrendingDownIcon';
import MinusIcon from './icons/MinusIcon';
import LoadingSpinner from './icons/LoadingSpinner';

interface SentimentIndicatorProps {
  sentiment: 'positive' | 'negative' | 'neutral' | null;
  isLoading: boolean;
}

const SentimentIndicator: React.FC<SentimentIndicatorProps> = ({ sentiment, isLoading }) => {
  if (isLoading) {
    return (
      <div className="my-8 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center text-slate-600 dark:text-slate-400">
          <LoadingSpinner className="mr-3" />
          <span className="font-semibold">Analyzing Sentiment...</span>
        </div>
      </div>
    );
  }

  if (!sentiment) return null;

  const sentimentConfig = {
    positive: {
      Icon: TrendingUpIcon,
      text: 'Positive Sentiment',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/50',
      borderColor: 'border-green-200 dark:border-green-700/50',
    },
    negative: {
      Icon: TrendingDownIcon,
      text: 'Negative Sentiment',
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/50',
      borderColor: 'border-red-200 dark:border-red-700/50',
    },
    neutral: {
      Icon: MinusIcon,
      text: 'Neutral Sentiment',
      color: 'text-slate-500',
      bgColor: 'bg-slate-100 dark:bg-slate-800/50',
      borderColor: 'border-slate-200 dark:border-slate-700/50',
    },
  };

  const { Icon, text, color, bgColor, borderColor } = sentimentConfig[sentiment];

  return (
    <div className={`my-8 p-6 rounded-lg border ${bgColor} ${borderColor}`}>
      <h3 className={`text-xl font-bold mb-2 flex items-center ${color}`}>
        <Icon className="w-6 h-6 mr-2" />
        {text}
      </h3>
      <p className="text-sm text-slate-700 dark:text-slate-300">
        AI analysis of this article suggests the overall tone is {sentiment}. This is determined by analyzing the language, phrasing, and context within the text.
      </p>
    </div>
  );
};

export default SentimentIndicator;
