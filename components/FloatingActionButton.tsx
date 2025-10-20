import React from 'react';
import MicIcon from './icons/MicIcon';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-deep-red rounded-full text-white flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 animate-glow"
      aria-label="Start live conversation"
    >
      <MicIcon className="w-8 h-8" />
    </button>
  );
};

export default FloatingActionButton;