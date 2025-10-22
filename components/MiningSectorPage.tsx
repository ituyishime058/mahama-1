
import React from 'react';
import MiningIcon from './icons/MiningIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import LocationPinIcon from './icons/LocationPinIcon';

const miningActivities = [
  { name: 'Artisanal Cassiterite Mining', description: 'Local miners extracting tin ore using traditional, small-scale methods.', imageUrl: 'https://picsum.photos/seed/mining1/400/300' },
  { name: 'Safety Training Workshop', description: 'A recent workshop focused on providing miners with modern safety equipment.', imageUrl: 'https://picsum.photos/seed/mining2/400/300' },
  { name: 'Land Reclamation Project', description: 'Efforts to restore and re-vegetate areas after mining activities are complete.', imageUrl: 'https://picsum.photos/seed/mining3/400/300' },
  { name: 'Mineral Washing Station', description: 'A central station where extracted ore is washed and prepared for processing.', imageUrl: 'https://picsum.photos/seed/mining4/400/300' },
  { name: 'Coltan Extraction Site', description: 'Exploring a site for coltan, a critical mineral used in modern electronics.', imageUrl: 'https://picsum.photos/seed/mining5/400/300' },
  { name: 'Community Cooperative Meeting', description: 'Miners discussing fair trade practices and cooperative management.', imageUrl: 'https://picsum.photos/seed/mining6/400/300' }
];

const podcast = { title: "Voices from the Mines", description: "Miners share their stories and the importance of cooperatives.", duration: "18 min" };
const locations = ["Central Washing Station", "Gatore Coltan Site", "Miners' Cooperative Office"];

const MiningSectorPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-gray-500/10 rounded-lg">
            <MiningIcon className="w-10 h-10 text-gray-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Mining Sector</h2>
          <p className="text-slate-500 dark:text-slate-400">Promoting responsible and safe resource extraction.</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {miningActivities.map(activity => (
          <div key={activity.name} className="group relative rounded-xl overflow-hidden shadow-lg h-64 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/20">
            <img src={activity.imageUrl} alt={activity.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h4 className="font-bold text-lg">{activity.name}</h4>
              <p className="text-sm opacity-90 mt-1 line-clamp-2">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-bold mb-4">Community Voices</h3>
           <div className="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-md cursor-pointer overflow-hidden">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                    <MiningIcon className="w-8 h-8 text-gray-500"/>
                </div>
                <div className="flex-grow">
                    <h4 className="font-bold">{podcast.title}</h4>
                    <p className="text-sm text-slate-500">{podcast.description}</p>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircleIcon className="w-10 h-10 text-deep-red"/>
                </div>
            </div>
        </section>
         <section>
          <h3 className="text-2xl font-bold mb-4">Key Locations</h3>
          <ul className="space-y-2">
            {locations.map(loc => (
                <li key={loc} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800/50 rounded-lg shadow-sm">
                    <LocationPinIcon className="w-5 h-5 text-deep-red"/>
                    <span className="font-semibold">{loc}</span>
                </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default MiningSectorPage;
