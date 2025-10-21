import React, { createContext, ReactNode, useState, useEffect, useRef } from 'react';
import type { Language, Settings } from '../types';
import { translations } from '../translations';
import { batchTranslate } from '../utils/ai';

type Translations = {
  [key: string]: string;
};

interface TranslationContextType {
  t: (key: string) => string;
  language: Language;
  isTranslating: boolean;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
  language: Language;
  settings: Settings;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children, language, settings }) => {
  const [currentTranslations, setCurrentTranslations] = useState<Translations>(translations.English!);
  const [isTranslating, setIsTranslating] = useState(false);
  const cache = useRef<Partial<Record<Language, Translations>>>({
      English: translations.English,
      Kinyarwanda: translations.Kinyarwanda,
      French: undefined,
      Swahili: undefined,
  });

  useEffect(() => {
    const loadTranslations = async () => {
      if (cache.current[language]) {
        setCurrentTranslations(cache.current[language]!);
        return;
      }
      
      if (!translations.English) return;

      setIsTranslating(true);
      try {
        const translatedStrings = await batchTranslate(translations.English, language, settings);
        cache.current[language] = translatedStrings;
        setCurrentTranslations(translatedStrings);
      } catch (error) {
        console.error(`Failed to translate to ${language}:`, error);
        // Fallback to English on error
        setCurrentTranslations(translations.English!);
      } finally {
        setIsTranslating(false);
      }
    };

    loadTranslations();
  }, [language, settings]);
  
  const t = (key: string): string => {
    return currentTranslations?.[key] || translations.English?.[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ t, language, isTranslating }}>
      {children}
    </TranslationContext.Provider>
  );
};
