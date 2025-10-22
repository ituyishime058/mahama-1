
import React, { useState } from 'react';

// Icons
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import MiningIcon from './icons/MiningIcon';
import AgricultureIcon from './icons/AgricultureIcon';
import IndustryIcon from './icons/IndustryIcon';
import TourismIcon from './icons/TourismIcon';
import HealthIcon from './icons/HealthIcon';
import EducationIcon from './icons/EducationIcon';
import UsersIcon from './icons/UsersIcon';
import BellIcon from './icons/BellIcon';

// Page Components
import MiningSectorPage from './MiningSectorPage';
import AgricultureSectorPage from './AgricultureSectorPage';
import IndustrySectorPage from './IndustrySectorPage';
import TourismPage from './TourismPage';
import HealthSectorPage from './HealthSectorPage';
import EducationSectorPage from './EducationSectorPage';
import CommunitySectorPage from './CommunitySectorPage';

interface MahamaServicesPageProps {
  onClose: () => void;
}

type CategoryID = 'Mining' | 'Agriculture' | 'Industry' | 'Tourism' | 'Health' | 'Education' | 'Community';

const categories: { id: CategoryID; title: string; icon: React.ReactNode; description: string; gradient: string }[] = [
    { id: 'Health', title: 'Health & Wellness', icon: <HealthIcon className="w-8 h-8"/>, description: "Access clinics, health info, and wellness programs.", gradient: "from-red-500/20 to-red-700/20" },
    { id: 'Education', title: 'Education & Training', icon: <EducationIcon className="w-8 h-8"/>, description: "Find schools and vocational skill centers.", gradient: "from-sky-500/20 to-sky-700/20" },
    { id: 'Community', title: 'Community & Social', icon: <UsersIcon className="w-8 h-8"/>, description: "Connect with groups and social services.", gradient: "from-indigo-500/20 to-indigo-700/20" },
    { id: 'Agriculture', title: 'Agriculture', icon: <AgricultureIcon className="w-8 h-8"/>, description: "Explore local crops and farming techniques.", gradient: "from-green-500/20 to-green-700/20" },
    { id: 'Industry', title: 'Industry & Skills', icon: <IndustryIcon className="w-8 h-8"/>, description: "Vocational training and local businesses.", gradient: "from-blue-500/20 to-blue-700/20" },
    { id: 'Mining', title: 'Mining', icon: <MiningIcon className="w-8 h-8"/>, description: "Discover the region's mineral resources.", gradient: "from-gray-500/20 to-gray-700/20" },
    { id: 'Tourism', title: 'Tourism & Culture', icon: <TourismIcon className="w-8 h-8"/>, description: "Discover beautiful local attractions.", gradient: "from-amber-500/20 to-amber-700/20" },
];

const notices = [
    { title: 'Weekly Market Day', content: 'The main market will be open this Friday from 6 AM to 6 PM. Fresh produce and goods available.' },
    { title: 'Vaccination Drive', content: 'A vaccination drive for children under 5 will be held at the main Health Center on Saturday.' },
    { title: 'Town Hall Meeting', content: 'Join the camp leadership for a town hall meeting this Sunday at 2 PM in the Community Hall.' },
];

const MahamaServicesPage: React.FC<MahamaServicesPageProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryID | null>(null);

  const renderActiveCategory = () => {
    switch (activeCategory) {
      case 'Mining': return <MiningSectorPage />;
      case 'Agriculture': return <AgricultureSectorPage />;
      case 'Industry': return <IndustrySectorPage />;
      case 'Tourism': return <TourismPage />;
      case 'Health': return <HealthSectorPage />;
      case 'Education': return <EducationSectorPage />;
      case 'Community': return <CommunitySectorPage />;
      default: return null; 
    }
  };

  return (
    <div className="animate-fade-in">
      <header className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Mahama & Kirehe Hub</h1>
                <p className="text-slate-500 dark:text-slate-400">Your portal for local services, news, and opportunities.</p>
            </div>
            <button onClick={onClose} className="px-6 py-3 self-start bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Close</button>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2">
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
          <div className="lg:sticky top-28 space-y-8">
            <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md overflow-hidden">
                <h3 className="p-4 font-bold text-lg border-b border-slate-200 dark:border-slate-700">Camp Location</h3>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4209.920137462118!2d30.6389530752215!3d-2.2631997374747073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c4c500078c5f45%3A0xc3605c2533855d6b!2sMahama%20refugee%20camp!5e1!3m2!1sen!2srw!4v1761018194729!5m2!1sen!2srw" 
                    width="100%" 
                    height="300" 
                    style={{border:0}} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><BellIcon/> Community Notices</h3>
                <ul className="space-y-4">
                    {notices.map((notice, index) => (
                        <li key={index} className="border-l-4 border-gold pl-4">
                            <h4 className="font-semibold">{notice.title}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{notice.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MahamaServicesPage;
