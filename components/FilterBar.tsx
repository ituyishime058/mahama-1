import React from 'react';
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
  activeCategory: string;
  onFilterChange: (category: string) => void;
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

const FilterBar: React.FC<FilterBarProps> = ({ categories, activeCategory, onFilterChange }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-1 md:space-x-2 overflow-x-auto pb-2">
        {categories.map(category => {
          const Icon = categoryIcons[category] || AllIcon;
          return (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              aria-label={`Filter by ${category}`}
              title={category}
              className={`group relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-300 transform hover:scale-105
                ${activeCategory === category 
                  ? 'bg-deep-red text-white shadow-lg' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden lg:inline">{category}</span>
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default FilterBar;