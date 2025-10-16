import React from 'react';

const AdPlaceholder: React.FC = () => {
  return (
    <div className="relative bg-slate-200 dark:bg-slate-800/50 p-6 rounded-lg shadow-md overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-700/50 to-transparent"></div>
      <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-400 dark:border-slate-600 rounded-md">
        <span className="text-lg font-semibold text-slate-500 dark:text-slate-400">Advertisement</span>
        <span className="text-sm text-slate-400 dark:text-slate-500">Your Ad Here</span>
      </div>
       <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default AdPlaceholder;
