import React from 'react';
import EnvironmentIcon from './icons/EnvironmentIcon';
import PlayCircleIcon from './icons/PlayCircleIcon';
import LocationPinIcon from './icons/LocationPinIcon';

const initiatives = [
  { name: 'Reforestation Drive', description: 'Planting native trees to restore local ecosystems and combat soil erosion.', imageUrl: 'https://picsum.photos/seed/env1/400/300', progress: 75 },
  { name: 'Waste Recycling Program', description: 'Community-led initiative to sort, process, and upcycle plastic waste.', imageUrl: 'https://picsum.photos/seed/env2/400/300', progress: 60 },
  { name: 'Clean Water Project', description: 'Protecting natural springs and promoting safe water handling practices.', imageUrl: 'https://picsum.photos/seed/env3/400/300', progress: 90 },
];

const podcast = { title: "Green Kirehe", description: "The leader of the Reforestation Drive discusses the long-term vision for a greener landscape.", duration: "21 min" };
const locations = ["Community Tree Nursery", "Recycling Collection Point", "Kagera Riverbank Protection Site"];
const stats = { treesPlanted: 12534, plasticRecycledKg: 8765 };

const EnvironmentPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-lime-500/10 rounded-lg">
            <EnvironmentIcon className="w-10 h-10 text-lime-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Environmental Action</h2>
          <p className="text-slate-500 dark:text-slate-400">Protecting our natural resources for a sustainable future.</p>
        </div>
      </header>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg text-center shadow-md">
                <p className="text-4xl font-bold text-green-600">{stats.treesPlanted.toLocaleString()}</p>
                <p className="font-semibold text-slate-500">Trees Planted to Date</p>
            </div>
             <div className="p-6 bg-white dark:bg-slate-800/50 rounded-lg text-center shadow-md">
                <p className="text-4xl font-bold text-blue-600">{stats.plasticRecycledKg.toLocaleString()} kg</p>
                <p className="font-semibold text-slate-500">Plastic Recycled</p>
            </div>
        </div>

      <section>
        <h3 className="text-2xl font-bold mb-4">Conservation Initiatives</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initiatives.map(item => (
            <div key={item.name} className="group bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-lime-500/20">
                <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-sm text-slate-500 mt-1 h-10">{item.description}</p>
                    <div className="mt-3">
                        <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                            <span>Progress</span>
                            <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                            <div className="bg-lime-600 h-2.5 rounded-full" style={{ width: `${item.progress}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
      </section>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-bold mb-4">Community Voices</h3>
           <div className="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-lg shadow-md cursor-pointer overflow-hidden">
                <div className="flex-shrink-0 w-16 h-16 bg-lime-200 dark:bg-lime-700/50 rounded-lg flex items-center justify-center">
                    <EnvironmentIcon className="w-8 h-8 text-lime-600"/>
                </div>
                <div className="flex-grow">
                    <h4 className="font-bold">{podcast.title}</h4>
                    <p className="text-sm text-slate-500 line-clamp-2">{podcast.description}</p>
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

export default EnvironmentPage;