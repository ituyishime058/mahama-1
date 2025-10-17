
import React, { useRef, useEffect, useState } from 'react';
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
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
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

const FilterBar: React.FC<FilterBarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      handleScroll();
      currentRef.addEventListener('scroll', handleScroll, { passive: true });
    }
     // Check on resize
    window.addEventListener('resize', handleScroll);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
    };
  }, [categories]);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative my-8">
      {showLeftArrow && (
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-navy/80 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      )}
      <div 
        ref={scrollRef} 
        className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-hide"
      >
        {categories.map(category => {
          const Icon = categoryIcons[category] || GlobeIcon;
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                isSelected
                  ? 'bg-deep-red text-white shadow-md'
                  : 'bg-white dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
              {category}
            </button>
          );
        })}
      </div>
      {showRightArrow && (
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-navy/80 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform"
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      )}
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default FilterBar;
