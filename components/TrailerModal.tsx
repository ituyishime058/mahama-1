import React from 'react';
import CloseIcon from './icons/CloseIcon';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  // trailerUrl would be passed in a real app, e.g., a YouTube embed link
}

const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl aspect-video bg-navy rounded-lg shadow-xl transform transition-all duration-300 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute -top-3 -right-3 z-10 text-white bg-slate-800 rounded-full p-2 hover:bg-deep-red"><CloseIcon /></button>
        
        {/* Placeholder for a video player */}
        <div className="w-full h-full flex items-center justify-center">
            <p className="text-white text-xl">Trailer video would play here.</p>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
