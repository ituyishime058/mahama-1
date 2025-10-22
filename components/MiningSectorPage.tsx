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
  },
  {
    name: 'Coltan Extraction Site',
    description: 'Exploring a site for coltan, a critical mineral used in modern electronics.',
    imageUrl: 'https://picsum.photos/seed/mining5/400/300'
  },
  {
    name: 'Community Cooperative Meeting',
    description: 'Miners discussing fair trade practices and cooperative management.',
    imageUrl: 'https://picsum.photos/seed/mining6/400/300'
  }
];

const MiningSectorPage: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in bg-white dark:bg-slate-800/50 rounded-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-gray-500/10 rounded-lg">
            <MiningIcon className="w-10 h-10 text-gray-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Mining Sector</h2>
          <p className="text-slate-500 dark:text-slate-400">Promoting responsible and safe resource extraction.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {miningActivities.map(activity => (
          <div key={activity.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/20">
            <img src={activity.imageUrl} alt={activity.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h4 className="font-bold text-lg">{activity.name}</h4>
              <p className="text-sm opacity-90 mt-1">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiningSectorPage;