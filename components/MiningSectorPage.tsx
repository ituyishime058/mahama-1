import React from 'react';
import MiningIcon from './icons/MiningIcon';

const miningActivities = [
  {
    name: 'Artisanal Cassiterite Mining',
    description: 'Local miners extracting tin ore using traditional, small-scale methods in designated zones.',
    imageUrl: 'https://picsum.photos/seed/mining1/400/300'
  },
  {
    name: 'Safety Training Workshop',
    description: 'A recent workshop focused on providing miners with modern safety equipment and best practices.',
    imageUrl: 'https://picsum.photos/seed/mining2/400/300'
  },
  {
    name: 'Land Reclamation Project',
    description: 'Efforts to restore and re-vegetate areas after mining activities are complete to ensure environmental sustainability.',
    imageUrl: 'https://picsum.photos/seed/mining3/400/300'
  },
  {
    name: 'Mineral Washing Station',
    description: 'A central station where extracted ore is washed and prepared for processing, improving efficiency.',
    imageUrl: 'https://picsum.photos/seed/mining4/400/300'
  }
];

const MiningSectorPage: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <MiningIcon className="w-10 h-10 text-slate-500" />
        <div>
          <h2 className="text-3xl font-bold">Mining Sector</h2>
          <p className="text-slate-500 dark:text-slate-400">Promoting responsible and safe resource extraction.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {miningActivities.map(activity => (
          <div key={activity.name} className="group relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <img src={activity.imageUrl} alt={activity.name} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h4 className="font-bold">{activity.name}</h4>
              <p className="text-xs opacity-80 mt-1">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiningSectorPage;