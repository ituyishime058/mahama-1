import React, { useState } from 'react';
import CloseIcon from './icons/CloseIcon';
import MahamaServicesIcon from './icons/MahamaServicesIcon';
import CampMap from './CampMap';
import MahamaServicesModal from './MahamaServicesModal';
import { useTranslation } from '../hooks/useTranslation';

// Import Sector Pages
import AgricultureSectorPage from './AgricultureSectorPage';
import IndustrySectorPage from './IndustrySectorPage';
import MiningSectorPage from './MiningSectorPage';
import TourismPage from './TourismPage';

// Import Sector Icons
import AgricultureIcon from './icons/AgricultureIcon';
import IndustryIcon from './icons/IndustryIcon';
import MiningIcon from './icons/MiningIcon';
import TourismIcon from './icons/TourismIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';

import type { Article, Settings, WeatherData } from '../types';

interface MahamaServicesPageProps {
  onClose: () => void;
  trendingArticles: Article[];
  onArticleClick: (article: Article) => void;
  settings: Settings;
  onGoPremium: () => void;
  weatherData: WeatherData | null;
  isWeatherLoading: boolean;
}

const MahamaServicesPage: React.FC<MahamaServicesPageProps> = ({ onClose, settings }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('Map');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const tabs = [
    { name: 'Map', icon: MahamaServicesIcon },
    { name: 'Agriculture', icon: AgricultureIcon },
    { name: 'Industry', icon: IndustryIcon },
    { name: 'Mining', icon: MiningIcon },
    { name: 'Tourism', icon: TourismIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Map':
        return <CampMap />;
      case 'Agriculture':
        return <AgricultureSectorPage />;
      case 'Industry':
          return <IndustrySectorPage />;
      case 'Mining':
          return <MiningSectorPage />;
      case 'Tourism':
          return <TourismPage />;
      default:
        return <CampMap />;
    }
  };

  return (
    <div className="animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
            <MahamaServicesIcon className="w-12 h-12 text-deep-red dark:text-gold" />
            <div>
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">{t('mahamaServices')}</h1>
                <p className="text-slate-500 dark:text-slate-400">{t('mahamaServicesDesc')}</p>
            </div>
        </div>
        <button onClick={onClose} className="px-6 py-3 self-end bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Close</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <nav className="space-y-2 md:sticky top-28">
            {tabs.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button 
                  key={item.name} 
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left font-semibold transition-all duration-200 transform ${
                    isActive 
                    ? 'bg-deep-red/10 text-deep-red dark:bg-gold/20 dark:text-gold md:scale-105' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 md:hover:translate-x-1 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? '' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </button>
              )
            })}
             <button 
              onClick={() => setIsChatOpen(true)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left font-semibold transition-all duration-200 transform hover:bg-slate-100 dark:hover:bg-slate-800 md:hover:translate-x-1 text-slate-600 dark:text-slate-300`}
            >
              <ChatBubbleIcon className="w-6 h-6 text-slate-500" />
              <span>AI Assistant</span>
            </button>
          </nav>
        </aside>
        <main className="md:col-span-3 bg-white dark:bg-slate-800/50 rounded-lg shadow-lg">
          {renderContent()}
        </main>
      </div>

      <MahamaServicesModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} settings={settings} />
    </div>
  );
};

export default MahamaServicesPage;
