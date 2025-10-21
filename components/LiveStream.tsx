import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LiveStream: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="my-16">
      <h2 className="text-3xl font-extrabold mb-6 border-l-4 border-deep-red pl-4">
        {t('liveCoverage')}
      </h2>
      <div className="relative aspect-video bg-navy rounded-lg overflow-hidden shadow-2xl">
        <img src="https://picsum.photos/1280/720?grayscale" alt="Live stream placeholder" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="absolute top-4 left-4 inline-flex items-center bg-deep-red text-white text-sm font-bold px-3 py-1 rounded-full">
                <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                {t('live')}
            </div>
            <button className="p-6 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
            </button>
            <h3 className="text-2xl font-bold mt-4 text-white">{t('breakingG7')}</h3>
        </div>
      </div>
    </section>
  );
};

export default LiveStream;