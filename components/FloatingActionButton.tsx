import React from 'react';
import MicIcon from './icons/MicIcon';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Start AI Conversation"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-deep-red to-gold rounded-full shadow-lg text-white flex items-center justify-center
                 transform transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gold/50"
    >
        <div className="absolute inset-0 bg-black/20 rounded-full animate-ping opacity-50"></div>
        <MicIcon className="w-8 h-8" />
    </button>
  );
};

export default FloatingActionButton;
