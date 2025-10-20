import React from 'react';
import CloseIcon from './icons/CloseIcon';

interface InfoPageProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const InfoPage: React.FC<InfoPageProps> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-slate-100/80 dark:bg-navy/80 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full h-full transform transition-all duration-300 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8 h-full">
            <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-xl h-full flex flex-col">
                <header className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{title}</h1>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <CloseIcon />
                    </button>
                </header>
                <main className="p-8 overflow-y-auto flex-grow">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {children}
                    </div>
                </main>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;