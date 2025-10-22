import React, { useState } from 'react';
import type { Settings } from '../types';

// Icons
import CloseIcon from './icons/CloseIcon';
import MahamaServicesIcon from './icons/MahamaServicesIcon';
import NewspaperIcon from './icons/NewspaperIcon';
import IndustryIcon from './icons/IndustryIcon';
import EntertainmentIcon from './icons/EntertainmentIcon';
import ScrollIcon from './icons/ScrollIcon';
import TourismIcon from './icons/TourismIcon';
import UsersIcon from './icons/UsersIcon';
import AgricultureIcon from './icons/AgricultureIcon';
import MiningIcon from './icons/MiningIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

// Page Components
import MiningSectorPage from './MiningSectorPage';
import AgricultureSectorPage from './AgricultureSectorPage';
import IndustrySectorPage from './IndustrySectorPage';
import TourismPage from './TourismPage';


interface MahamaServicesPageProps {
  onClose: () => void;
  settings: Settings;
  rightAside: React.ReactNode;
}

type CategoryID = 'Mining' | 'Agriculture' | 'Industry' | 'Tourism' | 'History' | 'Entertainment' | 'News' | 'Leaders';

const categories: { id: CategoryID, title: string; icon: React.ReactNode, description: string }[] = [
    { id: 'Leaders', title: 'Leadership', icon: <UsersIcon className="w-8 h-8"/>, description: "Meet the camp and district leaders." },
    { id: 'News', title: 'Kirehe News', icon: <NewspaperIcon className="w-8 h-8"/>, description: "Latest updates from the local area." },
    { id: 'Agriculture', title: 'Agriculture', icon: <AgricultureIcon className="w-8 h-8"/>, description: "Explore local crops and techniques." },
    { id: 'Industry', title: 'Industry & Skills', icon: <IndustryIcon className="w-8 h-8"/>, description: "Vocational training and local business." },
    { id: 'Mining', title: 'Mining', icon: <MiningIcon className="w-8 h-8"/>, description: "Discover the region's mineral resources." },
    { id: 'Tourism', title: 'Tourism', icon: <TourismIcon className="w-8 h-8"/>, description: "Discover beautiful local attractions." },
    { id: 'Entertainment', title: 'Entertainment', icon: <EntertainmentIcon className="w-8 h-8"/>, description: "Find local talent and community events." },
    { id: 'History', title: 'History', icon: <ScrollIcon className="w-8 h-8"/>, description: "Learn about the rich history of Kirehe." },
];

const MahamaServicesPage: React.FC<MahamaServicesPageProps> = ({ onClose, rightAside }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryID | null>(null);

  const renderActiveCategory = () => {
    switch (activeCategory) {
      case 'Mining':
        return <MiningSectorPage />;
      case 'Agriculture':
        return <AgricultureSectorPage />;
      case 'Industry':
        return <IndustrySectorPage />;
      case 'Tourism':
        return <TourismPage />;
      default:
        return null; 
    }
  };

  return (
    <div className="animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <MahamaServicesIcon className="w-12 h-12 text-deep-red dark:text-gold" />
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Mahama Community Hub</h1>
            <p className="text-slate-500 dark:text-slate-400">Your portal for local services, news, and opportunities.</p>
          </div>
        </div>
        <button onClick={onClose} className="px-6 py-3 self-end bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Close</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2">
          {activeCategory ? (
            <div>
              <button onClick={() => setActiveCategory(null)} className="flex items-center gap-1 text-sm font-semibold text-deep-red dark:text-gold hover:underline mb-4">
                <ChevronLeftIcon className="w-4 h-4" /> Back to Hub
              </button>
              <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-lg">
                {renderActiveCategory()}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map(cat => (
                    <button 
                        key={cat.id} 
                        onClick={() => setActiveCategory(cat.id)}
                        className="group relative p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gold/20 dark:hover:shadow-gold/10 transition-all duration-300 text-left transform hover:-translate-y-2 flex flex-col items-start"
                    >
                        <div className="p-3 bg-gradient-to-br from-gold/10 to-deep-red/10 dark:from-gold/20 dark:to-deep-red/20 rounded-lg text-deep-red dark:text-gold mb-4 transition-transform duration-300 group-hover:scale-110">
                            {cat.icon}
                        </div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">{cat.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 flex-grow">{cat.description}</p>
                    </button>
                ))}
            </div>
          )}
        </main>
        <aside className="lg:col-span-1">
          <div className="lg:sticky top-28">
            {rightAside}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MahamaServicesPage;