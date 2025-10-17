import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import VerifiedIcon from './icons/VerifiedIcon';
import UnverifiedIcon from './icons/UnverifiedIcon';
import MixedIcon from './icons/MixedIcon';

interface FactCheckProps {
  result: { status: string; summary: string } | null;
  isLoading: boolean;
}

const FactCheck: React.FC<FactCheckProps> = ({ result, isLoading }) => {
  
  if (isLoading) {
    return (
      <div className="mb-8 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 animate-pulse">
        <div className="flex items-center gap-3 mb-2">
            <SparklesIcon className="w-5 h-5 text-gold" />
            <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mt-2"></div>
      </div>
    );
  }

  if (!result || !result.status) {
    return null;
  }

  const statusConfig = {
    Verified: {
      icon: <VerifiedIcon className="w-6 h-6 text-green-500" />,
      text: 'Claims Verified',
      className: 'border-green-500/50 bg-green-500/10',
    },
    Mixed: {
      icon: <MixedIcon className="w-6 h-6 text-yellow-500" />,
      text: 'Mixed Claims',
      className: 'border-yellow-500/50 bg-yellow-500/10',
    },
    Unverified: {
      icon: <UnverifiedIcon className="w-6 h-6 text-red-500" />,
      text: 'Claims Unverified',
      className: 'border-red-500/50 bg-red-500/10',
    },
  };

  const config = statusConfig[result.status as keyof typeof statusConfig] || statusConfig.Unverified;

  return (
    <div className={`mb-8 p-4 rounded-lg border ${config.className}`}>
      <div className="flex items-center gap-3 mb-2">
        {config.icon}
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
          AI Fact-Check:
          <span className="font-semibold">{config.text}</span>
        </h3>
      </div>
      <p className="text-slate-700 dark:text-slate-300 text-sm">
        {result.summary}
      </p>
    </div>
  );
};

export default FactCheck;