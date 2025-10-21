import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import MenuIcon from './icons/MenuIcon';
import SearchIcon from './icons/SearchIcon';
import GlobeIcon from './icons/GlobeIcon';
import UserMenu from './UserMenu';
import BellIcon from './icons/BellIcon';
import LanguageDropdown from './LanguageDropdown';
import type { User, Notification, Settings, Language } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import UserIcon from './icons/UserIcon';
import RingLoader from './RingLoader';

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
  onNotificationsClick: () => void;
  notifications: Notification[];
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
  isTranslating: boolean;
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
  onNotificationsClick,
  notifications,
  settings,
  onSettingsChange,
  isTranslating,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);
  
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onLogoClick();
  };

  const handleLanguageChange = (lang: Language) => {
    onSettingsChange({ ...settings, preferredLanguage: lang });
    setIsLangDropdownOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-navy/80 dark:bg-gradient-to-r dark:from-navy dark:to-slate-900 backdrop-blur-sm shadow-md' : 'bg-transparent dark:bg-navy/50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Group */}
          <div className="flex-1 flex justify-start">
             <button onClick={onMenuClick} aria-label={t('openMenu')} className="text-slate-600 dark:text-slate-300 p-2 -ml-2">
                <MenuIcon />
             </button>
             <a href="#" onClick={handleLogoClick} className="hidden md:flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900 dark:text-white ml-4">
                <Logo className="h-10 w-10" />
                <span>{t('logoText')}</span>
             </a>
          </div>

          {/* Centered Logo (Mobile) */}
           <div className="md:hidden">
                <a href="#" onClick={handleLogoClick}><Logo className="h-10 w-10"/></a>
           </div>
          
          {/* Right Group */}
          <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2">
            <button onClick={onSearchClick} aria-label={t('openSearch')} className="p-2 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <SearchIcon />
            </button>
            
            <div className="relative" ref={langDropdownRef}>
              <button onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)} aria-label={t('selectLanguage')} className="p-2 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1">
                  <GlobeIcon />
                  {isTranslating && <RingLoader />}
              </button>
              {isLangDropdownOpen && (
                <LanguageDropdown
                  onLanguageChange={handleLanguageChange}
                  onClose={() => setIsLangDropdownOpen(false)}
                />
              )}
            </div>

            {isAuthenticated && (
              <button onClick={onNotificationsClick} aria-label={t('openNotifications')} className="relative p-2 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <BellIcon />
                  {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-deep-red opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-deep-red text-white text-xs items-center justify-center">{unreadCount}</span>
                      </span>
                  )}
              </button>
            )}

            {isAuthenticated ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
            ) : (
                 <div className="flex items-center gap-2">
                    <button 
                        onClick={onLoginClick} 
                        aria-label={t('login')} 
                        className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 rounded-full p-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
                    >
                        <UserIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">{t('login')}</span>
                    </button>
                    <button 
                        onClick={onLoginClick}
                        aria-label={t('register')}
                        className="hidden sm:block bg-deep-red text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-red-700 transition-colors"
                    >
                        {t('register')}
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;