import React, { useState } from 'react';
import LightbulbIcon from './icons/LightbulbIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface KeyTakeawaysProps {
  takeaways: string[];
  isLoading: boolean;
}

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ takeaways, isLoading }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (isLoading) {
    return (
        <div className="mb-8 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 animate-pulse">
            <div className="p-4">
                <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded-md mb-4"></div>
                <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                </div>
            </div>
        </div>
    );
  }

  if (takeaways.length === 0) return null;

  return (
    <div className="mb-8 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
      <button 
        className="w-full flex items-center justify-between p-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <LightbulbIcon className="w-6 h-6 text-gold" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            AI Key Takeaways
          </h3>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="list-none p-4 pt-0 space-y-2">
          {takeaways.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gold font-bold mr-3 mt-1">&#10003;</span>
              <p className="text-slate-700 dark:text-slate-300">{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KeyTakeaways;