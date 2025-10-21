

import React, { useState, useEffect, useRef } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';

// Import all category icons
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

interface CategoryDropdownProps {
  categories: string[];
  onSelect: (category: string) => void;
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

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ categories, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (category: string) => {
    onSelect(category);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold transition-colors duration-200 p-2"
      >
        Categories
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-2xl overflow-hidden z-50 border border-slate-200 dark:border-slate-700 animate-fade-in-down">
          <ul className="p-2">
            {categories.map(category => {
              const Icon = categoryIcons[category] || GlobeIcon;
              return (
                <li key={category}>
                  <button
                    onClick={() => handleSelect(category)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-slate-500" />
                    {category}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
       <style>{`
            @keyframes fade-in-down {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-down { animation: fade-in-down 0.2s ease-out forwards; }
        `}</style>
    </div>
  );
};

export default CategoryDropdown;