import React from 'react';
import type { Language } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface LanguageDropdownProps {
  onLanguageChange: (language: Language) => void;
  onClose: () => void;
}

const languages: { code: Language, name: string }[] = [
    { code: 'English', name: 'English' },
    { code: 'French', name: 'Français' },
    { code: 'Swahili', name: 'Kiswahili' },
    { code: 'Kinyarwanda', name: 'Kinyarwanda' },
];

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ onLanguageChange, onClose }) => {
  const { language: currentLanguage } = useTranslation();

  const handleSelect = (language: Language) => {
    onLanguageChange(language);
    onClose();
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-2xl overflow-hidden z-50 border border-slate-200 dark:border-slate-700 animate-fade-in-down">
      <ul className="p-2">
        {languages.map(({ code, name }) => (
          <li key={code}>
            <button
              onClick={() => handleSelect(code)}
              className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors
                ${code === currentLanguage 
                    ? 'font-bold text-deep-red dark:text-gold' 
                    : 'font-medium text-slate-700 dark:text-slate-300'
                }
            `}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageDropdown;