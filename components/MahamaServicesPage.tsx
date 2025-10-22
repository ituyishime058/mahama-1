import React, { useState } from 'react';

// Icons
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import MiningIcon from './icons/MiningIcon';
import AgricultureIcon from './icons/AgricultureIcon';
import IndustryIcon from './icons/IndustryIcon';
import TourismIcon from './icons/TourismIcon';

// Page Components
import MiningSectorPage from './MiningSectorPage';
import AgricultureSectorPage from './AgricultureSectorPage';
import IndustrySectorPage from './IndustrySectorPage';
import TourismPage from './TourismPage';

interface MahamaServicesPageProps {
  onClose: () => void;
  rightAside: React.ReactNode;
}

type CategoryID = 'Mining' | 'Agriculture' | 'Industry' | 'Tourism';

const categories: { id: CategoryID; title: string; icon: React.ReactNode; description: string, gradient: string }[] = [
    { id: 'Agriculture', title: 'Agriculture', icon: <AgricultureIcon className="w-8 h-8"/>, description: "Explore local crops and farming techniques.", gradient: "from-green-500/20 to-green-700/20" },
    { id: 'Industry', title: 'Industry & Skills', icon: <IndustryIcon className="w-8 h-8"/>, description: "Vocational training and local businesses.", gradient: "from-blue-500/20 to-blue-700/20" },
    { id: 'Mining', title: 'Mining', icon: <MiningIcon className="w-8 h-8"/>, description: "Discover the region's mineral resources.", gradient: "from-gray-500/20 to-gray-700/20" },
    { id: 'Tourism', title: 'Tourism & Culture', icon: <TourismIcon className="w-8 h-8"/>, description: "Discover beautiful local attractions.", gradient: "from-amber-500/20 to-amber-700/20" },
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2">
           <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Mahama Community Hub</h1>
                    <p className="text-slate-500 dark:text-slate-400">Your portal for local services, news, and opportunities.</p>
                </div>
                <button onClick={onClose} className="px-6 py-3 self-start bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Close</button>
            </header>
          
          {activeCategory ? (
            <div>
              <button onClick={() => setActiveCategory(null)} className="flex items-center gap-1 text-sm font-semibold text-deep-red dark:text-gold hover:underline mb-4">
                <ChevronLeftIcon className="w-4 h-4" /> Back to Hub
              </button>
              {renderActiveCategory()}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {categories.map(cat => (
                    <button 
                        key={cat.id} 
                        onClick={() => setActiveCategory(cat.id)}
                        className={`group relative p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gold/20 dark:hover:shadow-gold/10 transition-all duration-300 text-left transform hover:-translate-y-2 flex flex-col items-start overflow-hidden`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <div className="relative z-10">
                            <div className="p-3 bg-gradient-to-br from-gold/10 to-deep-red/10 dark:from-gold/20 dark:to-deep-red/20 rounded-lg text-deep-red dark:text-gold mb-4 transition-transform duration-300 group-hover:scale-110">
                                {cat.icon}
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 dark:text-white">{cat.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 flex-grow">{cat.description}</p>
                        </div>
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