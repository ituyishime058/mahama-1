import React from 'react';

interface WaveformIconProps {
  isAnimating?: boolean;
}

const WaveformIcon: React.FC<WaveformIconProps> = ({ isAnimating = false }) => {
  return (
    <div className="w-8 h-8 flex items-center justify-between">
      <span 
        className={`w-1.5 h-2 rounded-full bg-current ${isAnimating ? 'animate-equalizer' : ''}`}
        style={{ animationDelay: '0s' }}
      ></span>
      <span 
        className={`w-1.5 h-2 rounded-full bg-current ${isAnimating ? 'animate-equalizer' : ''}`}
        style={{ animationDelay: '0.2s' }}
      ></span>
      <span 
        className={`w-1.5 h-2 rounded-full bg-current ${isAnimating ? 'animate-equalizer' : ''}`}
        style={{ animationDelay: '0.4s' }}
      ></span>
       <span 
        className={`w-1.5 h-2 rounded-full bg-current ${isAnimating ? 'animate-equalizer' : ''}`}
        style={{ animationDelay: '0.6s' }}
      ></span>
    </div>
  );
};

export default WaveformIcon;
