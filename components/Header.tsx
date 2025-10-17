import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import MenuIcon from './icons/MenuIcon';
import CategoryDropdown from './CategoryDropdown';

interface HeaderProps {
  isDarkMode: boolean;
  onMenuClick: () => void;
  onLogoClick: () => void;
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
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
          <div className="flex items-center">
             <button onClick={onMenuClick} aria-label="Open menu" className="md:hidden text-slate-600 dark:text-slate-300 p-2 -ml-2 mr-4">
                <MenuIcon />
             </button>
             <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                <Logo className="h-8 w-8" />
                <span className="hidden sm:inline">Mahama News Hub</span>
             </a>
          </div>
          
          {/* Right side: Nav on desktop */}
          <div className="flex items-center justify-end gap-4">
             <div className="hidden md:flex items-center space-x-2">
               <CategoryDropdown categories={categories} onSelect={onSelectCategory} />
            </div>
             <button onClick={onMenuClick} aria-label="Open menu" className="md:hidden text-slate-600 dark:text-slate-300 p-2">
                <MenuIcon />
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;