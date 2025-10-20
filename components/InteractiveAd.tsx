import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const InteractiveAd: React.FC = () => {
  return (
    <div className="relative bg-navy p-6 rounded-lg shadow-lg overflow-hidden group">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gold/20 via-deep-red/20 to-navy opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift" 
        style={{ backgroundSize: '200% 200%' }}
      ></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
            <SparklesIcon className="w-5 h-5 text-gold" />
            <span className="text-xs font-bold uppercase tracking-wider text-gold">Promoted</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Experience the Future of Tech</h3>
        <p className="text-sm text-slate-300 mb-4">Discover groundbreaking innovations and get ahead of the curve. Limited-time offers available now.</p>
        <button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 group-hover:scale-105 transform">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default InteractiveAd;