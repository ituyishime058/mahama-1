import React from 'react';

// Icon imports from the existing file structure
import AllIcon from './icons/AllIcon';
import GlobeIcon from './icons/GlobeIcon';
import PoliticsIcon from './icons/PoliticsIcon';
import EconomyIcon from './icons/EconomyIcon';
import TechnologyIcon from './icons/TechnologyIcon';
import SportsIcon from './icons/SportsIcon';
import HealthIcon from './icons/HealthIcon';
import HistoryIcon from './icons/HistoryIcon';
import CultureIcon from './icons/CultureIcon';
import EntertainmentIcon from './icons/EntertainmentIcon';
import InvestigatesIcon from './icons/InvestigatesIcon';

interface FilterBarProps {
  categories: string[];
  currentCategory: string;
  onSelectCategory: (category: string) => void;
}

const categoryIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  "All": AllIcon,
  "World": GlobeIcon,
  "Politics": PoliticsIcon,
  "Economy": EconomyIcon,
  "Technology": TechnologyIcon,
  "Sports": SportsIcon,
  "Health": HealthIcon,
  "History": HistoryIcon,
  "Culture": CultureIcon,
  "Entertainment": EntertainmentIcon,
  "Mahama Investigates": InvestigatesIcon,
};

const FilterBar: React.FC<FilterBarProps> = ({ categories, currentCategory, onSelectCategory }) => {
  return (
    <nav className="border-b border-slate-200 dark:border-slate-800 sticky top-20 z-30 bg-slate-50/80 dark:bg-navy/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            const isActive = category === currentCategory;

            // This provides a fallback just in case an icon is missing.
            if (!Icon) {
              console.warn(`No icon found for category: ${category}`);
              return (
                 <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                    isActive
                        ? 'bg-deep-red text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                >
                    <span>{category}</span>
                </button>
              );
            }

            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-deep-red text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </div>
       <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};

export default FilterBar;
