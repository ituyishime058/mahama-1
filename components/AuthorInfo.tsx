import React from 'react';
import BookOpenIcon from './icons/BookOpenIcon';
import { useTranslation } from '../hooks/useTranslation';
import type { Language } from '../types';

const langToLocale: Record<string, string> = { 'English': 'en-US', 'French': 'fr-FR', 'Swahili': 'sw-KE', 'Kinyarwanda': 'rw-RW' };

interface ReadTimeIndicatorProps {
  content: string;
}

const ReadTimeIndicator: React.FC<ReadTimeIndicatorProps> = ({ content }) => {
  const { t } = useTranslation();
  const wordsPerMinute = 200;
  // Fallback for empty content
  const words = content ? content.split(/\s+/).length : 0;
  const readTime = Math.ceil(words / wordsPerMinute);

  return (
    <div className="flex items-center text-sm text-slate-500">
      <BookOpenIcon className="w-4 h-4 mr-1.5" />
      <span>{readTime} {t('minRead')}</span>
    </div>
  );
};

interface AuthorInfoProps {
  author: string;
  date: string;
  content: string;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, date, content }) => {
  const { t, language } = useTranslation();
  const locale = langToLocale[language] || 'en-US';
  const formattedDate = new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <div className="flex items-center my-6 border-y border-slate-200 dark:border-slate-700 py-4">
      <img
        src={`https://i.pravatar.cc/150?u=${author.replace(/\s+/g, '')}`}
        alt={author}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex-grow">
        <p className="font-bold text-slate-800 dark:text-white">{author}</p>
        <p className="text-sm text-slate-500">{t('publishedOn')} {formattedDate}</p>
      </div>
      <ReadTimeIndicator content={content} />
    </div>
  );
};

export default AuthorInfo;