import React, { useState } from 'react';
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

  const handleCategoryClick = (category: Category) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setActiveCategory(category);
    } else {
      onCategorySelect(category.name);
      onClose();
    }
  };

  const handleSubCategoryClick = (categoryName: string, subCategoryName: string) => {
    onCategorySelect(categoryName);
    // This part requires `App.tsx` to handle subcategory selection, 
    // for now we just select the main category and close.
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[70] bg-black/50 backdrop-blur-lg transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className={`absolute top-0 left-0 bottom-0 w-full md:w-3/4 lg:w-2/3 bg-white/95 dark:bg-navy/95 shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-full">
            <header className="flex items-center justify-between h-20 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
                <h2 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gold to-deep-red">
                    Explore Sections
                </h2>
                <button onClick={onClose} aria-label="Close menu" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <CloseIcon />
                </button>
            </header>

            <main className="flex-grow flex md:grid md:grid-cols-2 overflow-hidden">
                <nav className="py-8 flex-grow overflow-y-auto w-full md:w-auto border-r-0 md:border-r md:border-slate-200 md:dark:border-slate-800">
                    <ul className="space-y-1 pr-4">
                        {categories.map((category, index) => {
                        const Icon = category.icon;
                        const hasSubcategories = category.subcategories && category.subcategories.length > 0;
                        return (
                        <li key={category.name}>
                            <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleCategoryClick(category); }}
                            className="flex items-center justify-between py-3 px-4 text-xl font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
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
                <div className="py-8 pl-4 hidden md:block overflow-y-auto">
                    {activeCategory && activeCategory.subcategories ? (
                        <div className="animate-fade-in">
                            <h3 className="text-xl font-bold mb-4">{activeCategory.name}</h3>
                            <ul className="space-y-2">
                                {activeCategory.subcategories.map(sub => (
                                    <li key={sub}>
                                        <a href="#" onClick={(e) => { e.preventDefault(); handleSubCategoryClick(activeCategory.name, sub); }} className="block py-2 px-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800">{sub}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col justify-center items-center text-slate-400">
                            <p className="font-semibold">Select a category to view sub-sections.</p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="p-4 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
                 <div className="grid grid-cols-3 gap-4">
                    <button onClick={() => { onBookmarksClick(); onClose(); }} className="flex flex-col items-center justify-center p-3 text-sm font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
                        <BookmarkIcon className="w-6 h-6 mb-1" /> Bookmarks
                    </button>
                    <button onClick={() => { onOfflineClick(); onClose(); }} className="flex flex-col items-center justify-center p-3 text-sm font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
                        <OfflineIcon className="w-6 h-6 mb-1" /> Offline
                    </button>
                    <button onClick={() => { onSettingsClick(); onClose(); }} className="flex flex-col items-center justify-center p-3 text-sm font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
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
