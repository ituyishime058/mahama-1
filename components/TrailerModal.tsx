import React from 'react';
import CloseIcon from './icons/CloseIcon';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl: string | null;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose, trailerUrl }) => {
  if (!isOpen || !trailerUrl) return null;

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
        
        <div className="w-full h-full rounded-lg overflow-hidden">
          <iframe
            src={trailerUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
