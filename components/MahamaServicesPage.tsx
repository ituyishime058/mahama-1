import React, { useState } from 'react';
import CloseIcon from './icons/CloseIcon';
import HealthIcon from './icons/HealthIcon';
import EducationIcon from './icons/EducationIcon';
import MarketIcon from './icons/MarketIcon';
import TransportIcon from './icons/TransportIcon';
import WorkSkillsIcon from './icons/WorkSkillsIcon';
import CommunityHubIcon from './icons/CommunityHubIcon';
import FinanceIcon from './icons/FinanceIcon';
import YouthIcon from './icons/YouthIcon';
import AgricultureIcon from './icons/AgricultureIcon';
import IndustryIcon from './icons/IndustryIcon';
import MiningIcon from './icons/MiningIcon';
import TourismIcon from './icons/TourismIcon';
import EntertainmentIcon from './icons/EntertainmentIcon';
import SportsIcon from './icons/SportsIcon';
import EnvironmentIcon from './icons/EnvironmentIcon';

import CampMap from './CampMap';
import HealthSectorPage from './HealthSectorPage';
import EducationSectorPage from './EducationSectorPage';
import CommunitySectorPage from './CommunitySectorPage';
import FinancePage from './FinancePage';
import YouthDevelopmentPage from './YouthDevelopmentPage';
import AgricultureSectorPage from './AgricultureSectorPage';
import IndustrySectorPage from './IndustrySectorPage';
import MiningSectorPage from './MiningSectorPage';
import TourismPage from './TourismPage';
import EntertainmentPage from './EntertainmentPage';
import SportsPage from './SportsPage';
import EnvironmentPage from './EnvironmentPage';
import ServiceDetailPage from './ServiceDetailPage';

const serviceCategories = [
  { name: 'Health', icon: HealthIcon, component: HealthSectorPage },
  { name: 'Education', icon: EducationIcon, component: EducationSectorPage },
  { name: 'Community', icon: CommunityHubIcon, component: CommunitySectorPage },
  { name: 'Youth Development', icon: YouthIcon, component: YouthDevelopmentPage },
  { name: 'Finance', icon: FinanceIcon, component: FinancePage },
  { name: 'Agriculture', icon: AgricultureIcon, component: AgricultureSectorPage },
  { name: 'Industry', icon: IndustryIcon, component: IndustrySectorPage },
  { name: 'Mining', icon: MiningIcon, component: MiningSectorPage },
  { name: 'Tourism', icon: TourismIcon, component: TourismPage },
  { name: 'Entertainment', icon: EntertainmentIcon, component: EntertainmentPage },
  { name: 'Sports', icon: SportsIcon, component: SportsPage },
  { name: 'Environment', icon: EnvironmentIcon, component: EnvironmentPage },
];

interface MahamaServicesPageProps {
  onClose: () => void;
}

// FIX: Moved ServiceCard outside the main component and added explicit props typing to fix TypeScript error.
interface ServiceCardProps {
  name: string;
  icon: React.FC<any>;
  onSelect: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, icon: Icon, onSelect }) => (
  <button
    onClick={onSelect}
    className="group relative flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800/50 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 dark:hover:shadow-gold/10 transform hover:-translate-y-2"
  >
    <div className="p-4 bg-deep-red/10 dark:bg-gold/10 rounded-full mb-4">
      <Icon className="w-8 h-8 text-deep-red dark:text-gold" />
    </div>
    <h3 className="font-bold text-lg text-slate-800 dark:text-white">{name}</h3>
  </button>
);

const MahamaServicesPage: React.FC<MahamaServicesPageProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const ActiveComponent = serviceCategories.find(c => c.name === activeCategory)?.component;

  return (
    <div className="animate-fade-in">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Mahama Services</h1>
          <p className="text-slate-500 dark:text-slate-400">Explore services and opportunities in Mahama.</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <CloseIcon />
        </button>
      </header>

      {ActiveComponent ? (
        <ServiceDetailPage title={activeCategory!} onBack={() => setActiveCategory(null)}>
          <ActiveComponent />
        </ServiceDetailPage>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {serviceCategories.map(cat => (
              <ServiceCard key={cat.name} name={cat.name} icon={cat.icon} onSelect={() => setActiveCategory(cat.name)} />
            ))}
          </div>
          <CampMap />
        </>
      )}
    </div>
  );
};

export default MahamaServicesPage;