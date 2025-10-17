import React, { useState, useEffect } from 'react';
import type { Settings } from '../types';
import { factCheckPageContent } from '../utils/ai';
import CloseIcon from './icons/CloseIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

interface FactCheckPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  pageContent: string;
}

const FactCheckPageModal: React.FC<FactCheckPageModalProps> = ({ isOpen, onClose, settings, pageContent }) => {
  const [result, setResult] = useState<{ summary: string; sources: { uri: string, title: string }[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && pageContent) {
      const performFactCheck = async () => {
        setIsLoading(true);
        setError('');
        setResult(null);
        try {
          const checkResult = await factCheckPageContent(pageContent, settings);
          setResult(checkResult);
        } catch (err: any) {
          setError(err.message || 'Failed to perform fact-check.');
        } finally {
          setIsLoading(false);
        }
      };
      performFactCheck();
    }
  }, [isOpen, pageContent, settings]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 animate-slide-up flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ height: 'clamp(400px, 80vh, 700px)' }}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-white">
                <CloseIcon />
            </button>
            <div className="flex items-center gap-3">
                <ShieldCheckIcon className="w-8 h-8 text-deep-red dark:text-gold"/>
                <h3 className="font-bold text-2xl">Full Page Fact-Check</h3>
            </div>
        </div>
        <div className="p-6 flex-grow overflow-y-auto">
            {isLoading && <div className="flex justify-center items-center h-full"><LoadingSpinner /><p className="ml-2">Analyzing page content...</p></div>}
            {error && <p className="text-red-500">{error}</p>}
            {result && (
                <div>
                    <h4 className="font-bold text-lg mb-2">AI Analysis Summary</h4>
                    <p className="mb-6 prose dark:prose-invert max-w-none">{result.summary}</p>

                    <h4 className="font-bold text-lg mb-2">Sources Found</h4>
                    {result.sources.length > 0 ? (
                        <ul className="space-y-2 list-disc list-inside">
                            {result.sources.map((source, index) => (
                                <li key={index} className="text-sm">
                                    <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
                                        {source.title || source.uri}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-slate-500">No external sources were cited by the AI.</p>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FactCheckPageModal;
