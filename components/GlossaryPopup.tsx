import React from 'react';
import CloseIcon from './icons/CloseIcon';
import { useTranslation } from '../hooks/useTranslation';

interface GlossaryPopupProps {
  term: string;
  definition: string;
  position: { top: number; left: number };
  onClose: () => void;
}

const GlossaryPopup: React.FC<GlossaryPopupProps> = ({ term, definition, position, onClose }) => {
  const { t } = useTranslation();
  return (
    <div
      className="absolute z-30 w-64 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 animate-fade-in-down"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-slate-400 hover:text-slate-800 dark:hover:text-white">
        <CloseIcon className="w-5 h-5" />
      </button>
      <h4 className="font-bold text-deep-red dark:text-gold mb-2">{term}</h4>
      <p className="text-sm text-slate-700 dark:text-slate-300">{definition}</p>
    </div>
  );
};

export default GlossaryPopup;