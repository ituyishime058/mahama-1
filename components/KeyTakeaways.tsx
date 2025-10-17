import React, { useState } from 'react';
import LightbulbIcon from './icons/LightbulbIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface KeyTakeawaysProps {
  takeaways: string[];
}

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ takeaways }) => {
  const [isOpen, setIsOpen] = useState(true);

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
            Key Takeaways
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
