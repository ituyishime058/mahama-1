import React from 'react';
import Logo from './Logo';

interface CategoryLoadingOverlayProps {
    text?: string;
}

const CategoryLoadingOverlay: React.FC<CategoryLoadingOverlayProps> = ({ text }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy/90 backdrop-blur-sm animate-fade-in">
      <Logo className="w-24 h-24 mnh-pulse" />
      <h2 className="text-2xl font-bold text-white mt-4 tracking-wider">{ text || 'Loading Content...' }</h2>
      <div className="w-1/3 max-w-sm mt-4 bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
        <div className="bg-gradient-to-r from-gold to-deep-red h-full rounded-full animate-shimmer-bg" style={{ backgroundSize: '200% 100%' }}></div>
      </div>
       <style>{`
          .mnh-pulse {
            animation: mnh-pulse-anim 2s ease-in-out infinite;
            transform-origin: center;
          }
          @keyframes mnh-pulse-anim {
            0%, 100% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
          }
       `}</style>
    </div>
  );
};

export default CategoryLoadingOverlay;
