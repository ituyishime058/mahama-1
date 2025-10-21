
import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { Category, SubscriptionTier } from '../types';
import BriefingIcon from './icons/BriefingIcon';
import CrownIcon from './icons/CrownIcon';
import { useTranslation } from '../hooks/useTranslation';

interface FilterBarProps {
  categories: Category[];
  currentCategory: string;
  currentSubCategory: string | null;
  onSelectCategory: (category: string) => void;
  onSelectSubCategory: (subCategory: string) => void;
  onGenerateBriefing: () => void;
  subscriptionTier: SubscriptionTier;
}

const SubCategoryBar: React.FC<{ subcategories: string[], activeSub: string | null, onSelect: (sub: string) => void }> = ({ subcategories, activeSub, onSelect }) => {
    const { t } = useTranslation();
    const subCategoryKeys: {[key: string]: string} = {
        "Americas": "americas",
        "Europe": "europe",
        "Asia": "asia",
        "Africa": "africa",
        "Middle East": "middleEast",
        "Elections": "elections",
        "Policy": "policy",
        "Global": "global",
        "Markets": "markets",
        "Finance": "finance",
        "Business": "business",
        "AI": "ai",
        "Cybersecurity": "cybersecurity",
        "Gadgets": "gadgets",
        "Energy": "energy",
        "Sci-Fi": "sci-fi",
        "Football": "football",
        "Basketball": "basketball",
        "Gaming": "gaming",
        "Wellness": "wellness",
        "Medical": "medical",
        "Mental Health": "mentalHealth",
        "Space": "space",
        "Biotech": "biotech",
        "Food": "food",
        "Language": "language",
        "Traditions": "traditions",
        "Ancient History": "ancientHistory",
        "Modern History": "modernHistory",
        "African History": "africanHistory",
        "Military History": "militaryHistory",
    };
    return (
        <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-fade-in-down py-2">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                    {subcategories.map(sub => (
                        <button
                            key={sub}
                            onClick={() => onSelect(sub)}
                            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                                activeSub === sub
                                    ? 'bg-deep-red text-white'
                                    : 'bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                        >
                            {t(subCategoryKeys[sub] || sub)}
                        </button>
                    ))}
                </div>
            </div>
             <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down { animation: fade-in-down 0.3s ease-out forwards; }
            `}</style>
        </div>
    )
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
  const { t } = useTranslation();

  const selectedCategoryData = useMemo(() => {
    return categories.find(c => c.name === currentCategory);
  }, [currentCategory, categories]);
  
  const categoryKeys: {[key: string]: string} = {
      "For You": "forYou",
      "All": "all",
      "World": "world",
      "Politics": "politics",
      "Economy": "economy",
      "Technology": "technology",
      "Sports": "sports",
      "Health": "health",
      "Science": "science",
      "Environment": "environment",
      "Culture": "culture",
      "Entertainment": "entertainment",
      "Movies & TV": "movies&tv",
      "Art": "art",
      "Music": "music",
      "History": "history",
      "Mahama Investigates": "mahamaInvestigates"
  };

  return (
    <div className="bg-slate-50/80 dark:bg-navy/80 backdrop-blur-sm shadow-sm">
        {selectedCategoryData?.subcategories && selectedCategoryData.subcategories.length > 0 && (
             <SubCategoryBar 
                subcategories={selectedCategoryData.subcategories}
                activeSub={currentSubCategory}
                onSelect={onSelectSubCategory}
             />
        )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-3 scrollbar-hide">
          <button
              onClick={onGenerateBriefing}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap bg-gold/20 text-gold hover:bg-gold/30 relative"
          >
              <BriefingIcon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden sm:inline">{t('aiBriefing')}</span>
              {!isPremium && <CrownIcon className="absolute -top-1 -right-1 w-4 h-4 text-gold bg-navy rounded-full p-0.5" />}
          </button>

          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = category.name === currentCategory;

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
                    <span className="hidden sm:inline">{t(categoryKeys[category.name] || category.name)}</span>
                </button>
              );
          })}
        </div>
      </div>
       <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default FilterBar;