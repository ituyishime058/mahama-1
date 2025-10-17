import React, { useState, useEffect } from 'react';
import SearchIcon from './icons/SearchIcon';
import Logo from './Logo';
import MenuIcon from './icons/MenuIcon';
import CategoryDropdown from './CategoryDropdown';

interface HeaderProps {
  isDarkMode: boolean;
  onSearchClick: () => void;
  onMenuClick: () => void;
  onLogoClick: () => void;
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  onSearchClick, 
  onMenuClick,
  onLogoClick,
  categories,
  onSelectCategory
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onLogoClick();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-navy/80 backdrop-blur-sm shadow-md' : 'bg-transparent dark:bg-navy/50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left side: Menu on mobile, Logo+Title on desktop */}
          <div className="flex-1 md:flex-none">
             <button onClick={onMenuClick} aria-label="Open menu" className="md:hidden text-slate-600 dark:text-slate-300 p-2 -ml-2">
                <MenuIcon />
             </button>
             <a href="#" onClick={handleLogoClick} className="hidden md:flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                <Logo className="h-8 w-8" />
                <span>Mahama News Hub</span>
             </a>
          </div>
          
          {/* Centered Logo on mobile */}
          <div className="md:hidden flex-1 flex justify-center">
            <a href="#" onClick={handleLogoClick} className="flex items-center text-slate-900 dark:text-white">
               <Logo className="h-9 w-9" />
            </a>
          </div>

          {/* Right side: Search on mobile, Full Nav + Search on desktop */}
          <div className="flex-1 md:flex-none flex items-center justify-end gap-4">
             <div className="hidden md:flex items-center space-x-2">
               <CategoryDropdown categories={categories} onSelect={onSelectCategory} />
            </div>
            
            {/* Search Bar for desktop */}
            <div className="hidden md:block">
                <button 
                    onClick={onSearchClick} 
                    aria-label="Open search" 
                    className="group flex items-center w-48 bg-slate-100 dark:bg-slate-800/50 rounded-full px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
                >
                    <SearchIcon className="w-5 h-5 mr-2 text-slate-400 dark:text-slate-500"/>
                    Search...
                </button>
            </div>

            {/* Search Icon for mobile */}
            <button onClick={onSearchClick} aria-label="Open search" className="md:hidden text-slate-600 dark:text-slate-300 hover:text-deep-red dark:hover:text-gold transition-colors duration-200 p-2 rounded-full">
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
