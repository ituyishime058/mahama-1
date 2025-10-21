import React, { createContext, ReactNode } from 'react';
import type { Language } from '../types';
import { translations } from '../translations';

interface TranslationContextType {
  t: (key: string) => string;
  language: Language;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
  language: Language;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children, language }) => {
  const t = (key: string): string => {
    return translations[language]?.[key] || translations['English']?.[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ t, language }}>
      {children}
    </TranslationContext.Provider>
  );
};
