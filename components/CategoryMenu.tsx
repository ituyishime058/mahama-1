import React from 'react';
import CloseIcon from './icons/CloseIcon';
import Logo from './Logo';

interface CategoryMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onCategorySelect: (category: string) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ isOpen, onClose, categories, onCategorySelect }) => {
  return (
    <div
      className={`fixed inset-0 z-[70] bg-slate-100 dark:bg-navy transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-slate-200 dark:border-slate-800">
            <a href="#" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              <Logo className="h-8 w-8" />
              <span>Categories</span>
            </a>
          <button onClick={onClose} aria-label="Close menu" className="p-2">
            <CloseIcon />
          </button>
        </div>
        <nav className="py-8">
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category}>
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
