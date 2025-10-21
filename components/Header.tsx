import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import MenuIcon from './icons/MenuIcon';
import SettingsIcon from './icons/SettingsIcon';
import UserIcon from './icons/UserIcon';
import SearchIcon from './icons/SearchIcon';
import UserMenu from './UserMenu';
import type { User } from '../types';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onSettingsClick: () => void;
  onProfileClick: () => void;
  onLogoClick: () => void;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
  user: User;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuClick,
  onSearchClick,
  onSettingsClick,
  onProfileClick,
  onLogoClick,
  isAuthenticated,
  onLoginClick,
  onLogout,
  user,
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-navy/80 dark:bg-gradient-to-r dark:from-navy dark:to-slate-900 backdrop-blur-sm shadow-md' : 'bg-transparent dark:bg-navy/50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Group */}
          <div className="flex-1 flex justify-start">
             <button onClick={onMenuClick} aria-label="Open menu" className="text-slate-600 dark:text-slate-300 p-2 -ml-2">
                <MenuIcon />
             </button>
             <a href="#" onClick={handleLogoClick} className="hidden md:flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900 dark:text-white ml-4">
                <Logo className="h-10 w-10" />
                <span>Mahama News Hub</span>
             </a>
          </div>

          {/* Centered Logo (Mobile) */}
           <div className="md:hidden">
                <a href="#" onClick={handleLogoClick}><Logo className="h-10 w-10"/></a>
           </div>
          
          {/* Right Group */}
          <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2">
            <button onClick={onSearchClick} aria-label="Open search" className="p-2 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <SearchIcon />
            </button>
            
            {isAuthenticated ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
            ) : (
                <button 
                onClick={onLoginClick} 
                aria-label="Login or sign up" 
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 rounded-full p-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
                >
                    <UserIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">Login</span>
                </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;