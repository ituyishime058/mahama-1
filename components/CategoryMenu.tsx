import React, { useState, useEffect } from 'react';
import type { Category } from '../types';
import CloseIcon from './icons/CloseIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import OfflineIcon from './icons/OfflineIcon';
import SettingsIcon from './icons/SettingsIcon';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onCategorySelect: (category: string) => void;
  onBookmarksClick: () => void;
  onOfflineClick: () => void;
  onSettingsClick: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ 
  isOpen, 
  onClose, 
  categories, 
  onCategorySelect,
  onBookmarksClick,
  onOfflineClick,
  onSettingsClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (!isOpen) {
        // Reset active category when menu closes
        const timer = setTimeout(() => setActiveCategory(null), 300);
        return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleCategoryClick = (category: Category) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setActiveCategory(category);
    } else {
      onCategorySelect(category.name);
    }
  };

  const handleSubCategoryClick = (subCategoryName: string) => {
    if (activeCategory) {
        // In a real app, you might want a more complex handler
        // For now, selecting a subcategory just selects the main category and closes.
        onCategorySelect(activeCategory.name);
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
        className={`absolute top-0 left-0 bottom-0 w-full max-w-4xl bg-white/90 dark:bg-navy/90 shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between h-20 px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
                <h2 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gold to-deep-red">
                    Explore Sections
                </h2>
                <button onClick={onClose} aria-label="Close menu" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <CloseIcon />
                </button>
            </header>

            <main className="flex-grow grid md:grid-cols-2 overflow-hidden">
                <nav className="py-8 flex-grow overflow-y-auto border-r border-slate-200 dark:border-slate-800">
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
                            className={`flex items-center justify-between py-3 px-4 text-xl font-semibold rounded-lg transition-colors ${activeCategory?.name === category.name ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'} text-slate-700 dark:text-slate-300`}
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
                <div className="py-8 pl-8 hidden md:block overflow-y-auto bg-slate-50/50 dark:bg-slate-900/20">
                    {activeCategory && activeCategory.subcategories ? (
                        <div className="animate-fade-in">
                            <h3 className="text-2xl font-bold mb-6 text-deep-red dark:text-gold">{activeCategory.name}</h3>
                            <ul className="space-y-3">
                                {activeCategory.subcategories.map(sub => (
                                    <li key={sub}>
                                        <a href="#" onClick={(e) => { e.preventDefault(); handleSubCategoryClick(sub); }} className="block py-2 px-3 text-lg rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">{sub}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col justify-center items-center text-slate-400">
                            <p className="font-semibold text-lg">Select a category</p>
                            <p>or explore your personal sections below.</p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="p-4 border-t border-slate-200 dark:border-slate-800 flex-shrink-0 bg-white/50 dark:bg-navy/50">
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

export default MegaMenu;
