import React, { useState, useEffect, useRef } from 'react';
import type { User } from '../types';
import ProfileIcon from './icons/ProfileIcon';
import LogoutIcon from './icons/LogoutIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 rounded-full p-1 pr-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
      >
        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
        <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-2xl overflow-hidden z-50 border border-slate-200 dark:border-slate-700 animate-fade-in-down">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <p className="font-bold truncate">{user.name}</p>
            <p className="text-sm text-slate-500 truncate">{user.email}</p>
          </div>
          <ul className="p-2">
            <li>
              <button
                onClick={() => { onLogout(); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm font-medium text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"
              >
                <LogoutIcon className="w-5 h-5" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;