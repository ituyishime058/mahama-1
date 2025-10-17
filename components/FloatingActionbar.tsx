import React, { useState, useEffect } from 'react';
import type { Article } from '../types';
import SummarizeIcon from './icons/SummarizeIcon';
import BrainIcon from './icons/BrainIcon';
import ReadAloudIcon from './icons/ReadAloudIcon';
import TranslateIcon from './icons/TranslateIcon';
import QuizIcon from './icons/QuizIcon';

interface FloatingActionbarProps {
  article: Article;
  onSummarize: (article: Article) => void;
  onExplainSimply: (article: Article) => void;
  onTextToSpeech: (article: Article) => void;
  onTranslate: (article: Article) => void;
  onQuiz: (article: Article) => void;
}

const FloatingActionbar: React.FC<FloatingActionbarProps> = ({
  article,
  onSummarize,
  onExplainSimply,
  onTextToSpeech,
  onTranslate,
  onQuiz,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the bar after scrolling down 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ActionButton: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string; }> = ({ onClick, icon, label }) => (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg w-20 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 transition-colors group-hover:bg-red-100 dark:group-hover:bg-gold/20 text-slate-600 dark:text-slate-300 group-hover:text-deep-red dark:group-hover:text-gold">
        {icon}
      </div>
      <span className="truncate">{label}</span>
    </button>
  );

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
      }`}
    >
      <div className="bg-white/80 dark:bg-navy/80 backdrop-blur-md rounded-full shadow-2xl p-2 flex items-center gap-2 border border-slate-200 dark:border-slate-700">
        <ActionButton onClick={() => onSummarize(article)} icon={<SummarizeIcon className="w-5 h-5" />} label="Summarize" />
        <ActionButton onClick={() => onExplainSimply(article)} icon={<BrainIcon className="w-5 h-5" />} label="Explain" />
        <ActionButton onClick={() => onTextToSpeech(article)} icon={<ReadAloudIcon className="w-5 h-5" />} label="Listen" />
        <ActionButton onClick={() => onTranslate(article)} icon={<TranslateIcon className="w-5 h-5" />} label="Translate" />
        <ActionButton onClick={() => onQuiz(article)} icon={<QuizIcon className="w-5 h-5" />} label="Quiz" />
      </div>
    </div>
  );
};

export default FloatingActionbar;
