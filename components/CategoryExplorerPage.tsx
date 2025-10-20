import React, { useState, useEffect } from 'react';
import type { Category } from '../types';
import CloseIcon from './icons/CloseIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import OfflineIcon from './icons/OfflineIcon';
import SettingsIcon from './icons/SettingsIcon';

interface CategoryExplorerPageProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onCategorySelect: (category: string) => void;
  onSubCategorySelect: (subCategory: string) => void;
  onBookmarksClick: () => void;
  onOfflineClick: () => void;
  onSettingsClick: () => void;
}

const CategoryExplorerPage: React.FC<CategoryExplorerPageProps> = ({ 
  isOpen, 
  onClose, 
  categories, 
  onCategorySelect,
  onSubCategorySelect,
  onBookmarksClick,
  onOfflineClick,
  onSettingsClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (isOpen && categories.length > 0) {
        // Pre-select the first category with subcategories
        setActiveCategory(categories.find(c => c.subcategories && c.subcategories.length > 0) || categories[0]);
    } else if (!isOpen) {
        const timer = setTimeout(() => setActiveCategory(null), 300); // Delay reset for animation
        return () => clearTimeout(timer);
    }
  }, [isOpen, categories]);

  const handleCategoryClick = (category: Category) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setActiveCategory(category);
    } else {
      onCategorySelect(category.name);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[70] bg-black/50 backdrop-blur-md transition-opacity duration-500 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className={`absolute top-0 left-0 bottom-0 w-full max-w-5xl bg-slate-50/80 dark:bg-navy/80 shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between h-20 px-6 lg:px-8 border-b border-slate-200/50 dark:border-slate-800/50 flex-shrink-0">
                <h2 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gold to-deep-red">
                    Explore
                </h2>
                <button onClick={onClose} aria-label="Close menu" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <CloseIcon />
                </button>
            </header>

            <main className="flex-grow grid md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
                <nav className="py-8 flex-grow overflow-y-auto border-r border-slate-200/50 dark:border-slate-800/50 md:col-span-1 lg:col-span-1">
                    <ul className="space-y-1 px-4 lg:px-6">
                        {categories.map((category) => {
                        const Icon = category.icon;
                        const hasSubcategories = category.subcategories && category.subcategories.length > 0;
                        return (
                        <li key={category.name}>
                            <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleCategoryClick(category); }}
                            onMouseEnter={() => hasSubcategories && setActiveCategory(category)}
                            className={`flex items-center justify-between py-3 px-4 text-lg font-semibold rounded-lg transition-colors ${activeCategory?.name === category.name ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'} text-slate-700 dark:text-slate-300`}
                            >
                                <span className="flex items-center gap-4">
                                    <Icon className="w-6 h-6" />
                                    {category.name}
                                </span>
                                {hasSubcategories && <ChevronRightIcon className="w-5 h-5 text-slate-400" />}
                            </a>
                        </li>
                        )})}
                    </ul>
                </nav>
                <div className="py-8 px-8 hidden md:block overflow-y-auto bg-slate-100/30 dark:bg-slate-900/20 md:col-span-2 lg:col-span-3">
                    {activeCategory?.subcategories ? (
                        <div className="animate-fade-in">
                            <h3 className="text-3xl font-bold mb-6 text-deep-red dark:text-gold">{activeCategory.name}</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {activeCategory.subcategories.map((sub, index) => (
                                    <button 
                                        key={sub}
                                        onClick={() => onSubCategorySelect(sub)}
                                        className="group block p-4 text-left bg-white/50 dark:bg-slate-800/50 rounded-lg shadow-sm hover:shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all transform hover:-translate-y-1 animate-stagger-in"
                                        style={{ animationDelay: `${index * 50}ms`}}
                                    >
                                        <h4 className="font-semibold text-lg">{sub}</h4>
                                        <p className="text-sm text-slate-500">Explore articles in {sub}</p>
                                    </button>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col justify-center items-center text-slate-400 text-center p-8">
                            <div 
                                className="w-48 h-48 mb-8 bg-gradient-to-br from-gold/10 to-deep-red/10 dark:from-gold/20 dark:to-deep-red/20 rounded-full flex items-center justify-center animate-pulse"
                            >
                                <div className="w-32 h-32 bg-slate-50 dark:bg-navy rounded-full flex items-center justify-center">
                                    <span className="text-5xl font-black">M</span>
                                </div>
                            </div>
                            <h3 className="font-semibold text-2xl">Discover Your News</h3>
                            <p>Select a category to begin, or explore your personal sections below.</p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 flex-shrink-0 bg-white/50 dark:bg-navy/50">
                 <div className="grid grid-cols-3 gap-4">
                    <button onClick={() => { onBookmarksClick(); onClose(); }} className="flex flex-col items-center justify-center p-3 text-sm font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                        <BookmarkIcon className="w-6 h-6 mb-1" /> Bookmarks
                    </button>
                    <button onClick={() => { onOfflineClick(); onClose(); }} className="flex flex-col items-center justify-center p-3 text-sm font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                        <OfflineIcon className="w-6 h-6 mb-1" /> Offline
                    </button>
                    <button onClick={() => { onSettingsClick(); onClose(); }} className="flex flex-col items-center justify-center p-3 text-sm font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                        <SettingsIcon className="w-6 h-6 mb-1" /> Settings
                    </button>
                </div>
            </footer>
        </div>
      </div>
    </div>
  );
};

export default CategoryExplorerPage;