import React from 'react';
import LoadingSpinner from './icons/LoadingSpinner';
import LightbulbIcon from './icons/LightbulbIcon';

interface KeyTakeawaysProps {
  takeaways: string[];
  isLoading: boolean;
}

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ takeaways, isLoading }) => {
  if (isLoading) {
    return (
      <div className="my-8 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center text-slate-600 dark:text-slate-400">
          <LoadingSpinner className="mr-3" />
          <span className="font-semibold">Generating Key Takeaways...</span>
        </div>
      </div>
    );
  }

  if (takeaways.length === 0) {
    return null;
  }
  
  return (
    <div className="my-8 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
      <h3 className="text-xl font-bold mb-4 flex items-center text-slate-800 dark:text-white">
        <LightbulbIcon className="w-6 h-6 mr-2 text-gold" />
        Key Takeaways
      </h3>
      <ul className="space-y-2 list-disc list-inside text-slate-700 dark:text-slate-300">
        {takeaways.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default KeyTakeaways;
