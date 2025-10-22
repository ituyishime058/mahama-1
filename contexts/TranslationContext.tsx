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
  
  // Initialize cache from localStorage for speed
  const cache = useRef<Partial<Record<Language, Translations>>>(() => {
      try {
          const storedCache = localStorage.getItem('mahama-translation-cache');
          // Start with built-in translations as a base
          const initialCache: Partial<Record<Language, Translations>> = { 
              English: translations.English,
              Kinyarwanda: translations.Kinyarwanda 
          };
          return storedCache ? { ...initialCache, ...JSON.parse(storedCache) } : initialCache;
      } catch (e) {
          console.error("Failed to read translation cache from localStorage", e);
          return { English: translations.English, Kinyarwanda: translations.Kinyarwanda };
      }
  });

  useEffect(() => {
    const loadTranslations = async () => {
      if (cache.current[language]) {
        setCurrentTranslations(cache.current[language]!);
        return;
      }
      
      if (!translations.English) return;

      // Non-blocking: Show English text as a fallback while translating.
      setCurrentTranslations(translations.English);
      setIsTranslating(true);
      
      try {
        const translatedStrings = await batchTranslate(translations.English, language, settings);
        cache.current[language] = translatedStrings;
        
        // Save to localStorage
        try {
            localStorage.setItem('mahama-translation-cache', JSON.stringify(cache.current));
        } catch (e) {
            console.error("Failed to save translation cache to localStorage", e);
        }

        // Update the UI with the new translations once they are ready.
        setCurrentTranslations(translatedStrings);
      } catch (error) {
        console.error(`Failed to translate to ${language}:`, error);
        // On error, the UI remains in English, which is better than showing keys.
      } finally {
        setIsTranslating(false);
      }
    };

    loadTranslations();
  }, [language, settings]);
  
  const t = (key: string): string => {
    // Fallback logic: return the English version if a key is missing in the current language
    return currentTranslations?.[key] || translations.English?.[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ t, language, isTranslating }}>
      {children}
    </TranslationContext.Provider>
  );
};
