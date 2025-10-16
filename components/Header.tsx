import React, { useState, useEffect } from 'react';
import SearchIcon from './icons/SearchIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import FontSizeIcon from './icons/FontSizeIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import Logo from './Logo';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  categories: string[];
  onFontSizeChange: (size: 'sm' | 'md' | 'lg') => void;
  onSearchClick: () => void;
  onBookmarksClick: () => void;
  onCategoryMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  categories, 
  onFontSizeChange, 
  onSearchClick, 
  onBookmarksClick,
  onCategoryMenuClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccessibilityOpen, setAccessibilityOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-navy/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              <Logo className="h-8 w-8" />
              <span className="hidden sm:inline">Mahama News Hub</span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {categories.slice(1, 7).map(category => ( // Show first few categories
              <a key={category} href="#" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold transition-colors duration-200">
                {category}
              </a>
            ))}
             <a href="#" onClick={(e) => { e.preventDefault(); onCategoryMenuClick(); }} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold transition-colors duration-200">
                More...
              </a>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button onClick={onSearchClick} aria-label="Open search" className="text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold transition-colors duration-200 p-2 rounded-full">
              <SearchIcon />
            </button>
            <button onClick={onBookmarksClick} aria-label="View bookmarks" className="text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold transition-colors duration-200 p-2 rounded-full">
              <BookmarkIcon />
            </button>
            <div className="relative">
              <button onClick={() => setAccessibilityOpen(!isAccessibilityOpen)} aria-label="Open accessibility menu" className="text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold transition-colors duration-200 p-2 rounded-full">
                <FontSizeIcon />
              </button>
              {isAccessibilityOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-10">
                  <button onClick={() => { onFontSizeChange('sm'); setAccessibilityOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Small</button>
                  <button onClick={() => { onFontSizeChange('md'); setAccessibilityOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Medium</button>
                  <button onClick={() => { onFontSizeChange('lg'); setAccessibilityOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Large</button>
                </div>
              )}
            </div>
            <button onClick={toggleDarkMode} aria-label="Toggle dark mode" className="text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold transition-colors duration-200 p-2 rounded-full">
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <div className="md:hidden">
              <button onClick={onCategoryMenuClick} aria-label="Open categories menu" className="flex items-center text-slate-600 dark:text-slate-300 p-2 rounded-full font-semibold">
                Categories <ChevronDownIcon className="h-5 w-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;