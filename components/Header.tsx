
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import MenuIcon from './icons/MenuIcon';
import SettingsIcon from './icons/SettingsIcon';
import UserIcon from './icons/UserIcon';

interface HeaderProps {
  onMenuClick: () => void;
  onSettingsClick: () => void;
  onLogoClick: () => void;
  categories: string[];
  onSelectCategory: (category: string) => void;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuClick,
  onSettingsClick,
  onLogoClick,
  categories,
  onSelectCategory,
  isAuthenticated,
  onLoginClick,
  onLogout,
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
          
          <div className="flex items-center gap-4">
             <button onClick={onMenuClick} aria-label="Open menu" className="text-slate-600 dark:text-slate-300 p-2 -ml-2">
                <MenuIcon />
             </button>
             <a href="#" onClick={handleLogoClick} className="hidden sm:flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                <Logo className="h-8 w-8" />
                <span>Mahama News Hub</span>
             </a>
          </div>
          
          <div className="flex items-center justify-end gap-2">
            <button onClick={onSettingsClick} aria-label="Open settings" className="p-2 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <SettingsIcon />
            </button>
            <button 
              onClick={isAuthenticated ? onLogout : onLoginClick} 
              aria-label={isAuthenticated ? "Logout" : "Login or sign up"} 
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 rounded-full px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
            >
                <UserIcon className="w-5 h-5" />
                <span className="hidden md:inline">{isAuthenticated ? 'Logout' : 'Login'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
