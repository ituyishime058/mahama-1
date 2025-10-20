import React, { useEffect, useState } from 'react';
import type { Article, Settings, InfographicData } from '../types';
import { generateInfographicData } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import LoadingSpinner from './icons/LoadingSpinner';

interface InfographicModalProps {
  isOpen: boolean;
  article: Article | null;
  settings: Settings;
  onClose: () => void;
}

const BarChart: React.FC<{ data: InfographicData }> = ({ data }) => {
    if (!data.items || data.items.length === 0) {
        return <p className="text-center text-slate-500">No data suitable for a chart was found in this article.</p>;
    }

    const maxValue = Math.max(...data.items.map(item => item.value));

    return (
        <div className="w-full h-64 flex justify-around items-end gap-2 p-4 border-b border-slate-200 dark:border-slate-700">
            {data.items.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div
                        className="w-full bg-deep-red dark:bg-gold rounded-t-md transition-all duration-500 origin-bottom animate-slide-up"
                        style={{ height: `${(item.value / maxValue) * 100}%`, animationDelay: `${index * 100}ms` }}
                    />
                </div>
            ))}
        </div>
    );
};

const BarChartLabels: React.FC<{ data: InfographicData }> = ({ data }) => {
    if (!data.items || data.items.length === 0) {
        return null;
    }
    return (
        <div className="w-full flex justify-around items-start gap-2 p-4 pt-2">
            {data.items.map((item, index) => (
                <div key={index} className="flex-1 text-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <p className="truncate" title={item.label}>{item.label}</p>
                    <p className="font-bold text-slate-800 dark:text-white">{item.value.toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}

const InfographicModal: React.FC<InfographicModalProps> = ({ isOpen, article, settings, onClose }) => {
  const [data, setData] = useState<InfographicData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (article && isOpen) {
      const getInfographic = async () => {
        setIsLoading(true);
        setError('');
        setData(null);
        try {
          const result = await generateInfographicData(article, settings);
          setData(result);
        } catch (err: any) {
          setError(err.message || 'Failed to generate infographic.');
        } finally {
          setIsLoading(false);
        }
      };
      getInfographic();
    }
  }, [article, isOpen, settings]);

  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 animate-slide-up flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ minHeight: '450px' }}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
                <CloseIcon />
            </button>
            <div className="flex items-center gap-3">
                <ChartBarIcon className="w-8 h-8 text-deep-red dark:text-gold"/>
                <h3 className="font-bold text-2xl">AI-Generated Infographic</h3>
            </div>
            <p className="text-sm text-slate-500 mt-1">A visual summary for "{article.title}"</p>
        </div>
        <div className="p-6 flex-grow flex flex-col justify-center">
            {isLoading && (
                <div className="text-center">
                    <LoadingSpinner className="w-10 h-10 mx-auto text-deep-red" />
                    <p className="mt-2 font-semibold">Analyzing data...</p>
                </div>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {data && (
                <div className="animate-fade-in">
                    <h4 className="text-center font-bold text-lg mb-4">{data.title}</h4>
                    <BarChart data={data} />
                    <BarChartLabels data={data} />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default InfographicModal;