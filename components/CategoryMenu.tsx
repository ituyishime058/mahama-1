import React from 'react';
import CloseIcon from './icons/CloseIcon';
import Logo from './Logo';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import FontSizeIcon from './icons/FontSizeIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import OfflineIcon from './icons/OfflineIcon';

interface CategoryMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onCategorySelect: (category: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onFontSizeChange: (size: 'sm' | 'md' | 'lg') => void;
  onBookmarksClick: () => void;
  onOfflineClick: () => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ 
  isOpen, 
  onClose, 
  categories, 
  onCategorySelect,
  isDarkMode,
  toggleDarkMode,
  onFontSizeChange,
  onBookmarksClick,
  onOfflineClick,
}) => {
  return (
    <div
      className={`fixed inset-0 z-[70] bg-slate-100 dark:bg-navy transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-full">
        <div className="flex items-center justify-between h-20 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
            <a href="#" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              <Logo className="h-8 w-8" />
              <span>Menu</span>
            </a>
          <button onClick={onClose} aria-label="Close menu" className="p-2">
            <CloseIcon />
          </button>
        </div>

        {/* Controls Section */}
        <div className="py-6 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
          <div className="grid grid-cols-3 gap-4">
              <button onClick={onBookmarksClick} className="flex flex-col items-center justify-center p-3 bg-slate-200 dark:bg-slate-800 rounded-lg text-sm font-semibold">
                <BookmarkIcon className="w-6 h-6 mb-1" />
                Bookmarks
              </button>
               <button onClick={onOfflineClick} className="flex flex-col items-center justify-center p-3 bg-slate-200 dark:bg-slate-800 rounded-lg text-sm font-semibold">
                <OfflineIcon className="w-6 h-6 mb-1" />
                Offline
              </button>
              <button onClick={toggleDarkMode} className="flex flex-col items-center justify-center p-3 bg-slate-200 dark:bg-slate-800 rounded-lg text-sm font-semibold">
                {isDarkMode ? <SunIcon className="w-6 h-6 mb-1" /> : <MoonIcon className="w-6 h-6 mb-1" />}
                {isDarkMode ? 'Light' : 'Dark'}
              </button>
               <div className="col-span-3 grid grid-cols-3 gap-2">
                 <button onClick={() => onFontSizeChange('sm')} className="p-3 bg-slate-200 dark:bg-slate-800 rounded-lg text-sm font-semibold">A-</button>
                 <button onClick={() => onFontSizeChange('md')} className="p-3 bg-slate-200 dark:bg-slate-800 rounded-lg text-sm font-semibold">A</button>
                 <button onClick={() => onFontSizeChange('lg')} className="p-3 bg-slate-200 dark:bg-slate-800 rounded-lg text-sm font-semibold">A+</button>
               </div>
          </div>
        </div>
        
        <nav className="py-8 flex-grow overflow-y-auto">
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li 
                key={category}
                className="transition-all duration-500"
                style={{ 
                  transitionDelay: `${index * 30}ms`,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isOpen ? 1 : 0 
                }}
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onCategorySelect(category);
                  }}
                  className="block py-4 px-4 text-2xl font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CategoryMenu;