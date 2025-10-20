import React, { useState, useRef, useEffect } from 'react';
import type { Category, SubscriptionTier } from '../types';
import BriefingIcon from './icons/BriefingIcon';
import CrownIcon from './icons/CrownIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface FilterBarProps {
  categories: Category[];
  currentCategory: string;
  currentSubCategory: string | null;
  onSelectCategory: (category: string) => void;
  onSelectSubCategory: (category: string, subCategory: string) => void;
  onGenerateBriefing: () => void;
  subscriptionTier: SubscriptionTier;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  categories, 
  currentCategory,
  currentSubCategory,
  onSelectCategory,
  onSelectSubCategory,
  onGenerateBriefing, 
  subscriptionTier 
}) => {
  const isPremium = subscriptionTier === 'Premium';
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.relatedTarget as Node)) {
        setOpenDropdown(null);
      }
    };
    navRef.current?.addEventListener('mouseleave', handleMouseLeave);
    return () => navRef.current?.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <nav ref={navRef} className="border-b border-slate-200 dark:border-slate-800 sticky top-20 z-30 bg-slate-50/80 dark:bg-navy/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-3 scrollbar-hide">
          <button
              onClick={onGenerateBriefing}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap bg-gold/20 text-gold hover:bg-gold/30 relative"
          >
              <BriefingIcon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden sm:inline">Generate Briefing</span>
              {!isPremium && <CrownIcon className="absolute -top-1 -right-1 w-4 h-4 text-gold bg-navy rounded-full p-0.5" />}
          </button>

          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = category.name === currentCategory;

            if (category.subcategories) {
              return (
                <div 
                  key={category.name} 
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(category.name)}
                >
                  <button
                    onClick={() => onSelectCategory(category.name)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-deep-red text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="hidden sm:inline">{category.name}</span>
                    <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${openDropdown === category.name ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === category.name && (
                     <div 
                        className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-2xl overflow-hidden z-10 border border-slate-200 dark:border-slate-700 animate-fade-in-down"
                        onMouseLeave={() => setOpenDropdown(null)}
                    >
                        <ul>
                            {category.subcategories.map(sub => (
                                <li key={sub}>
                                    <button 
                                        onClick={() => onSelectSubCategory(category.name, sub)}
                                        className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${currentSubCategory === sub && isActive ? 'bg-deep-red/10 text-deep-red dark:bg-gold/10 dark:text-gold' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                                    >
                                        {sub}
                                    </button>
                                </li>
                            ))}
                        </ul>
                     </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={category.name}
                onClick={() => onSelectCategory(category.name)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-deep-red text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden sm:inline">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
       <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </nav>
  );
};

export default FilterBar;