import React from 'react';

const EqualizerIcon: React.FC = () => {
  return (
    <div className="w-6 h-6 flex items-end justify-between">
      <span 
        className="w-1.5 bg-white animate-equalizer"
        style={{ animationDelay: '0s' }}
      ></span>
      <span 
        className="w-1.5 bg-white animate-equalizer"
        style={{ animationDelay: '0.2s' }}
      ></span>
      <span 
        className="w-1.5 bg-white animate-equalizer"
        style={{ animationDelay: '0.4s' }}
      ></span>
    </div>
  );
};

export default EqualizerIcon;