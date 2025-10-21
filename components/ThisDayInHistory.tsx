
import React, { useState, useEffect, useMemo } from 'react';
import { getThisDayInHistory } from '../utils/ai';
import ClockIcon from './icons/ClockIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import { useTranslation } from '../hooks/useTranslation';
import type { Settings } from '../types';

interface ThisDayInHistoryProps {
  settings: Settings;
}

const ThisDayInHistory: React.FC<ThisDayInHistoryProps> = ({ settings }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { language } = useTranslation();

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const settingsWithLang = { ...settings, preferredLanguage: language };
        const historyContent = await getThisDayInHistory(settingsWithLang);
        setContent(historyContent);
      } catch (err) {
        setError('Could not load historical events.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [language, settings]);

  const formattedContent = useMemo(() => {
    if (!content) return [];
    return content.split('## ').filter(s => s.trim() !== '').map(s => {
        const parts = s.split('\n');
        const title = parts[0]?.trim() || '';
        const description = parts.slice(1).join(' ').trim();
        return { title, description };
    });
  }, [content]);

  return (
    <aside className="p-6 rounded-lg shadow-lg text-white relative overflow-hidden bg-gradient-to-br from-slate-700 via-navy to-slate-800">
      <h2 className="text-xl font-extrabold mb-4 border-l-4 border-gold pl-3 flex items-center gap-2">
        <ClockIcon className="w-5 h-5" />
        This Day in History
      </h2>
      {isLoading ? (
        <div className="flex items-center justify-center h-24">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <div className="space-y-4">
          {formattedContent.map((event, index) => (
            <div key={index}>
              <h4 className="font-bold text-gold">{event.title}</h4>
              <p className="text-sm text-slate-300">{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default ThisDayInHistory;
