import { useContext } from 'react';
import { TranslationContext } from '../contexts/TranslationContext';

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return { t: context.t, language: context.language, isTranslating: context.isTranslating };
};